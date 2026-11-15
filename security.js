// 1. कंसोल में बड़ी चेतावनी दिखाना
console.log(
  "%cStop! (Error 500)",
  "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
);
console.log(
  "%cयह फीचर केवल डेवलपर्स के लिए है। यहाँ कोई भी कोड पेस्ट न करें।",
  "font-family: sans-serif; font-size: 1.5em; color: yellow; background: black; padding: 5px;"
);

// 2. कंसोल के सारे मैसेज बंद करना
console.log = function() {};
console.warn = function() {};
console.error = function() {};

// 3. Right-Click बंद करना
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// 4. F12, Ctrl+Shift+I, Ctrl+U शॉर्टकट बंद करना
document.onkeydown = function(e) {
  if (e.keyCode == 123) { return false; }
  if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) { return false; }
  if (e.ctrlKey && e.keyCode == 85) { return false; }
};

// 5. DevTools / Console खुलने पर 500 STOP स्क्रीन दिखाना और बंद होने पर वापस चालू करना
const blockScreen = document.createElement('div');
blockScreen.id = 'security-block-screen';
blockScreen.style.cssText = 'display: none; background-color: black; color: white; height: 100vh; width: 100vw; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: sans-serif; position: fixed; top: 0; left: 0; z-index: 9999999;';
blockScreen.innerHTML = `
  <h1 style="color: red; font-size: 5rem; margin: 0;">500 - STOP!</h1>
  <p style="font-size: 1.5rem; margin-top: 10px;">सुरक्षा कारणों से कंसोल (Inspect) की अनुमति नहीं है।</p>
  <p style="color: gray; font-size: 1rem;">वेबसाइट वापस देखने के लिए कृपया कंसोल बंद करें।</p>
`;
document.body.appendChild(blockScreen);

setInterval(function() {
  const threshold = 80;
  const widthDiff = window.outerWidth - window.innerWidth > threshold;
  const heightDiff = window.outerHeight - window.innerHeight > threshold;

  if (widthDiff || heightDiff) {
    blockScreen.style.display = 'flex'; // कंसोल खुलने पर काली स्क्रीन और 500 STOP दिखेगा
  } else {
    blockScreen.style.display = 'none'; // कंसोल बंद होते ही वेबसाइट वापस सामान्य हो जाएगी
  }
}, 300);
