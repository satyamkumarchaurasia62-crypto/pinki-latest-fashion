(function(){
  // 1. कंसोल चेतावनी
  console.log("%cStop! (Error 500)", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder;");
  console.log("%cयह फीचर केवल डेवलपर्स के लिए है। यहाँ कोई भी कोड पेस्ट न करें।", "font-family: sans-serif; font-size: 1.5em; color: yellow; background: black; padding: 5px;");
  
  try {
    console.log = console.warn = console.error = function(){};
  } catch(e) {}

  // 2. Right-Click और शॉर्टकट ब्लॉक करना
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) || (e.ctrlKey && e.keyCode == 85)) {
      return false;
    }
  };

  // 3. मास्टर ब्लैक स्क्रीन बनाना
  const blk = document.createElement('div');
  blk.style.cssText = 'display: none; background-color: black; color: white; height: 100vh; width: 100vw; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: sans-serif; position: fixed; top: 0; left: 0; z-index: 999999999;';
  blk.innerHTML = '<h1 style="color: red; font-size: 4.5rem; margin: 0;">500 - STOP!</h1><p style="font-size: 1.4rem; margin-top: 10px;">सुरक्षा कारणों से कंसोल (Inspect) की अनुमति नहीं है।</p><p style="color: gray; font-size: 1rem;">वेबसाइट वापस देखने के लिए कृपया कंसोल बंद करें।</p>';
  
  if (document.body) {
    document.body.appendChild(blk);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(blk));
  }

  // 4. हर 1 सेकंड (1000ms) में सटीक जाँच
  setInterval(function() {
    const start = performance.now();
    debugger; 
    const end = performance.now();
    
    const sizeOpened = (window.outerWidth - window.innerWidth > 160) || (window.outerHeight - window.innerHeight > 160);
    const debuggerOpened = (end - start > 100);

    if (sizeOpened || debuggerOpened) {
      blk.style.display = 'flex';
    }
  }, 1000); // यहाँ 1000 का मतलब ठीक 1 सेकंड है
})();
