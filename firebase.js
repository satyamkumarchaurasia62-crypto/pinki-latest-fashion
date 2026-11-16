// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSLRGEEt8Ig2oXLUcPR3YLohGnSDohZLw",
  authDomain: "pinki-latest-fashion.firebaseapp.com",
  projectId: "pinki-latest-fashion",
  storageBucket: "pinki-latest-fashion.firebasestorage.app",
  messagingSenderId: "432889531515",
  appId: "1:432889531515:web:00d4e5f9e84369051ae6de",
  measurementId: "G-CXSRMW6GVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
