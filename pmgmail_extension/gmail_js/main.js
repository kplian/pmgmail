alert('KPLIAN: Process Maker for Gmail')


var Tools  = function() {};
var MeGmail  = function() {};
var Signal = function() {};
var Email  = function() {};


var Kplian  = function() {

   this.myFunction = function(){
     alert('kplian....')
   
   }

};

var Kplian  = new Kplian();






//TOOLS
Tools.utf8_encode = function(e) {
  if(e===null||typeof e==="undefined"){return""}var t=e+"";var n="",r,i,s=0;r=i=0;s=t.length;for(var o=0;o<s;o++){var u=t.charCodeAt(o);var a=null;if(u<128){i++}else if(u>127&&u<2048){a=String.fromCharCode(u>>6|192,u&63|128)}else if(u&63488!=55296){a=String.fromCharCode(u>>12|224,u>>6&63|128,u&63|128)}else{if(u&64512!=55296){throw new RangeError("Unmatched trail surrogate at "+o)}var f=t.charCodeAt(++o);if(f&64512!=56320){throw new RangeError("Unmatched lead surrogate at "+(o-1))}u=((u&1023)<<10)+(f&1023)+65536;a=String.fromCharCode(u>>18|240,u>>12&63|128,u>>6&63|128,u&63|128)}if(a!==null){if(i>r){n+=t.slice(r,i)}n+=a;r=i=o+1}}if(i>r){n+=t.slice(r,s)}return n
}


Tools.md5 = function(e) {
  var t;var n=function(e,t){return e<<t|e>>>32-t};var r=function(e,t){var n,r,i,s,o;i=e&2147483648;s=t&2147483648;n=e&1073741824;r=t&1073741824;o=(e&1073741823)+(t&1073741823);if(n&r){return o^2147483648^i^s}if(n|r){if(o&1073741824){return o^3221225472^i^s}else{return o^1073741824^i^s}}else{return o^i^s}};var i=function(e,t,n){return e&t|~e&n};var s=function(e,t,n){return e&n|t&~n};var o=function(e,t,n){return e^t^n};var u=function(e,t,n){return t^(e|~n)};var a=function(e,t,s,o,u,a,f){e=r(e,r(r(i(t,s,o),u),f));return r(n(e,a),t)};var f=function(e,t,i,o,u,a,f){e=r(e,r(r(s(t,i,o),u),f));return r(n(e,a),t)};var l=function(e,t,i,s,u,a,f){e=r(e,r(r(o(t,i,s),u),f));return r(n(e,a),t)};var c=function(e,t,i,s,o,a,f){e=r(e,r(r(u(t,i,s),o),f));return r(n(e,a),t)};var h=function(e){var t;var n=e.length;var r=n+8;var i=(r-r%64)/64;var s=(i+1)*16;var o=new Array(s-1);var u=0;var a=0;while(a<n){t=(a-a%4)/4;u=a%4*8;o[t]=o[t]|e.charCodeAt(a)<<u;a++}t=(a-a%4)/4;u=a%4*8;o[t]=o[t]|128<<u;o[s-2]=n<<3;o[s-1]=n>>>29;return o};var p=function(e){var t="",n="",r,i;for(i=0;i<=3;i++){r=e>>>i*8&255;n="0"+r.toString(16);t=t+n.substr(n.length-2,2)}return t};var d=[],v,m,g,y,b,w,E,S,x,T=7,N=12,C=17,k=22,L=5,A=9,O=14,M=20,_=4,D=11,P=16,H=23,B=6,j=10,F=15,I=21;e=this.utf8_encode(e);d=h(e);w=1732584193;E=4023233417;S=2562383102;x=271733878;t=d.length;for(v=0;v<t;v+=16){m=w;g=E;y=S;b=x;w=a(w,E,S,x,d[v+0],T,3614090360);x=a(x,w,E,S,d[v+1],N,3905402710);S=a(S,x,w,E,d[v+2],C,606105819);E=a(E,S,x,w,d[v+3],k,3250441966);w=a(w,E,S,x,d[v+4],T,4118548399);x=a(x,w,E,S,d[v+5],N,1200080426);S=a(S,x,w,E,d[v+6],C,2821735955);E=a(E,S,x,w,d[v+7],k,4249261313);w=a(w,E,S,x,d[v+8],T,1770035416);x=a(x,w,E,S,d[v+9],N,2336552879);S=a(S,x,w,E,d[v+10],C,4294925233);E=a(E,S,x,w,d[v+11],k,2304563134);w=a(w,E,S,x,d[v+12],T,1804603682);x=a(x,w,E,S,d[v+13],N,4254626195);S=a(S,x,w,E,d[v+14],C,2792965006);E=a(E,S,x,w,d[v+15],k,1236535329);w=f(w,E,S,x,d[v+1],L,4129170786);x=f(x,w,E,S,d[v+6],A,3225465664);S=f(S,x,w,E,d[v+11],O,643717713);E=f(E,S,x,w,d[v+0],M,3921069994);w=f(w,E,S,x,d[v+5],L,3593408605);x=f(x,w,E,S,d[v+10],A,38016083);S=f(S,x,w,E,d[v+15],O,3634488961);E=f(E,S,x,w,d[v+4],M,3889429448);w=f(w,E,S,x,d[v+9],L,568446438);x=f(x,w,E,S,d[v+14],A,3275163606);S=f(S,x,w,E,d[v+3],O,4107603335);E=f(E,S,x,w,d[v+8],M,1163531501);w=f(w,E,S,x,d[v+13],L,2850285829);x=f(x,w,E,S,d[v+2],A,4243563512);S=f(S,x,w,E,d[v+7],O,1735328473);E=f(E,S,x,w,d[v+12],M,2368359562);w=l(w,E,S,x,d[v+5],_,4294588738);x=l(x,w,E,S,d[v+8],D,2272392833);S=l(S,x,w,E,d[v+11],P,1839030562);E=l(E,S,x,w,d[v+14],H,4259657740);w=l(w,E,S,x,d[v+1],_,2763975236);x=l(x,w,E,S,d[v+4],D,1272893353);S=l(S,x,w,E,d[v+7],P,4139469664);E=l(E,S,x,w,d[v+10],H,3200236656);w=l(w,E,S,x,d[v+13],_,681279174);x=l(x,w,E,S,d[v+0],D,3936430074);S=l(S,x,w,E,d[v+3],P,3572445317);E=l(E,S,x,w,d[v+6],H,76029189);w=l(w,E,S,x,d[v+9],_,3654602809);x=l(x,w,E,S,d[v+12],D,3873151461);S=l(S,x,w,E,d[v+15],P,530742520);E=l(E,S,x,w,d[v+2],H,3299628645);w=c(w,E,S,x,d[v+0],B,4096336452);x=c(x,w,E,S,d[v+7],j,1126891415);S=c(S,x,w,E,d[v+14],F,2878612391);E=c(E,S,x,w,d[v+5],I,4237533241);w=c(w,E,S,x,d[v+12],B,1700485571);x=c(x,w,E,S,d[v+3],j,2399980690);S=c(S,x,w,E,d[v+10],F,4293915773);E=c(E,S,x,w,d[v+1],I,2240044497);w=c(w,E,S,x,d[v+8],B,1873313359);x=c(x,w,E,S,d[v+15],j,4264355552);S=c(S,x,w,E,d[v+6],F,2734768916);E=c(E,S,x,w,d[v+13],I,1309151649);w=c(w,E,S,x,d[v+4],B,4149444226);x=c(x,w,E,S,d[v+11],j,3174756917);S=c(S,x,w,E,d[v+2],F,718787259);E=c(E,S,x,w,d[v+9],I,3951481745);w=r(w,m);E=r(E,g);S=r(S,y);x=r(x,b)}var q=p(w)+p(E)+p(S)+p(x);return q.toLowerCase()
}


