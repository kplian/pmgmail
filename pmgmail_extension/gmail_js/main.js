var Signal = function() {
};
var MeGmail = function() {
};
var Kplian = function() {

	this.loadJsCssFile = function(filename, filetype) {
		if (filetype == "js") {//if filename is a external JavaScript file
			var fileref = document.createElement('script')
			fileref.setAttribute("type", "text/javascript")
			fileref.setAttribute("src", filename)
		} else if (filetype == "css") {//if filename is an external CSS file
			var fileref = document.createElement("link")
			fileref.setAttribute("rel", "stylesheet")
			fileref.setAttribute("type", "text/css")
			fileref.setAttribute("href", filename)
		}
		if ( typeof fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
	};

	var css = function(cssFile) {
		var css = $('<link rel="stylesheet" type="text/css">');
		css.attr('href', cssFile);
		canvas_frame = document.getElementById("canvas_frame")
		canvas_frame.find('head').first().append(css);
	};

};

var Kplian = new Kplian();

var getData = function(id) {
	return document.getElementById(id + "_gmailr_data").getAttribute('data-val');
};

MeGmail.isPreviewPane = function() {
	var e = $("div[role=main]:first").find("[gh=tl]");
	if (e.length > 0) {
		return e[0].getAttribute("class").indexOf("aia") != -1;
	}
	return false;
};

MeGmail.insideEmail = function() {

	if (window.SignalNS.gmail.get.current_page() != null && !MeGmail.isPreviewPane()) {
		return false;
	}

	var items = $('.ii.gt');
	var ids = [];

	for (var i = 0; i < items.length; i++) {
		var mail_id = items[i].getAttribute('class').split(' ')[2];
		if (mail_id != 'undefined' && mail_id != undefined) {
			if ($(items[i]).is(':visible')) {
				ids.push(items[i]);
			}
		}
	}

	return ids.length > 0;
}
//funcion personalizada
Signal.addMyOwnButton = function(again) {
	//alert('Adding new options')

	var previewPane = MeGmail.isPreviewPane();
	var insideEmail = MeGmail.insideEmail();

	if ($("#SignalMenuKPLIAN").length != 0) {
		var css = "-webkit-linear-gradient(top," + ((editMode) ? "#ddd,#eee" : "#f5f5f5,#f1f1f1") + ")";
		$("#SignalKPLIAN")[0].innerText = 'Edit ...  my boton...';
		$("#SignalKPLIAN").css({
			"background-image" : css
		});
	}

	var NewStyles = document.createElement("link");
	NewStyles.rel = "stylesheet";
	NewStyles.type = "text/css";
	NewStyles.href = "css/estilo_menu.css";

	document.head.appendChild(NewStyles);

	var menu_gm = '<div id="cssmenu" style:"background-color:#ccc"><ul><li class="active"><a href="index.html"><span>Kplian</span></a></li><li class="has-sub"><a href="#"><span>Gmail</span></a><ul><li class="has-sub"><a href="#"><span>Product 1</span></a><ul><li><a href="#"><span>Sub Item</span></a></li><li class="last"><a href="#"><span>Sub Item</span></a></li></ul></li><li class="has-sub"><a href="#"><span>Product 2</span></a><ul><li><a href="#"><span>Sub Item</span></a></li><li class="last"><a href="#"><span>Sub Item</span></a></li></ul></li></ul></li><li><a href="#" id="SignalKPLIAN1"><span>Informacion</span></a></li></ul></div>';
	var menuKplianPM = '<div class="aim ain" id="menuKP"><div id=":ic" class="TO nZ aiq"><div class="TN aY7xie aze" style="margin-left:0px"><div class="TH aii J-J5-Ji" title="Expand label: Process Maker" tabindex="-1" role="link"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0 aBU" tabindex="0" title="Process Maker" target="_top" href="http://gema.kplian.com/gadget/jquery/dataTable.html">Process Maker</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Inbox" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Inbox</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Draft" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Draft</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Participated" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Participated</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Unassigned" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Unassigned</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Paused" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Paused</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div>';
	var subMenuKplianPM = '<div class="aim" id="subMenuKP"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="Inbox" target="_top" href="http://gema.kplian.com/gadget/jquery/dataTable.html">Inbox</a></span></div><div class="nL ig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div>';

	//Marca del menu principal y de los submenus
	//<div class="aim ain"><div id=":ic" class="TO nZ aiq"><div class="TN aY7xie aze" style="margin-left:0px"><div class="TH aii J-J5-Ji" title="Expand label: Process Maker" tabindex="-1" role="link"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0 aBU" tabindex="0" title="Process Maker" target="_top" href="http://gema.kplian.com/">Process Maker</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div>
	//<div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Inbox" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Inbox</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Draft" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Draft</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Participated" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Participated</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Unassigned" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Unassigned</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div><div class="aim"><div id=":if" class="TO"><div class="TN aY7xie aik" style="margin-left:12px"><div class="TH J-J5-Ji"></div><div class="aio aip"><span class="nU "><a class="J-Ke n0" tabindex="-1" title="PM Paused" target="_top"href="http://gema.kplian.com/gadget/jquery/dataTable.html">PM Paused</a></span></div><div class="nL aig"><div class="pM aj0" aria-hidden="true" aria-haspopup="true" tabindex="0" style="color: #666; background-color:#ddd; border-color: #ddd"><div class="p6" style="background-color: #ddd"><div class="p8">▼</div></div></div></div></div></div></div>

	var espacio = '<table cellpadding="0" class="Bs nH iY" role="presentation"></table>';
	var menu_mas = '<div class="G-Ni J-J5-Ji"><div tabindex="0" role="button" class="T-I J-J5-Ji ar7 nf T-I-ax7 L3" id=":1el" aria-expanded="false" style="-moz-user-select: none;" aria-haspopup="true"><span class="Ykrj7b">Más</span><div class="G-asx T-I-J3 J-J5-Ji">&nbsp;</div></div></div>';

	var b1 = '<div id="SignalKPLIAN" class="T-I J-J5-Ji lR T-I-ax7 T-I-Js-IF ar7" role="button" tabindex="0" data-tooltip="Edit ... kplian" style="-webkit-user-select: none;">Mi propio boton</div>';
	var t = '<div class="G-Ni J-J5-Ji" id="SignalMenuKPLIAN">' + b1 + '</div>';
	var b2 = '<div id="SignalKPLIAN2" class="T-I J-J5-Ji lR T-I-ax7 T-I-Js-IF ar7" role="button" tabindex="0" data-tooltip="Edit ... kplian2" style="-webkit-user-select: none;">Mi propio boton 2</div>';
	var t2 = '<div class="G-Ni J-J5-Ji" id="SignalMenuKPLIAN2">' + b2 + '</div>';

	///alert('Kplian')
	console.log(Kplian)

	if ("0" in $(".iH").children() && $('#SignalMenuKPLIAN').length != 1) {

		$($('[gh=mtb]').children()).append(menu_gm);
		$("#SignalKPLIAN").off();
		$("#SignalKPLIAN").on('click', function() {
			alert('kplian d')
		});

	}
	
	//Eventos
	$("#menuKP").on('click', function(){  
		alert('Opening popup'); 
	    Signal.openPopUp();
	});

	//alert('ELSE')

	$($('[gh=mtb]').children()).append(menu_gm);
	//$($('[gh=mtb]').children()).append(popup);
	//$("#SignalKPLIAN").off();

	$("#SignalKPLIAN").on('click', function() {
		alert('kplian a')
	});

	//$('.nM').prepend(BOTON_KPLIAN);

	$('.TK').prepend(menuKplianPM);
	$('.nH').prepend(espacio);

	$(".iH").append(t2);
	$("#SignalKPLIAN1").on('click', function() {
		alert('kplian b')
	});

	$("#SignalKPLIAN2").on('click', function() {
		alert('kplian c')
	});

	var id = window.SignalNS.gmail.get.email_id();

	window.SignalNS.track.lastID = id;
	//Email.loadData();

}

Signal.loadPreviews = function(force, cached) {
	if (MeGmail.insideEmail() || window.SignalNS.gmail.get.current_page() == null) {
		console.log('inside email');
		if (!force) {
			return;
		}
	}

	if (!window.SignalNS.track.loadPreviewTrigger) {
		console.log('- previews offset off, not loading them');
		if (!force) {
			return;
		}
	}

	if (!cached) {
		var cached = false;
	}

	if (!MeGmail.isPreviewPane()) {
		console.group('Loading Previews');
		var dom = $('[role="main"]').find('.Cp').find('tr');
		var sig = Email.getViewData();

		for (var i = 0; i < dom.length; i++) {
			var fb = sig[i];
			var em = dom[i];
			if (fb != null) {
				console.log('- Found edited email', fb.id, 'index:', i);
				$(em).find('.y6').find('span')[0].innerHTML = $("<div>" + fb.subject + "</div>").text();
				$($(em).find('.y6').find('span')[1]).css("text-overflow", "ellipsis");
				$(em).find('.y6').find('span')[1].innerText = $("<div> - " + fb.body.replace(/\n/g, " ").replace("<br>", " ") + "</div>").text();
			}
		}

		window.SignalNS.track.loadPreviewTrigger = false;
		console.groupEnd();
	} else {
		console.group('Loading Previews');
		var dom = $('[role="main"]').find('.Cp').find('tr');
		var sig = Email.getViewData(cached);

		for (var i = 0; i < dom.length / 3; i++) {
			var fb = sig[i];
			if (fb != null) {
				console.log('- Found edited email', fb.id, 'index:', i);
				$(dom[(i*3)+1]).find('span')[0].innerHTML = $("<div>" + fb.subject + "</div>").text();
				$(dom[(i*3)+2]).find('div').last()[0].innerText = $(fb.body.replace(/\n/g, " ").replace("<br>", " ")).text();
			}
		}

		window.SignalNS.track.loadPreviewTrigger = false;
		window.SignalNS.track.cachedViewData = sig;
		console.groupEnd();
	}
}

Signal.initKPLIAN = function() {
	console.group('Signal Init');
	console.log('- jQuery and firebase loaded');
	console.log('- Signal initialized');

	var userEmail = window.SignalNS.gmail.get.user_email();

	///revisa token
	alert('Email: ' + userEmail)

	console.log(window.SignalNS.token)

	if (!MeGmail.isPreviewPane()) {

		//alert('isPreviewPane')

		if ('watchdog' in window.SignalNS.gmail.tracker) {
			window.SignalNS.gmail.observe.off();
		}

		Signal.addMyOwnButton();

	} else {
		window.SignalNS.gmail.observe.on('open_email', function(id) {
			//alert('OPEN EMAIL .....')

			Signal.addMyOwnButton(true);
		});

	}

	function updatePreviewCron() {
		console.log('- updating preview cron');
		//alert('ipdateCRON')
		$('.Cp').off();
		$('[role="main"]').find('.Cp').on('click', function() {
			Signal.loadPreviews(true, true);
		});
	}

	//Signal.addMyOwnButton(true);

	updatePreviewCron();

	Signal.loadPreviews();

	console.groupEnd();

}

var checkLoaded = function() {
	if (window.jQuery && window.Firebase) {
		$.fn.onAvailable = function(e) {
			var t = this.selector;
			var n = this;
			if (this.length > 0)
				e.call(this);
			else {
				var r = setInterval(function() {
					if ($(t).length > 0) {
						e.call($(t));
						clearInterval(r);
					}
				}, 50);
			}
		};

		Signal.initKPLIAN();

	} else {
		setTimeout(checkLoaded, 100);
	}
}

Signal.openPopUp = function() {

	$(document.body).prepend("<span id='black_overlay'></span><span id='signal_auth_modal'></span>");
	$("#black_overlay").css({
		height : "100%",
		width : "100%",
		"background-color" : "#000",
		opacity : ".4",
		position : "absolute",
		"z-index" : "99"
	});
	$("#signal_auth_modal").css({
		height : "320px",
		width : "660px",
		position : "absolute",
		margin : "auto",
		"margin-top" : "100px",
		top : "0",
		bottom : "0",
		left : "0",
		right : "0",
		"z-index" : "999"
	});

	//$("#signal_auth_modal").html('<h1>HOLA ... buenvenido a my ventana.....</h1>');

	url = getData('popup1')

	$.get(url).success(function(e) {

		//$.get("https://trysignal.com/auth/start.php#").success(function (e) {

		$("#signal_auth_modal").html(e);

		//$("#signal_auth_modal").html(getData('popup1'));

	})
}

window.SignalNS = {};
window.SignalNS.track = {};
window.SignalNS.check = {};
window.SignalNS.gmail = Gmail();

window.SignalNS.check.started = false;
window.SignalNS.track.originalEmails = {};
window.SignalNS.track.replaceContentTimeout = 100;
window.SignalNS.track.editMode = true;
window.SignalNS.track.loadPreviewTrigger = true;
window.SignalNS.track.cachedViewData = [];

if (window.SignalNS.check.started == false) {
	checkLoaded();
	window.SignalNS.started = true;
}