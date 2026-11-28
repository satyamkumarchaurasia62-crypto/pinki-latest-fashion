const express = require("express");
const path = require("path"); // इसे सबसे ऊपर ले आए
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

// **DANGER LINE REMOVED:** app.use(express.static(__dirname)); (इसे हटा दिया है)

// साइटमैप वाले राउट्स (इनको app.listen से ऊपर रखना है)
app.get('/sitemap.xml.gz', (req, res) => {
    res.sendFile(path.join(__dirname, 'sitemap.xml.gz'));
});

app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { db };