Tools.make_request = function (url, verb, payload) {
  var met = (typeof verb == undefined || typeof verb == null) ? "GET" : verb;
  var req = {type: met, url: encodeURI(url), async: false};

  if(payload) {
    req.data = payload;
  }

  var get = $.ajax(req);

  return get.responseText;
};



//EMAIL TEST ......

MeGmail.isPreviewPane = function () {
  var e = $("div[role=main]:first").find("[gh=tl]");
  if (e.length > 0) {
    return e[0].getAttribute("class").indexOf("aia") != -1;
  }
  return false;
};


MeGmail.insideEmail = function() {

  if(window.SignalNS.gmail.get.current_page() != null && !Gmail.isPreviewPane()) {
    return false;
  }

  var items = $('.ii.gt');
  var ids = [];

  for(var i=0; i<items.length; i++) {
    var mail_id = items[i].getAttribute('class').split(' ')[2];
    if(mail_id != 'undefined' && mail_id != undefined) {
      if($(items[i]).is(':visible')) {
        ids.push(items[i]);
      }
    }
  }

  return ids.length > 0;
}


MeGmail.emailSubjectDiv = function() {
  var e = $(".hP");

  for(var i=0; i<e.length; i++) {
    if($(e[i]).is(':visible')) {
      return e[i];
    }
  };

  return null;
}


MeGmail.isThread = function() {
  var items = window.SignalNS.gmail.dom.email_contents();
  var check_1 = $('.nH .if').children(":eq(1)").children().children(":eq(1)").children();
  var check_2 = [];

  for(var i=0; i<items.length; i++) {
    var mail_id = items[i].getAttribute('class').split(' ')[2];
    if(mail_id != 'undefined' && mail_id != undefined) {
      check_2.push(mail_id);
    }
  }

  return check_1.length > 1 || check_2.length > 1;
};


MeGmail.emailBodyDiv = function() {

  if(!Gmail.insideEmail()) {
    return [];
  }

  if(!Gmail.isPreviewPane()) {
    var finalID = [];
    var hashID = window.SignalNS.gmail.get.email_id();
    var items = window.SignalNS.gmail.dom.email_contents();

    if(Gmail.isThread() && items.length == 1) {
      return items.pop();
    }

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      if(mail_id.substring(1) == hashID) {
        finalID.push(items[i]);
      }
    }

    for(var j=0; j<finalID.length; j++) {
      if($($(finalID[j]).is(':visible'))) {
        return finalID[j];
      }
    }

    return items.pop();
  } else {
    var items = window.SignalNS.gmail.dom.email_contents();
    var finalID = [];

    for(var j=0; j<items.length; j++) {
      if($($(items[j])).is(':visible')) {
        finalID.push(items[j]);
      }
    }

    return finalID.pop();
  }
}


