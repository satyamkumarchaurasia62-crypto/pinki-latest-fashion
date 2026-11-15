// 1. कंसोल में बड़ी चेतावनी दिखाना
console.log(
  "%cStop!",
  "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
);
console.log(
  "%cयह फीचर केवल डेवलपर्स के लिए है। यहाँ कोई भी कोड पेस्ट न करें।",
  "font-family: sans-serif; font-size: 1.5em; color: black;"
);

// 2. कंसोल के सारे मैसेज बंद करना
console.log = function() {};
console.warn = function() {};
console.error = function() {};

// 3. Right-Click बंद करना
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// 4. F12 और Inspect शॉर्टकट बंद करना
document.onkeydown = function(e) {
  if (e.keyCode == 123) { // F12
    return false;
  }
  if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 85) { // Ctrl+U
    return false;
  }
};
