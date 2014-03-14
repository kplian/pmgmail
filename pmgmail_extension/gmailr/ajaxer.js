// Only run this script in the top-most frame (there are multiple frames in Gmail)
if(top.document == document) {
	(function(window){
		var Ajaxer = {
				get: function(url, data, cb){
					var clientVersion = Messenger.getData('clientVersion');

					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(){
						if(xhr.readyState !== 3) {
							cb(xhr);
						}
					};

					xhr.open("GET", url, true);
					xhr.setRequestHeader("X-Streak-Web-Client", "true");
					xhr.setRequestHeader("X-Streak-Web-Client-Version", clientVersion);
					xhr.setRequestHeader("X-Streak-Web-Extension-Version", extVersion);
			    	xhr.send();
				},

				post: function(url, data, cb){
					var clientVersion = Messenger.getData('clientVersion');

					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(){
						if(xhr.readyState !== 3){
							cb(xhr);
						}
					};

					xhr.open("POST", url, true);
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.setRequestHeader("X-Streak-Web-Client", "true");
					xhr.setRequestHeader("X-Streak-Web-Client-Version", clientVersion);
					xhr.setRequestHeader("X-Streak-Web-Extension-Version", extVersion);

					delete data.clientVersion;
					delete data.extVersion;

					xhr.send(data);
				}
			};

		window.Ajaxer = Ajaxer;
	})(window);
};