//MEGMAIL


MeGmail.isPreviewPane = function () {
  var e = $("div[role=main]:first").find("[gh=tl]");
  if (e.length > 0) {
    return e[0].getAttribute("class").indexOf("aia") != -1;
  }
  return false;
};


MeGmail.insideEmail = function() {

  if(window.SignalNS.gmail.get.current_page() != null && !MeGmail.isPreviewPane()) {
    return false;
  }

  var items = $('.ii.gt');
  var ids = [];

  for(var i=0; i<items.length; i++) {
    var mail_id = items[i].getAttribute('class').split(' ')[2];
    if(mail_id != 'undefined' && mail_id != undefined) {
      if($(items[i]).is(':visible')) {
        ids.push(items[i]);
      }
    }
  }

  return ids.length > 0;
}


MeGmail.emailSubjectDiv = function() {
  var e = $(".hP");

  for(var i=0; i<e.length; i++) {
    if($(e[i]).is(':visible')) {
      return e[i];
    }
  };

  return null;
}


MeGmail.isThread = function() {
  var items = window.SignalNS.gmail.dom.email_contents();
  var check_1 = $('.nH .if').children(":eq(1)").children().children(":eq(1)").children();
  var check_2 = [];

  for(var i=0; i<items.length; i++) {
    var mail_id = items[i].getAttribute('class').split(' ')[2];
    if(mail_id != 'undefined' && mail_id != undefined) {
      check_2.push(mail_id);
    }
  }

  return check_1.length > 1 || check_2.length > 1;
};


MeGmail.emailBodyDiv = function() {

  if(!MeGmail.insideEmail()) {
    return [];
  }

  if(!MeGmail.isPreviewPane()) {
    var finalID = [];
    var hashID = window.SignalNS.gmail.get.email_id();
    var items = window.SignalNS.gmail.dom.email_contents();

    if(MeGmail.isThread() && items.length == 1) {
      return items.pop();
    }

    for(var i=0; i<items.length; i++) {
      var mail_id = items[i].getAttribute('class').split(' ')[2];
      if(mail_id.substring(1) == hashID) {
        finalID.push(items[i]);
      }
    }

    for(var j=0; j<finalID.length; j++) {
      if($($(finalID[j]).is(':visible'))) {
        return finalID[j];
      }
    }

    return items.pop();
  } else {
    var items = window.SignalNS.gmail.dom.email_contents();
    var finalID = [];

    for(var j=0; j<items.length; j++) {
      if($($(items[j])).is(':visible')) {
        finalID.push(items[j]);
      }
    }

    return finalID.pop();
  }
}


Email.prototype.loadData = function() {
  var self = this;
  var emailID = Tools.md5(window.SignalNS.gmail.get.user_email());
  var hashID  = window.SignalNS.track.lastID;
  var bucket  = "https://signal.firebaseio.com/users/" + emailID + "/emails/" + hashID;

  Signal.firebase(bucket);

  if(window.SignalNS.firebase) {
    window.SignalNS.firebase.on("value", function (e) {
      console.group('Replacing Content');
      console.log('- Checking if entry exists', bucket+'.json?auth='+window.SignalNS.token);
      var n = e.val();

      if(n != null && n != undefined) {
        console.log('- entry exists');
        var replaceContent = function(n) {
          var sub = MeGmail.emailSubjectDiv();
          var bod = MeGmail.emailBodyDiv();

          console.log('- DOM data', {body: $(bod).html(), subject: $(sub).html()});
          console.log('- Firebase data', n);

          if($(sub).html() != n.subject) {
            console.log('- Replacing subject', sub);
            $(sub).html(n.subject);
          } else {
            console.log('- Subject same, not replacing (Email.loadData)');
          }
          if($(bod).html() != n.body) {
            console.log('- Replacing body', bod);
            $(bod).html(n.body);
          } else {
            console.log('- Body same, not replacing (Email.loadData)')
          }

          $("#SignalRevert")[0].innerText = "Restore";
        }

        setTimeout(function() {
          replaceContent(n);
        }, window.SignalNS.track.replaceContentTimeout);

      } else {
        console.log('- Nothing stored in firebase');
      }

      window.SignalNS.firebase.off("value");
      console.groupEnd();
    });
  }
}


