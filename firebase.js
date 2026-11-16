import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

const _0x1a8f = [
  'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId',
  'AIzaSyDSLRGEEt8Ig2oXLUcPR3YLohGnSDohZLw',
  'pinki-latest-fashion.firebaseapp.com',
  'pinki-latest-fashion',
  'pinki-latest-fashion.appspot.com',
  '432889531515',
  '1:432889531515:web:00d4e5f9e84369051ae6de'
];

const _0x5b2d = function(_0x3e172a) {
  return _0x1a8f[_0x3e172a];
};

const firebaseConfig = {
  [_0x5b2d(0)]: _0x5b2d(6),
  [_0x5b2d(1)]: _0x5b2d(7),
  [_0x5b2d(2)]: _0x5b2d(8),
  [_0x5b2d(3)]: _0x5b2d(9),
  [_0x5b2d(4)]: _0x5b2d(10),
  [_0x5b2d(5)]: _0x5b2d(11)
};

const _0x9c1a = initializeApp(firebaseConfig);
export const auth = getAuth(_0x9c1a);
