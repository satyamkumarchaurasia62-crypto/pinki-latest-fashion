// product.js - Pinki Latest Fashion Products Catalog & Live Stock Engine
const PRODUCTS = [
  {
    id: 1,
    title: "Royal Pink Anarkali Kurti",
    price: 1299,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 10, M: 5, L: 8, XL: 4 }
  },
  {
    id: 2,
    title: "Designer Ethnic Party Gown",
    price: 1899,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    stock: { M: 6, L: 2, XL: 0, XXL: 5 }
  },
  {
    id: 3,
    title: "Floral Printed Cotton Suit Set",
    price: 999,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
    sizes: ["S", "M", "L"],
    stock: { S: 4, M: 4, L: 4 }
  },
  {
    id: 4,
    title: "Traditional Silk Festive Kurta",
    price: 1499,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
    sizes: ["M", "L", "XL"],
    stock: { M: 3, L: 3, XL: 3 }
  }
];

// ============================================================
// Automatic Live Stock Engine (Isse chhedne ki zaroorat nahi hai)
// ============================================================
window.liveRemainingStock = {};

async function syncProductsAndLiveStock() {
  if (typeof PRODUCTS === "undefined") return;

  try {
    const database = window.db || firebase.firestore();
    const ordersSnap = await database.collection("orders").get();

    // Firebase se sabhi active (non-cancelled) orders ginein
    const soldCount = {};
    ordersSnap.forEach(doc => {
      const ord = doc.data();
      const status = (ord.deliveryStatus || ord.status || "").toLowerCase();
      if (status !== "cancelled" && ord.deliveryStatus !== "कैंसिल किया गया") {
        const pid = String(ord.productId || "");
        const sz = String(ord.size || "Free Size");
        const qty = Number(ord.quantity) || 1;
        const key = `${pid}_${sz}`;
        soldCount[key] = (soldCount[key] || 0) + qty;
      }
    });

    // Har product aur size ka bacha hua asli stock nikaalein
    PRODUCTS.forEach(product => {
      const pid = String(product.id);
      const stockObj = product.stock || {};
      window.liveRemainingStock[pid] = {};

      (product.sizes || []).forEach(sz => {
        const totalQty = (stockObj[sz] !== undefined) ? Number(stockObj[sz]) : 10;
        const alreadySold = soldCount[`${pid}_${sz}`] || 0;
        window.liveRemainingStock[pid][sz] = Math.max(0, totalQty - alreadySold);
      });

      refreshProductStockUI(pid);
    });
  } catch (err) {
    console.error("Live stock sync error:", err);
  }
}

function refreshProductStockUI(productId) {
  const pid = String(productId);
  const sizeSelect = document.getElementById(`size-${pid}`);
  const badge = document.getElementById(`stock-badge-${pid}`);
  const buyBtn = document.getElementById(`buy-btn-${pid}`);
  const qtyInput = document.getElementById(`qty-${pid}`);
  if (!sizeSelect || !badge || !buyBtn) return;

  const selectedSize = sizeSelect.value;
  const stockData = window.liveRemainingStock[pid] || {};
  const remaining = (stockData[selectedSize] !== undefined) ? stockData[selectedSize] : 10;

  if (remaining <= 0) {
    badge.innerHTML = `<span class="inline-block bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold">✕ Size ${selectedSize}: Out of Stock</span>`;
    buyBtn.disabled = true;
    buyBtn.innerText = "OUT OF STOCK";
    buyBtn.className = "w-full bg-stone-300 text-stone-500 font-bold py-2.5 px-4 rounded-xl text-sm cursor-not-allowed";
    if (qtyInput) qtyInput.disabled = true;
  } else if (remaining <= 5) {
    badge.innerHTML = `<span class="inline-block bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">🔥 Size ${selectedSize}: Only ${remaining} left!</span>`;
    buyBtn.disabled = false;
    buyBtn.innerText = "BUY NOW";
    buyBtn.className = "w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow";
    if (qtyInput) {
      qtyInput.disabled = false;
      qtyInput.max = remaining;
      if (Number(qtyInput.value) > remaining) qtyInput.value = remaining;
    }
  } else {
    badge.innerHTML = `<span class="inline-block bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold">✓ Size ${selectedSize}: In Stock (${remaining})</span>`;
    buyBtn.disabled = false;
    buyBtn.innerText = "BUY NOW";
    buyBtn.className = "w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow";
    if (qtyInput) {
      qtyInput.disabled = false;
      qtyInput.max = remaining;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(syncProductsAndLiveStock, 350);
});