Email.prototype.saveData = function(deleteEntry) {

  if(!MeGmail.insideEmail()) {
    clearInterval(window.SignalNS.track.save);
    return;
  }

  if(window.SignalNS.firebase) {
    var hashID  = window.SignalNS.track.lastID;
    var emailID = Tools.md5(window.SignalNS.gmail.get.user_email());
    var sub     = MeGmail.emailSubjectDiv().innerHTML;
    var bod     = MeGmail.emailBodyDiv().innerHTML;
    var old     = window.SignalNS.track.originalEmails[hashID] || window.SignalNS.track.lastEmail;

    if(old.subject != sub || old.body != bod) {
      console.group('Updating Firebase');

      if(deleteEntry) {
        console.log('- Firebase entry deleted successfully');
        window.SignalNS.firebase.set(null);
      } else {
        console.log('- Firebase updated successfully');
        window.SignalNS.firebase.set({
          modified: $.now(),
          body: bod,
          subject: sub,
          id: hashID
        });
        console.log('- Content changed updating firebase', window.SignalNS.track.lastEmail);
      }

      window.SignalNS.track.originalEmails[hashID] = {modified: $.now(), body: bod, subject: sub};

      console.log('- Adding email to modified bucket');
      var bucket = "https://signal.firebaseio.com/users/" + emailID + "/edited/" + hashID;
      var localFirebase = new Firebase(bucket);
      localFirebase.auth(window.SignalNS.token, function(e) {
        if(e) {
          console.log('- Error authenticating, retrying auth', e, window.SignalNS.token);
          Signal.auth();
        }
      });

      if(deleteEntry) {
        localFirebase.set(null);
      } else {
        localFirebase.set(hashID);
      }

      console.groupEnd();
    }

    Signal.updatePreview(sub, bod);
  }
}


Email.prototype.edit = function(first_argument) {
  console.group('Edit Mode');

  var editMode = window.SignalNS.track.editMode;
  window.SignalNS.track.editMode = !editMode;
  var css = "-webkit-linear-gradient(top," + ((editMode) ? "#ddd,#eee" : "#f5f5f5,#f1f1f1") + ")";

  console.log('- editMode enabled:', editMode);

  $("#SignalEdit").css({"background-image": css});
  $("#SignalEdit")[0].innerText = editMode ? "Editing" : "Edit";
  $("#SignalRevert")[0].innerText = "Restore";

  var sub = MeGmail.emailSubjectDiv();
  var bod = MeGmail.emailBodyDiv();

  sub.setAttribute("contenteditable", editMode);
  sub.style.outline = "None";
  bod.setAttribute("contenteditable", editMode);
  bod.style.outline = "None";

  hashID = window.SignalNS.gmail.get.email_id();
  if(!(hashID in window.SignalNS.track.originalEmails)) {
    window.SignalNS.track.originalEmails[hashID] = {modified: $.now(), body: bod.innerHTML, subject: sub.innerHTML};
  }

  if(editMode) {
    if(!window.SignalNS.track.save) {
      console.log('- Setting interval for edit mode');
      window.SignalNS.track.save = setInterval(function() {
        Email.saveData();
      }, 1500);
    } else {
      console.log('- Clearing existing interval');
      clearInterval(window.SignalNS.track.save);
      console.log('- Setting new interval for edit mode');
      window.SignalNS.track.save = setInterval(function() {
        Email.saveData();
      }, 1500);
    }
  } else {
    if(window.SignalNS.track.save) {
      console.log('- Clearing interval on exiting editMode');
      clearInterval(window.SignalNS.track.save);
    }
  }

  window.SignalNS.track.loadPreviewTrigger = true;
};


Email.prototype.highlight = function(first_argument) {
  console.group('Highlight');

  var e = null;
  var n = null;

  if(document.selection && document.selection.createRange) {
    n = document.selection.createRange();
    e = n.htmlText
  } else if(window.getSelection) {
    var r = window.getSelection();
    if(r.rangeCount > 0) {
      n = r.getRangeAt(0);
      var i = n.cloneContents();
      var s = document.createElement("div");
      s.appendChild(i);
      e = "<span>" + s.innerHTML + "</span>";
      if($($(".hP")[0]).is(":focus")) {
        var o = e.replace(/\s/g, "").length == 0 ? null : e;
        var u = MeGmail.emailBodyDiv().innerHTML;
        Email.replaceContent(o, u);
        Email.saveData();
        $("#SignalRevert")[0].innerText = "Restore";
        window.SignalNS.track.loadPreviewTrigger = true;
      }
      else {
        console.log('- Email body selected');
        var origBody = MeGmail.emailBodyDiv();
        var modE = $(e).text().replace(/\s/g, "");
        console.log('- Original body', origBody.innerHTML);
        console.log('- Selected:', e);

        if($(origBody).text().replace(/\s/g, "").indexOf(modE) != -1) {
          var o = MeGmail.emailSubjectDiv().innerHTML;
          var u = e.replace(/\s/g, "").length == 0 ? null : e;
          Email.replaceContent(o, u);
          Email.saveData();
          $("#SignalRevert")[0].innerText = "Restore";
          window.SignalNS.track.loadPreviewTrigger = true;
        }
      }
    }
  }

  console.groupEnd();
};


