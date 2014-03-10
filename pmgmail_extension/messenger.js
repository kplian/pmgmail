// Only run this script in the top-most frame (there are multiple frames in Gmail)
if (top.document == document) {

	/**
	 * Initilize global Messenger Object.
	 *
	 * The technique used here relies on a "ghost" / "dual" / "shared" DOM
	 * structure shared between the "Chrome extension space" and Gmail space.
	 *
	 *  Ghoest: Content script | vs Gmail Space
	 *
	 * Manifest --> content_scripts
	 *
	 *
	 * combined runs in gmail context
	 *
	 * Messeges are passed by being embedded inside the DOM, this is possible
	 * because changes that occur in Gmail space of the DOM tree are replicated
	 * in extension space and events and visa versa.
	 *
	 *
	 * The encoding is done via JSON strings, so to extract the insides of a
	 * DOM element we can just do JSON.parse(stringInside):
	 *
	 *   <div id='messenger_33323423_dataStore'>
	 *     {"value":"Sample"}
	 *   </div>
	 *
	 *
	 * @param  {Object} window
	 * @return {Null} null
	 */


	 // REASON (Omar): it works...

	 // EXPLAIN (Omar): DISCUSS: Do we have unit tests / robust tests for this core class
	 // and every other core class?
	function initMessenger(window) {

		// EXPLAIN (Omar) XXX: MONKEY PATCHING. This should really check if remove function
		// already  exists.. and not override it if it does.
		// Array Remove - By John Resig (MIT Licensed)
		Array.prototype.remove = function(from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		};

		// EXPLAIN (Omar): why is this not protected in a namespace or at least
		// named in a more obscure mananner?
		var Messenger;
		Messenger = {
			// The main DOM messege passing object. Exists in the document.body
			el: null,
			ob_els: {},
			ob_callbacks: {},

			/**
			 * Initilizes messenger by adding an msg passing DOM element
			 * if it doesn't exist already.
			 * @param  {Function} cb, callback called after finish. Optional
			 * @return {Null} null
			 */
			init: function(cb) {
				// We are getting a "ghost" object that exists both in extension space
				// and in the current window.
				this.el = document.getElementById("messengerEventPasser");
				if (!this.el) {
					this.el = document.createElement('div');
					this.el.setAttribute('id', 'messengerEventPasser');
					this.el.setAttribute('style', 'display:none;');
					document.body.appendChild(this.el);
				}
				if (cb) cb(this);
			},

			observe: function(msgName, cb, id) {
				var self = this;
				if (!id) {
					id = 'noid';
				}

				if (!this.ob_els[msgName]) { //initialize listener
					var e = document.getElementById(msgName + '_eventPasser');
					if (!e) {
						e = document.createElement('div');
						e.setAttribute('id', msgName + '_eventPasser');
						e.setAttribute('style', 'display:none');
						this.el.appendChild(e);
					}

					this.ob_els[msgName] = e;
				}

				this.ob_els[msgName].addEventListener(msgName, function(e) {
					var data = null;
					var kids = self.listToArray(this.childNodes);

					for (var i = 0; el = kids[i]; i++) {
						var eid = el.getAttribute('id').split('_')[1];

						if (id == 'all' || eid == id) {
							var subkids = self.listToArray(el.childNodes);
							var mpEl = subkids[subkids.length - 1];

							try {
								data = JSON.parse(mpEl.innerText);
							} catch (err) {}

							el.parentNode.removeChild(el); //pop off the stack

							var tCBs = [];
							var len = self.ob_callbacks[msgName][id].length;
							for (var j = 0; j < len; j++) {
								var cb = self.ob_callbacks[msgName][id][j];
								if (!cb.runOnce) {
									tCBs.push(cb);
								}
								cb(data, eid);
							}
							if (el) {
								el.innerText = '';
							}
							if (self.ob_callbacks[msgName][id]) {
								for (var k = len; k < self.ob_callbacks[msgName][id].length; k++) {
									tCBs.push(self.ob_callbacks[msgName][id][k]);
								}
							}

							self.ob_callbacks[msgName][id] = tCBs;
						}
					}
				});

				if (!this.ob_callbacks[msgName]) this.ob_callbacks[msgName] = {};
				if (!this.ob_callbacks[msgName][id]) this.ob_callbacks[msgName][id] = [];

				this.ob_callbacks[msgName][id].push(cb);
			},

			unobserve: function(msgName, id) {
				delete this.ob_callbacks[msgName][id];
			},

			sendMessage: function(msgName, data, retMsgName, cb, id) {
				var cEl = document.getElementById(msgName + '_eventPasser');
				// EXPLAIN (Omar):  How is this check making sure someone is listeting?
				// Does it mean that if we couldn't find such element, then nobody is
				// listeting. And if so, what do we do?
				if (cEl) { //make sure someone is 'listening' for event
					if (!id) {
						id = "noid";
					}

					if (retMsgName) {
						if (cb) {
							cb.runOnce = true;
							this.observe(retMsgName, cb, id);
						}
					}

					var cEvent = document.createEvent('Event');
					cEvent.initEvent(msgName, true, true);
					cEvent.callId = id;
					var mEl = document.getElementById(msgName + '_' + id + '_eventPasser');

					if (!mEl) {
						mEl = this.createElement(msgName + '_' + id + '_eventPasser');
						cEl.appendChild(mEl);
					}

					var mpEl = document.createElement('div');
					mpEl.setAttribute('style', 'display:none');
					mEl.appendChild(mpEl);

					var copy = {};
					try {
						var fields = Object.getOwnPropertyNames(data);
						for (var i = 0; i < fields.length; i++) {
							var field = fields[i];
							try {
								copy[field] = data[field];
							} catch (err) {
								copy[field] = null;
							}
						}
					} catch (outerErr) {}


					try {
						mpEl.innerText = JSON.stringify(copy);
					} catch (err) {
						//couldn't stringify data
					}
					cEl.dispatchEvent(cEvent);
				}
			},


			/**
			 * Creates a new DOM elemnt and stores a data object as a string inside
			 * of it.
			 *
			 * WARNING: realize that you cannot have a circular structure in the data
			 * that is being transmitted. What is meant by that is that you can't
			 * have an object that does the following:
			 *   var sampleObject = {"value": "Exampe"};
			 *   sampleObject.__pointeToSelf = sampleObject;
			 *   JSON.stringify(sampleObject)
			 *   // > TypeError: Converting circular structure to JSON
			 *
			 *
			 * @param  {Number} id, id of object we are sending
			 * @param  {Object} data, object to store and send
			 * @return {Null} null, no return value
			 */
			storeData: function(id, data) {
				var theId = 'messenger_' + id + '_dataStore';
				var d = document.getElementById(theId);
				if (!d) {
					d = document.createElement('div');
					d.setAttribute('style', 'display:none;');
					d.setAttribute('id', theId);
					this.el.appendChild(d);
				}
				// IMPROVEMENT: use a JSON encoding library that supports circular
				// references.
				d.innerText = JSON.stringify(data);
			},

			/**
			 * We are getting some data from within a DOM element. The data
			 * is encoded in a JSON string.
			 * @param  {Number} id
			 * @return {Object|Null} JSON object encapsulating the data transmitted
			 */
			getData: function(id) {
				var theId = 'messenger_' + id + '_dataStore';
				var d = document.getElementById(theId);
				if (d) {
					try {
						return JSON.parse(d.innerText);
					} catch (err) {
						// EXPLAIN (Omar): DISCUSS: What is a good pattern to follow for
						// try / catch ? shouldn't this return {}?
					}
				}
			},

			/**
			 * Creates a DOM element that is hidden by default.
			 *
			 * @param  {Number} id, id to set for the created DOM element.
			 * @return {Object} hidden dom element
			 */
			createElement: function(id) {
				var e = document.createElement('div');
				e.setAttribute('style', 'display:none');
				e.setAttribute('id', id);
				return e;
			},

			/**
			 * Conversts a DOM list to a proper javascript array.
			 *
			 * For example when you do something like:
			 *   document.body.childNodes
			 *
			 * The resulting value looks like an array but in reality it is an object:
			 *
			 *   typeof document.body.childNodes
			 *   // > "object"
			 *
			 * @param  {Object} nodeList, DOM list extracted by: dom.childNodes
			 * @return {Array} Array version of nodelist.
			 */
			listToArray: function(nodeList) {
				var arr = [];
				for (var i = 0; node = nodeList[i]; i++) {
					// EXPLAIN (Omar): I guess we dont have to check hasOwnProperty?
					arr.push(node);
				}
				return arr;
			}
		};

		window.Messenger = Messenger;
		Messenger.init();
	}

	initMessenger(window);

};