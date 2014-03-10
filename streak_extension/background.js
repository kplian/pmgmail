var doc = chrome.extension.getBackgroundPage().document;
var setup = doc.createElement('script');
setup.src = "setup.js";
doc.head.appendChild(setup);