Email.prototype.restoreRevert = function() {
  console.group('Restoring Content');

  var hashID = window.SignalNS.gmail.get.email_id();
  var emailID = Tools.md5(window.SignalNS.gmail.get.user_email());

  if($("#SignalRevert")[0].innerText == "Restore") {
    console.log('- User clicked restore');
    if(window.SignalNS.track.lastEmail) {
      var n = window.SignalNS.track.lastEmail;
      var sub = MeGmail.emailSubjectDiv();
      var bod = MeGmail.emailBodyDiv();

      window.SignalNS.track.lastEmail = {subject: sub.innerHTML, body: bod.innerHTML, modified: $.now()};
      console.log('- Original email found in tracker', hashID, n);

      if($(sub).html() != n.subject) {
        console.log('- Replacing subject', sub)
        $(sub).html(n.subject);
        $("#SignalRevert")[0].innerText = "Revert";
      } else {
        console.log('- Subject same, not replacing');
      }
      if($(bod).html() != n.body) {
        console.log('- Replacing body', bod);
        $(bod).html(n.body);
        $("#SignalRevert")[0].innerText = "Revert"
      } else {
        console.log('- Body same, not replacing');
      }
    } else {
      console.log('- Original email not found in tracker');
    }

    var deleteEntry = true;
    Email.saveData(deleteEntry);
    window.SignalNS.track.loadPreviewTrigger = true;
  } else {
    console.log('- User clicked revert');
    if(hashID in window.SignalNS.track.originalEmails) {
      var n = window.SignalNS.track.lastEmail;
      var sub = MeGmail.emailSubjectDiv();
      var bod = MeGmail.emailBodyDiv();

      window.SignalNS.track.lastEmail = {subject: sub.innerHTML, body: bod.innerHTML, modified: $.now()};
      console.log('- Original email found in tracker', hashID, n);

      if($(sub).html() != n.subject) {
        console.log('- Restoring subject', sub);
        $(sub).html(n.subject);
        $("#SignalRevert")[0].innerText = "Restore";
      } else {
        console.log('- Subject same, not replacing')
      }
      if($(bod).html() != n.body) {
        console.log('- Restoring body', bod);
        $(bod).html(n.body);
        $("#SignalRevert")[0].innerText = "Restore";
      } else {
        console.log('- Body same, not replacing');
      }

      Email.saveData();
      window.SignalNS.track.loadPreviewTrigger = true;
    } else {
      console.log('- Original email not found in tracker')
    }
  }

  console.groupEnd();
};


Email.prototype.replaceContent = function(sub, bod) {
  console.group("- Replacing content (Email.replaceContent)");
  var r = MeGmail.emailSubjectDiv();
  var i = MeGmail.emailBodyDiv();
  if ($(r).html() != sub) {
    console.log('- Replacing subject', sub);
    $(r).html(sub);
  } else {
    console.log('- Subject same, not replacing');
  }
  if ($(i).html() != bod) {
    console.log('- Replacing body', bod);
    $(i).html(bod);
  } else {
    console.log('- Body same, not replacing');
  }
  console.groupEnd();
}


Email.prototype.getViewData = function(cache) {
  var perfStart = performance.now();

  if(cache) {
    console.log('- loadPreviews request time', performance.now()-perfStart);
    return window.SignalNS.track.cachedViewData;
  }

  if(MeGmail.insideEmail() && !MeGmail.isPreviewPane()) {
    return;
  }

  var emailID = Tools.md5(window.SignalNS.gmail.get.user_email());
  var fb =  JSON.parse(Tools.make_request('https://signal.firebaseio.com/users/' + emailID + '/edited' +'.json?auth='+window.SignalNS.token));
  var view = window.SignalNS.gmail.get.visible_emails();
  var offset = (MeGmail.isPreviewPane()) ? 3 : 1;
  var dom = $('[role="main"]').find('.Cp').find('tr');
  var newview = view.slice(0, dom.length/offset);
  var data = [];
  var allids = [];

  for(var i=0; i<newview.length; i++) {
    var vid = newview[i].id;
    if(vid in fb) {
      var edata = Tools.make_request('https://signal.firebaseio.com/users/' + emailID + '/emails/'  + vid + '.json?auth='+window.SignalNS.token);
      edata = JSON.parse(edata);

      if(edata != null) {
        edata.id = vid;
      }

      data.push(edata);
    } else {
      data.push(null);
    }
    allids.push(vid);
  }

  window.SignalNS.track.cachedViewDataIDs = allids;
  console.log('- loadPreviews request time', performance.now()-perfStart);

  return data;
}


var Email  = new Email();



//INIT TEST

