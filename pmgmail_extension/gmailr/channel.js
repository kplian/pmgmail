BackgroundStreak = function(){
    this.socket = null;
    this.token = null;
    this.server = null;
};

BackgroundStreak.prototype = {
    channelSetup: function(scriptSrc, loadedCallback){
        var self = this;

        var script = document.createElement('script');
        script.src = scriptSrc;
        script.onload = function(){
            loadedCallback();
        };

        document.head.appendChild(script);
    },

    channelConnect: function(data, channelMessage){
        var self = this;

        this.server = data.server;
        this.token = data.token;

        if (goog.appengine.Socket && goog.appengine.Socket.BASE_URL && goog.appengine.Socket.BASE_URL.substring(0, this.server.length) !== this.server) {
            goog.appengine.Socket.BASE_URL = this.server + goog.appengine.Socket.BASE_URL;
        }

        var channel = new goog.appengine.Channel(this.token);
        this.socket = channel.open({
            onopen: function() {
                channelMessage({
                    op: "open"
                });
            },

            onmessage: function(msg) {
                channelMessage({
                    op: "message",
                    data: msg
                });
            },

            onerror: function(msg) {
                channelMessage({
                    op: "error",
                    data: msg
                });
            },

            onclose: function(msg) {
                channelMessage({
                    op: "close",
                    data: msg
                });
            }
        });
    },

    close: function(){
        if(this.socket){
            this.socket.close();
        }
    },

    getNumberOfIframes: function(){
        return document.getElementsByTagName('iframe').length;
    }
};