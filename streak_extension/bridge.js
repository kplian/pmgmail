(function() {
	if (top.document === document) { // Only run this script in the top-most frame (there are multiple frames in Gmail)

		function init() {
			var server = Messenger.getData("server");
			var port;

			// initialize credentials
			// Utility functions to automatically add credentials

			function Ajax(method, url, data, cb) {
				if (!data) {
					data = {};
				}

				var fn = Ajaxer.get;
				if (method === 'POST') {
					fn = Ajaxer.post;
				}

				fn(url, data, cb);
			}

			//used to communicate to the server
			Messenger.observe('serverCall', function(data, id) {
				Ajax(data.msgMethod, data.msgUrl, data.data, function(res) {
					Messenger.sendMessage('serverCallReturn', res, null, null, id); //success
				});
			}, 'all');

			function setupPort(){
				port = chrome.extension.connect();

				port.onMessage.addListener(function(msg) {
					switch (msg.op) {
					case "channelSetupReturn":
					case "extensionListResponse":
						Messenger.sendMessage(msg.op, msg.data, null, null, msg.id);
						break;
					case "channelConnectMessage":
					case "channelConnectResetTeardown":
					case "channelConnectResetReup":
						Messenger.sendMessage(msg.op, msg.data);
						break;
					}
				});
			}

			function postMessage(op, message, id, attempts){
				if(!attempts){
					attempts = 1;
				}

				if(attempts > 5){
					return; //it's dead Jim
				}

				try{
					port.postMessage({
						op: op,
						data: message,
						id: id
					});
				}
				catch(err){
					//port no longer connected
					setupPort();
					postMessage(op, message, id, attempts + 1);
				}
			}

			setupPort();

			Messenger.observe('channelSetup', function(message, id) {
				postMessage('channelSetup', message, id);
			});

			Messenger.observe('channelConnect', function(message, id) {
				postMessage('channelConnect', message, id);
			});

			Messenger.observe('extensionListRequest', function(message, id){
				postMessage('extensionListRequest', message, id);
			});
		}
		init();
	}
})();
