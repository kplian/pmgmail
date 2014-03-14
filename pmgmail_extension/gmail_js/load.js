if(window.location.href.indexOf("mail.google.com") != -1) {

    // Adds a data DOM element that simply holds a string in an attribute, to be read
    // by the injected scripts.
    var addData = function(id, val) {
        var body = document.getElementsByTagName("body")[0];
        var div = document.createElement('div');
        div.setAttribute('data-val', val);
        div.id = id + "_gmailr_data";
        div.setAttribute('style', "display:none");
        body.appendChild(div);
    };
    
    // Loads a script
    var loadScript = function(path) {
        var headID = document.getElementsByTagName("head")[0];
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = path;
        headID.appendChild(newScript);
    };


  window.onload = function () {
    var jq = document.createElement('script');
	  jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"
	  document.getElementsByTagName('body')[0].appendChild(jq) //RCM: carga el javascript dentro de Gmail 

    var fb = document.createElement('script');
    fb.src = "https://cdn.firebase.com/v0/firebase.js";
    document.getElementsByTagName('body')[0].appendChild(fb);

    /*
	var jq = document.createElement('script');
    jq.src = "https://s3.amazonaws.com/trysignal/signal.js";
    document.getElementsByTagName('body')[0].appendChild(jq);*/
	
	loadScript(chrome.extension.getURL("gmail.js"));//RCM carga de script gmail.js
	loadScript(chrome.extension.getURL("main.js"));//RCM carga de script main.js
	

    var port = chrome.runtime.connect();

    window.addEventListener("message", function(event) {
      // We only accept messages from ourselves
      if (event.source != window)
        return;

      // Fetch token if it exists
      if (event.data.type && (event.data.type == "email")) {
        port.postMessage({ type: "email", email: event.data.email });
        port.onMessage.addListener(function(message) {
          if(message.type == "bg_return_token") {
            window.postMessage({ type: "return_token", token: message.token, set: false }, "*");
          }
        });
      }

      // Set token
      else if (event.data.type && (event.data.type == "set_token")) {
        port.postMessage({ type: "bg_set_token", email: event.data.email, token: event.data.token });
      }

      // Get auto edit setting
      else if (event.data.type && (event.data.type == "get_auto_edit")) {
        port.postMessage({ type: "bg_get_auto_edit" });
        port.onMessage.addListener(function(message) {
          if(message.type == "bg_return_auto_edit") {
            window.postMessage({ type: "return_auto_edit", value: message.value }, "*");
          }
        });
      }

      // Set auto edit toggle
      else if (event.data.type && (event.data.type == "set_auto_edit")) {
        port.postMessage({ type: "bg_set_auto_edit", value: event.data.value });
      }

    }, false);
  }
}
