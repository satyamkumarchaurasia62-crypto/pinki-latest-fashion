const express = require("express");
const path = require("path"); 
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require('dotenv').config();

const app = express();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// यह लाइन तेरे 'Public' फोल्डर की सारी फाइल्स (index.html, CSS, इमेजेस, साइटमैप) सर्व कर देगी
app.use(express.static(path.join(__dirname, 'Public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { db };
