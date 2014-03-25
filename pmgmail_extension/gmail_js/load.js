//guardarmos las direcciones los archivos que seran abiertos dsde la estencion
var url

if (window.location.href.indexOf("mail.google.com") != -1) {

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

	//Adding css
	var addStyle = function(val) {
		var fileref = document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", val)

		var body = document.getElementsByTagName("head")[0].appendChild(fileref);
	};

	// Loads a script
	var loadScript = function(path) {
		var headID = document.getElementsByTagName("head")[0];
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = path;
		headID.appendChild(newScript);
	};

	window.onload = function() {
		var jq = document.createElement('script');
		jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
		document.getElementsByTagName('body')[0].appendChild(jq)

		var fb = document.createElement('script');
		fb.src = "https://cdn.firebase.com/v0/firebase.js";
		document.getElementsByTagName('body')[0].appendChild(fb);

		//save TEMP  ata in DOM
		addData("popup1", chrome.extension.getURL("popup1.html") + "#")
		addData("popupPM", chrome.extension.getURL("html/popupPM.html") + "#")
		addData("popupOA", chrome.extension.getURL("html/popupOauth.html") + "#")
		addData("data", chrome.extension.getURL("data.txt") + "#")
		
		addData("data_table",chrome.extension.getURL("lib/jquery.dataTables.min.js")+"#")

		//Adding css
		addStyle(chrome.extension.getURL("css/main.css"));
		addStyle(chrome.extension.getURL("css/jquery.css"));
		addStyle(chrome.extension.getURL("css/jquery-ui-1.8.4.custom.css"));

		loadScript(chrome.extension.getURL("lib/gmail.js"));

		loadScript(chrome.extension.getURL("main.js"));
		//loadScript(chrome.extension.getURL("lib/jquery.dataTables.min.js"));

		var port = chrome.runtime.connect();

		window.addEventListener("message", function(event) {
			// We only accept messages from ourselves
			if (event.source != window)
				return;

			// Fetch token if it exists
			if (event.data.type && (event.data.type == "email")) {
				port.postMessage({
					type : "email",
					email : event.data.email
				});
				port.onMessage.addListener(function(message) {
					if (message.type == "bg_return_token") {
						window.postMessage({
							type : "return_token",
							token : message.token,
							set : false
						}, "*");
					}
				});
			}

			// Set token
			else if (event.data.type && (event.data.type == "set_token")) {
				port.postMessage({
					type : "bg_set_token",
					email : event.data.email,
					token : event.data.token
				});
			}

			// Get auto edit setting
			else if (event.data.type && (event.data.type == "get_auto_edit")) {
				port.postMessage({
					type : "bg_get_auto_edit"
				});
				port.onMessage.addListener(function(message) {
					if (message.type == "bg_return_auto_edit") {
						window.postMessage({
							type : "return_auto_edit",
							value : message.value
						}, "*");
					}
				});
			}

			// Set auto edit toggle
			else if (event.data.type && (event.data.type == "set_auto_edit")) {
				port.postMessage({
					type : "bg_set_auto_edit",
					value : event.data.value
				});
			}

		}, false);
	}
}
