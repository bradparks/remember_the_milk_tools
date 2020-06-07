(function() {

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

  const doEncode = (encode, data) => {
    var result = data;
    if (encode){
      result = encodeURIComponent(data)
    }

    return result;
  }

  const getPageInfo = (encode) => {
    var result = {};
    result.title = doEncode(encode, document.title);
    result.url = doEncode(encode, window.location.href);
    result.selectedText = doEncode(encode, getSelectedText());

    return result;
  }

  const getRtmUrl = () => {
    var info = getPageInfo();

    // Build URL of RTM form that will be able to create task.
    // Form is loaded from RTM site. We don't create it, just open.
    //var result ='http://www.rememberthemilk.com/services/ext/addtask.rtm';
    var result ='https://m.rememberthemilk.com/add';
    result += '?d='+ info.selectedText;
    result += '&t='+ info.title;
    result += '&name='+ info.title;
    result += '&url='+ info.url;

    return result;
  
  }

  var rtmUrl = getRtmUrl();
  w=popupCenter({url: rtmUrl, title: 'rtm_add', w: 900, h: 500});  

  setTimeout(function(){w.focus();}, 500);
})();

