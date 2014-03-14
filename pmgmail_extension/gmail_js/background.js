chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    // Fetch token if it exists
    if(message.type == "email") {
      //port.postMessage({firebase_token: token });
      console.log("CHECKING EMAIL", message.email)
      chrome.storage.local.get(message.email, function(data) {
        if(!(message.email in data))
          data = null
        else
          data = data[message.email]
        console.log("RETURNING", data);
        port.postMessage({ type: "bg_return_token", token: data });
      });
    }

    // Set token
    else if(message.type == "bg_set_token") {
      var token_obj = {}
      token_obj[message.email] = message.token;
      console.log("Setting token", token_obj)
      chrome.storage.local.set(token_obj);
    }

    // Get auto edit toggle
    else if(message.type == "bg_get_auto_edit") {
      chrome.storage.local.get("auto_edit", function(data) {
        port.postMessage({ type: "bg_return_auto_edit", value: data["auto_edit"] });
      })
    }

    // Set auto edit toggle
    else if(message.type == "bg_set_auto_edit") {
      var auto_edit = {}
      auto_edit["auto_edit"] = message.value;
      console.log("Setting auto edit", auto_edit)
      chrome.storage.local.set(auto_edit);
    }

  });
});