Signal.loadPreviews = function(force, cached) {
  if(MeGmail.insideEmail() || window.SignalNS.gmail.get.current_page() == null) {
    console.log('inside email');
    if(!force) {
      return;
    }
  }

  if(!window.SignalNS.track.loadPreviewTrigger) {
    console.log('- previews offset off, not loading them');
    if(!force) {
      return;
    }
  }

  if(!cached) {
    var cached = false;
  }

  if(!MeGmail.isPreviewPane()) {
    console.group('Loading Previews');
    var dom = $('[role="main"]').find('.Cp').find('tr');
    var sig = Email.getViewData();

    for(var i=0; i<dom.length; i++) {
      var fb = sig[i];
      var em = dom[i];
      if(fb != null) {
        console.log('- Found edited email', fb.id, 'index:', i);
        $(em).find('.y6').find('span')[0].innerHTML = $("<div>" + fb.subject + "</div>").text();
        $($(em).find('.y6').find('span')[1]).css("text-overflow", "ellipsis");
        $(em).find('.y6').find('span')[1].innerText = $("<div> - " + fb.body.replace(/\n/g, " ").replace("<br>", " ") + "</div>").text();
      }
    }

    window.SignalNS.track.loadPreviewTrigger = false;
    console.groupEnd();
  } else{
    console.group('Loading Previews');
    var dom = $('[role="main"]').find('.Cp').find('tr');
    var sig = Email.getViewData(cached);

    for(var i=0; i<dom.length/3; i++) {
      var fb = sig[i];
      if(fb != null) {
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


Signal.updatePreview = function(sub, bod) {
  if(MeGmail.isPreviewPane() && MeGmail.insideEmail()) {

    var cache = window.SignalNS.track.cachedViewData;
    var cacheid = window.SignalNS.track.cachedViewDataIDs;
    var updated = [];

    for(var i=0; i<cache.length; i++) {
      var item = cache[i];
      if(item) {
        if(item.id == window.SignalNS.track.lastID) {
          console.log('- updating cache', item.id);
          item.subject = sub;
          item.body = bod;
          updated.push(item);
        } else {
          updated.push(item);
        }
      } else {
        updated.push(null);
      }
    }

    var newid = cacheid.indexOf(window.SignalNS.track.lastID);

    if(cacheid.indexOf(window.SignalNS.track.lastID) != -1) {
      updated[newid] = {subject: sub, body: bod, id: window.SignalNS.track.lastID};
    }

    window.SignalNS.track.cachedViewData = updated;
    Signal.loadPreviews(true, true);
  }
}


Signal.firebase = function(url) {
  if(!("firebase" in window) || window.firebase.toString() != url) {
    window.SignalNS.firebase = new Firebase(url);
    window.SignalNS.firebase.auth(window.SignalNS.token, function(e) {
      if(e) {
        console.log('- Error authenticating, retrying auth', e, window.SignalNS.token);
        Signal.auth();
      }
    });
  }
}



//funcion personalizada
Signal.addMeOwnButton = function(again){
  
  //validar privilegios
  if(!window.SignalNS.token) {
    console.log('- Inside addButtons, no token present, authenticating');
    Signal.auth();
    return;
  }
  
  
  
  var previewPane = MeGmail.isPreviewPane();
  var insideEmail = MeGmail.insideEmail();
  
  console.log('llamdas',previewPane, insideEmail )
  
   if($("#SignalMenuKPLIAN").length != 0) {
        var css = "-webkit-linear-gradient(top," + ((editMode) ? "#ddd,#eee" : "#f5f5f5,#f1f1f1") + ")";
        $("#SignalKPLIAN")[0].innerText = 'Edit ...  my boton...';
        $("#SignalKPLIAN").css({"background-image": css});
   }
   
   
   var b1 = '<div id="SignalKPLIAN" class="T-I J-J5-Ji lR T-I-ax7 T-I-Js-IF ar7" role="button" tabindex="0" data-tooltip="Acciones personalizadas" style="-webkit-user-select: none;">Process Maker</div>';
   var t = '<div class="G-Ni J-J5-Ji" id="SignalMenuKPLIAN">' + b1 + '</div>';
  
  alert('Kplian')
  console.log(Kplian)
  
    if("0" in $(".iH").children() && $('#SignalMenuKPLIAN').length != 1) {
      
	  $($('[gh=mtb]').children()).append(t);
      $("#SignalKPLIAN").off();
      $("#SignalKPLIAN").on('click', function(){
      	window.open("http://gema.kplian.com/gadget/jquery/dataTable.html","Process Maker - Inbox","toolbar=1,scrollbars=1,location=1,statusbar=0,menubar=1,resizable=1,width=800,height=390");
      });
     
      var sub = MeGmail.emailSubjectDiv();
      var bod = MeGmail.emailBodyDiv();
      var id  = window.SignalNS.gmail.get.email_id();

      //window.SignalNS.track.lastID = id;
      //window.SignalNS.track.lastEmail = {subject: sub.innerHTML, body: bod.innerHTML, modified: $.now()};
      //Email.loadData();
    }

}




Signal.addButtons = function(again, updateData) {

  if(!window.SignalNS.token) {
    console.log('- Inside addButtons, no token present, authenticating');
    Signal.auth();
    return;
  }

  var previewPane = MeGmail.isPreviewPane();
  var insideEmail = MeGmail.insideEmail();

  if(again) {
    setTimeout(function() {
      Signal.addButtons(null, false);
    }, 200);
  }

  if(updateData) {
    if(previewPane && insideEmail) {
      var sub = MeGmail.emailSubjectDiv();
      var bod = MeGmail.emailBodyDiv();
      window.SignalNS.track.lastEmail = {subject: sub.innerHTML, body: bod.innerHTML, modified: $.now()};
      window.SignalNS.track.editMode = true;

      var editMode = !window.SignalNS.track.editMode;

      if($("#SignalMenu").length != 0) {
        var css = "-webkit-linear-gradient(top," + ((editMode) ? "#ddd,#eee" : "#f5f5f5,#f1f1f1") + ")";
        $("#SignalEdit")[0].innerText = 'Edit';
        $("#SignalEdit").css({"background-image": css});
      }

      if(window.SignalNS.track.save) {
        clearInterval(window.SignalNS.track.save);
      }

      Email.loadData(true);
    }
  }

  if(!previewPane) {
    if('watchdog' in window.SignalNS.gmail.tracker) {
      window.SignalNS.gmail.observe.off();
    }
  }

  if(!insideEmail) {
    window.SignalNS.track.editMode = true;

    if($("#SignalMenu").length != 0) {
      $('#SignalMenu').remove();
    }

    return;
  }

  var e = '<div id="SignalEdit" class="T-I J-J5-Ji lR T-I-ax7 T-I-Js-IF ar7" role="button" tabindex="0" data-tooltip="Edit" style="-webkit-user-select: none;">Edit</div>';
  var h = '<div id="SignalHighlight" class="T-I J-J5-Ji nN T-I-ax7 T-I-Js-Gs T-I-Js-IF ar7" role="button" tabindex="1" data-tooltip="Highlight" style="-webkit-user-select: none;">Highlight</div>';
  var r = '<div id="SignalRevert" class="T-I J-J5-Ji nX T-I-ax7 T-I-Js-Gs ar7" role="button" tabindex="2" data-tooltip="Undo" style="-webkit-user-select: none;">Restore</div>';
  var t = '<div class="G-Ni J-J5-Ji" id="SignalMenu">' + e + h + r + "</div>";

  if(previewPane) {

    while(true) {
      $('#SignalMenu').remove();
      if($('#SignalMenu').length == 0) {
        break;
      }
    }

    if($('#SignalMenu').length != 1) {
      $($('[gh=mtb]').children()).children().append(t);
      $("#SignalEdit,#SignalRevert,#SignalHighlight").off();
      $("#SignalEdit").on('click', Email.edit);
      $("#SignalRevert").on('click', Email.restoreRevert);
      $("#SignalHighlight").on('mousedown', Email.highlight);
      var sub = MeGmail.emailSubjectDiv();
      var bod = MeGmail.emailBodyDiv();
      window.SignalNS.track.lastEmail = {subject: sub.innerHTML, body: bod.innerHTML, modified: $.now()};
    }
  } else {
    if("0" in $(".iH").children() && $('#SignalMenu').length != 1) {
      $($('[gh=mtb]').children()).append(t);
      $("#SignalEdit,#SignalRevert,#SignalHighlight").off();
      $("#SignalEdit").on('click', Email.edit);
      $("#SignalRevert").on('click', Email.restoreRevert);
      $("#SignalHighlight").on('mousedown', Email.highlight);
      var sub = MeGmail.emailSubjectDiv();
      var bod = MeGmail.emailBodyDiv();
      var id  = window.SignalNS.gmail.get.email_id();

      window.SignalNS.track.lastID = id;
      window.SignalNS.track.lastEmail = {subject: sub.innerHTML, body: bod.innerHTML, modified: $.now()};
      Email.loadData();
    }
  }
}


Signal.auth = function () {

  if(window.SignalNS.token == undefined) {
    window.postMessage({type: "email", email: window.SignalNS.gmail.get.user_email()}, "*");
  }

  function authMessageCheck(t) {
    if(t.data.type && t.data.type == "return_token") {
      console.group('Authentication Handler');
      if(t.data.token == null || t.data.token.length < 20) {
        $(document.body).prepend("<span id='black_overlay'></span><span id='signal_auth_modal'></span>");
        $("#black_overlay").css({height: "100%", width: "100%", "background-color": "#000", opacity: ".4", position: "absolute", "z-index": "99"});
        $("#signal_auth_modal").css({ height: "320px", width: "660px", position: "absolute", margin: "auto", "margin-top": "100px", top: "0", bottom: "0", left: "0", right: "0", "z-index": "999"});
        $.get("https://trysignal.com/auth/start.php").success(function (e) {
          $("#signal_auth_modal").html(e);
          $("#black_overlay").on("click", function () {
            if(window.SignalNS.auth_modal_dismissed == false) {
              var e = false;

              if($("#signal-authenticated").length == 1){
                e = true;
              }

              $("#black_overlay").remove();
              $("#signal_auth_modal").remove();
              window.SignalNS.auth_modal_dismissed = true;

              if(e == true) {
               location.reload();
              }
            }
          })
        })
      } else {
        console.log('- Setting auth token', t.data.token);
        window.SignalNS.token = t.data.token;

        if(t.data.set == true) {
          window.postMessage({type: "set_token", email: window.SignalNS.gmail.get.user_email(), token: window.SignalNS.token}, "*");
        }

        $("#signal-authenticate").remove();
        $($("#signal-right")[0]).append('<a href="#" id="signal-authenticated">&#10004; Signal is authenticated</a>');
        window.removeEventListener("message", authMessageCheck, false);
        Signal.addButtons(true);
        Signal.init();
      }
      console.groupEnd();
    }
  }

  window.addEventListener("message", authMessageCheck, false);
};


Signal.init = function() {
  console.group('Signal Init');

  console.log('- jQuery and firebase loaded');
  console.log('- Signal initialized');

  var userEmail = window.SignalNS.gmail.get.user_email();
  console.log('- User email:', userEmail, ',', Tools.md5(userEmail));

  
  ///revisa token 
  console.log(window.SignalNS.token)
  
  if(!window.SignalNS.token) {
    Signal.auth();
    return;
  }

  console.log('pasa la autentificacion....')
  
  if(!MeGmail.isPreviewPane()) {
    $(window).on("hashchange", function() {
      Signal.addButtons();
	  
	  console.log('SIGNALSSSSSSSSSSSs')
	  Signal.addMeOwnButton();

      if(window.SignalNS.track.lastHash != window.location.hash && window.SignalNS.gmail.get.current_page() != null) {
        window.SignalNS.track.lastHash = window.location.hash;
        window.SignalNS.track.loadPreviewTrigger = true;
      }

      Signal.loadPreviews();
    });

    Signal.loadPreviews();
  } else {
    window.SignalNS.gmail.observe.on('open_email', function(id) {
      window.SignalNS.track.lastID = id;
      console.log('- clicked email:',id);

      function updateLastEmail() {
        console.log('- running interval code');
        Signal.addButtons(true, true);
		
		console.log('22222222222222222')
	    Signal.addMeOwnButton(true);
        
		
		console.log('- clearing interval code');
        clearInterval(window.SignalNS.track.previewPaneButtonAdded);
      }

      window.SignalNS.track.previewPaneButtonAdded = setInterval(function() {
        updateLastEmail();
      }, 200);

    });

    function updatePreviewCron() {
      console.log('- updating preview cron');
      $('.Cp').off();
      $('[role="main"]').find('.Cp').on('click', function() {
        Signal.loadPreviews(true, true);
      });
    }

    $(window).on("hashchange", function() {
      console.log('- hashchange function gets triggered');
      updatePreviewCron();
      window.SignalNS.track.loadPreviewTrigger = true;
      Signal.loadPreviews(true);
    });

    $('.aim').on("click", function() {
      console.log('- menu click function gets triggered');
      updatePreviewCron();
      window.SignalNS.track.loadPreviewTrigger = true;
    });

    updatePreviewCron();
    Signal.loadPreviews();
  }

  console.groupEnd();
}


Signal.initKPLIAN = function() {
  console.group('Signal Init');

  console.log('- jQuery and firebase loaded');
  console.log('- Signal initialized');

  var userEmail = window.SignalNS.gmail.get.user_email();
  console.log('- User email:', userEmail, ',', Tools.md5(userEmail));

  
  ///revisa token 
  //alert(window.SignalNS.token)
  
  console.log(window.SignalNS.token)
  
  if(!window.SignalNS.token) {
    Signal.auth();
    return;
  }

  console.log('pasa la autentificacion....')
  
  if(!MeGmail.isPreviewPane()) {
    $(window).on("hashchange", function() {
      Signal.addButtons();
	  
	  alert('SIGNALSSSSSSSSSSSs')
	  Signal.addMeOwnButton();

      if(window.SignalNS.track.lastHash != window.location.hash && window.SignalNS.gmail.get.current_page() != null) {
        window.SignalNS.track.lastHash = window.location.hash;
        window.SignalNS.track.loadPreviewTrigger = true;
      }

      Signal.loadPreviews();
    });

    Signal.loadPreviews();
  } else {
    window.SignalNS.gmail.observe.on('open_email', function(id) {
      window.SignalNS.track.lastID = id;
      console.log('- clicked email:',id);

      function updateLastEmail() {
        console.log('- running interval code');
        Signal.addButtons(true, true);
		
	    Signal.addMeOwnButton(true);
        
		
		console.log('- clearing interval code');
        clearInterval(window.SignalNS.track.previewPaneButtonAdded);
      }

      window.SignalNS.track.previewPaneButtonAdded = setInterval(function() {
        updateLastEmail();
      }, 200);

    });

    function updatePreviewCron() {
      console.log('- updating preview cron');
      $('.Cp').off();
      $('[role="main"]').find('.Cp').on('click', function() {
        Signal.loadPreviews(true, true);
      });
    }

    $(window).on("hashchange", function() {
      console.log('- hashchange function gets triggered');
      updatePreviewCron();
      window.SignalNS.track.loadPreviewTrigger = true;
      Signal.loadPreviews(true);
    });

    $('.aim').on("click", function() {
      console.log('- menu click function gets triggered');
      updatePreviewCron();
      window.SignalNS.track.loadPreviewTrigger = true;
    });

    updatePreviewCron();
    Signal.loadPreviews();
  }

  console.groupEnd();
}


var checkLoaded = function() {
  if(window.jQuery && window.Firebase) {
    $.fn.onAvailable = function(e) {
      var t = this.selector;
      var n = this;
      if (this.length > 0) e.call(this);
      else {
        var r = setInterval(function () {
          if ($(t).length > 0) {
            e.call($(t));
            clearInterval(r);
          }
        }, 50);
      }
    };
    //Signal.init();
	
	Signal.initKPLIAN();
	
  } else {
    setTimeout(checkLoaded, 100);
  }
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

if(window.SignalNS.check.started == false) {
  checkLoaded();
  window.SignalNS.started = true;
}
