(function() {

  var YOUR_RTM_EMAIL = "";
  var YOUR_LIST = "Inbox";

  if (YOUR_RTM_EMAIL === ""){
    alert("You need to edit this file, and specify your YOUR_RTM_EMAIL, as detailed in the README.md");
    return;
  }

  const popupCenter = ({url, title, w, h}) => {
      // Fixes dual-screen position                             Most browsers      Firefox
      const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
      const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

      const systemZoom = width / window.screen.availWidth;
      const left = (width - w) / 2 / systemZoom + dualScreenLeft
      const top = (height - h) / 2 / systemZoom + dualScreenTop
      const newWindow = window.open(url, title, 
        `
        scrollbars=yes,
        width=${w / systemZoom}, 
        height=${h / systemZoom}, 
        top=${top}, 
        left=${left}
        `
      )

      if (window.focus) newWindow.focus();

      return newWindow;
  }

  const getSelectedText = () => {
    var result="";
    // Get selected text. It depends on browser
    if (window.getSelection) {
      result=window.getSelection();
    } else if (document.getSelection) {
      result=document.getSelection();
    } else if (document.selection) {
      result=document.selection.createRange().text;
    };
    return result;
  }

  encode = function(data) {
    var result = encodeURIComponent(data)
    return result;
  }

  const doEncode = (shouldEncode, data) => {
    var result = data;

    if (shouldEncode){
      result = encode(data)
    }

    return result;
  }

  const getPageInfo = (shouldEncode) => {
    var result = {};

    result.title = doEncode(shouldEncode, document.title);
    result.url = doEncode(shouldEncode, window.location.href);
    result.selectedText = doEncode(shouldEncode, getSelectedText());

    return result;
  }

  const getGmailUrl= () => {
    var info = getPageInfo(false);

    // Build URL of RTM form that will be able to create task.
    // Form is loaded from RTM site. We don't create it, just open.
    var body = [info.title + " " + info.url,info.selectedText,].join("\n");
    var result = "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1";
    result += "&to=" + encode(YOUR_RTM_EMAIL);
    result += "&su=" + encode(YOUR_LIST);
    result += "&body=" + encode(body);

    return result;
  
  }

  var rtmUrl = getGmailUrl();
  w=popupCenter({url: rtmUrl, title: 'rtm_add', w: 900, h: 500});  

  setTimeout(function(){w.focus();}, 500);
})();
