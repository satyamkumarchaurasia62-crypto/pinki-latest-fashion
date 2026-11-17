// product.js - Clean & Fixed Version
const firebaseConfig = {
  apiKey: "AIzaSyCZusA-DD8Tgz1Ak3GYT7zxFcqIvomDgj0",
authDomain: "auth.pinkilatestfashions.in",
  projectId: "pinki-latest-fashions",
  storageBucket: "pinki-latest-fashions.firebasestorage.app",
  messagingSenderId: "668264461811",
  appId: "1:668264461811:web:d51468e474750e69634e86",
  measurementId: "G-21HR2KLRJY"
};

if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  window.db = firebase.firestore();
}

const PRODUCTS = [
  {
    id: 1,
    title: "Royal Pink Anarkali Kurti",
    mrp: 1999,
    price: 1299,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S"],
    stock: { "S": 1 }
  },
  {
    id: 2,
    title: "Designer Ethnic Party Gown",
    mrp: 2799,
    price: 1899,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S"],
    stock: { "S": 1 }
  },
  {
    id: 3,
    title: "Floral Printed Cotton Suit Set",
    mrp: 1599,
    price: 999,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L"],
    stock: { "S": 4, "M": 4, "L": 4 }
  },
  {
    id: 4,
    title: "Traditional Silk Festive Kurta",
    mrp: 2199,
    price: 1499,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80"],
    sizes: ["M", "L", "XL"],
    stock: { "M": 3, "L": 3, "XL": 3 }
  }
];

window.liveRemainingStock = {};

async function syncProductsAndLiveStock() {
  if (typeof PRODUCTS === "undefined") return;

  try {
    const database = window.db || (typeof firebase !== "undefined" ? firebase.firestore() : null);
    if (!database) return;

    const ordersSnap = await database.collection("orders").get();
    const soldCount = {};

    ordersSnap.forEach(doc => {
      const ord = doc.data();
      const status = String(ord.deliveryStatus || ord.status || "").toLowerCase();

      const isCancelled = status.includes("cancel") || ord.deliveryStatus === "कैंसिल किया गया";
      const isReturned = status.includes("return_received") || status.includes("returned") || status === "return received";

      if (!isCancelled && !isReturned) {
        const pid = String(ord.productId || "");
        const sz = String(ord.size || "Free Size");
        const qty = Number(ord.quantity) || 1;
        const key = `${pid}_${sz}`;
        soldCount[key] = (soldCount[key] || 0) + qty;
      }
    });

    PRODUCTS.forEach(product => {
      const pid = String(product.id);
      const stockObj = product.stock || {};
      window.liveRemainingStock[pid] = {};

      (product.sizes || []).forEach(sz => {
        const totalQty = (stockObj[sz] !== undefined) ? Number(stockObj[sz]) : 10;
        const alreadySold = soldCount[`${pid}_${sz}`] || 0;
        window.liveRemainingStock[pid][sz] = Math.max(0, totalQty - alreadySold);
      });

      if (typeof refreshProductStockUI === "function") {
        refreshProductStockUI(pid);
      }
    });
  } catch (err) {
    console.error("Error syncing stock:", err);
  }
}
