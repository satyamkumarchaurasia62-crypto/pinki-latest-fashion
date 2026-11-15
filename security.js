(function(){
  // 1. कंसोल चेतावनी (कंसोल में लाल-पीले अक्षरों में वार्निंग)
  console.log("%cStop! (Error 500)", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder;");
  console.log("%cयह फीचर केवल डेवलपर्स के लिए है। यहाँ कोई भी कोड पेस्ट न करें।", "font-family: sans-serif; font-size: 1.5em; color: yellow; background: black; padding: 5px;");
  
  // कंसोल के लॉग्स को ब्लॉक करना ताकि कोई अंदर कुछ टाइप न कर सके
  try {
    console.log = console.warn = console.error = function(){};
  } catch(e) {}

  // 2. Right-Click और कीबोर्ड शॉर्टकट (F12, Ctrl+Shift+I, Ctrl+U आदि) बंद करना
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) || (e.ctrlKey && e.keyCode == 85)) {
      return false;
    }
  };

  // 3. काली स्क्रीन (Black Overlay) बनाना जो नेटवर्क/कंसोल खुलते ही आ जाएगी
  const blk = document.createElement('div');
  blk.style.cssText = 'display: none; background-color: black; color: white; height: 100vh; width: 100vw; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: sans-serif; position: fixed; top: 0; left: 0; z-index: 999999999;';
  blk.innerHTML = '<h1 style="color: red; font-size: 4.5rem; margin: 0;">500 - STOP!</h1><p style="font-size: 1.4rem; margin-top: 10px;">सुरक्षा कारणों से कंसोल (Inspect) की अनुमति नहीं है।</p><p style="color: gray; font-size: 1rem;">वेबसाइट वापस देखने के लिए कृपया कंसोल बंद करें।</p>';
  
  // जब बॉडी लोड हो जाए तब ब्लैक स्क्रीन जोड़ें
  if (document.body) {
    document.body.appendChild(blk);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(blk));
  }

  // 4. सटीक जाँच (Debugger और खतरनाक विंडो साइज का अंतर)
  setInterval(function() {
    const start = performance.now();
    debugger; // यह कोड तभी रुकेगा जब डेवलपर टूल्स खुला होगा
    const end = performance.now();
    
    // स्क्रीन के आउटर और इनर साइज़ का बड़ा अंतर तभी आता है जब सच में Inspect विंडो साइड या नीचे खुलती है
    const sizeOpened = (window.outerWidth - window.innerWidth > 160) || (window.outerHeight - window.innerHeight > 160);
    const debuggerOpened = (end - start > 100);

    if (sizeOpened || debuggerOpened) {
      blk.style.display = 'flex';
    } else {
      blk.style.display = 'none';
    }
  }, 500);
})();
