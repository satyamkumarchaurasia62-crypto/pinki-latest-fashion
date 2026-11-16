// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSLRGEEt8Ig2oXLUcPR3YLohGnSDohZLw",             // यहाँ अपनी असली API Key डालें
  authDomain: "pinki-latest-fashion.firebaseapp.com",
  projectId: "pinki-latest-fashion",
  storageBucket: "pinki-latest-fashion.appspot.com",
  messagingSenderId: "432889531515",
  appId: "1:432889531515:web:00d4e5f9e84369051ae6de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
