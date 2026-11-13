// review.js - Public Ratings & Multi-Angle Camera Photos System

let selectedRating = 5;
let currentReviewOrderId = "";
let currentReviewProductId = "";

// 1. Rating Pop-up kholne ka function
function openRatingModal(orderId, productId) {
  currentReviewOrderId = orderId;
  currentReviewProductId = productId;
  selectedRating = 5;
  updateStarsUI(5);
  document.getElementById("reviewComment").value = "";

  // Sabhi 4 angle photo slots reset karein
  window.reviewAnglePhotos = { front: "", back: "", right: "", left: "" };
  ['front', 'back', 'right', 'left'].forEach(angle => {
    const img = document.getElementById(`review-preview-${angle}`);
    if (img) {
      img.src = "";
      img.classList.add("hidden");
    }
  });
  if (typeof updateAnglePhotoCount === "function") {
    updateAnglePhotoCount("review", 2);
  }

  document.getElementById("ratingModal").style.display = "flex";
}

function closeRatingModal() {
  document.getElementById("ratingModal").style.display = "none";
}

// 2. Stars select karne ka UI
function selectStar(star) {
  selectedRating = star;
  updateStarsUI(star);
}

function updateStarsUI(star) {
  const stars = document.querySelectorAll(".star-btn");
  stars.forEach((s, index) => {
    s.style.color = index < star ? "#f59e0b" : "#d1d5db";
  });
}

// 3. Review ko Firebase mein save karna (Minimum 2 Photos Compulsory)
async function submitReview() {
  const comment = document.getElementById("reviewComment").value.trim();
  const submitBtn = document.getElementById("submitReviewBtn");

  // Front, Back, Right, Left se upload ki gayi photos nikaalein
  const anglePhotosObj = window.reviewAnglePhotos || {};
  const photoBase64List = Object.values(anglePhotosObj).filter(val => val !== "");

  if (!comment) {
    if (typeof showAlert === "function") {
      await showAlert("Please write a short review about the outfit!", "Review Required", "error");
    }
    return;
  }

  if (photoBase64List.length < 2) {
    if (typeof showAlert === "function") {
      await showAlert(`Please capture or upload at least 2 photos (Front, Back, Right/Left). Currently uploaded: ${photoBase64List.length}`, "Minimum 2 Photos Required", "error");
    }
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  try {
    let firstName = "Verified Buyer";
    const loggedInRaw = sessionStorage.getItem("currentLoggedInUser");
    if (loggedInRaw) {
      const userObj = JSON.parse(loggedInRaw);
      if (userObj.name && userObj.name.trim()) {
        firstName = userObj.name.trim().split(" ")[0];
      }
    }

    const database = window.db || firebase.firestore();

    await database.collection("reviews").add({
      productId: String(currentReviewProductId),
      orderId: currentReviewOrderId,
      buyerName: firstName,
      rating: selectedRating,
      comment: comment,
      photos: photoBase64List,
      createdAt: new Date().toISOString()
    });

    await database.collection("orders").doc(currentReviewOrderId).update({
      isRated: true
    });

    closeRatingModal();
    if (typeof showAlert === "function") {
      await showAlert("Thank you! Your review and photos have been published.", "Review Submitted", "success");
    }
    if (typeof loadUserOrders === "function") {
      loadUserOrders();
    }
  } catch (err) {
    if (typeof showAlert === "function") {
      await showAlert("Error submitting review: " + err.message, "Error", "error");
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Review";
  }
}

// 4. Home Page (index.html) par har product ki Public Star Rating dikhana
window.allPublicReviewsCache = {};

async function loadPublicReviews() {
  const ratingBoxes = document.querySelectorAll(".public-rating-box");
  if (!ratingBoxes.length) return;

  try {
    const database = window.db || firebase.firestore();
    const snapshot = await database.collection("reviews").get();

    const groupedReviews = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const pid = String(data.productId);
      if (!groupedReviews[pid]) groupedReviews[pid] = [];
      groupedReviews[pid].push(data);
    });

    window.allPublicReviewsCache = groupedReviews;

    ratingBoxes.forEach(box => {
      const pid = String(box.getAttribute("data-product-id"));
      const productReviews = groupedReviews[pid] || [];

      if (productReviews.length === 0) {
        box.innerHTML = `<span style="font-size:11px; color:#a8a29e;">No reviews yet</span>`;
      } else {
        const totalStars = productReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0);
        const avgRating = (totalStars / productReviews.length).toFixed(1);

        box.innerHTML = `
          <div onclick="openPublicReviewsModal('${pid}')" style="display:inline-flex; align-items:center; gap:5px; cursor:pointer; background:#fffbeb; border:1px solid #fde68a; padding:2px 8px; border-radius:99px;">
            <span style="color:#f59e0b; font-size:12px;">★</span>
            <span style="font-size:12px; font-weight:700; color:#78350f;">${avgRating}</span>
            <span style="font-size:11px; color:#92400e; text-decoration:underline;">(${productReviews.length} reviews)</span>
          </div>
        `;
      }
    });
  } catch (err) {
    console.error("Error loading public reviews:", err);
  }
}

// 5. Product par click karne par sabhi customer reviews & photos ka pop-up kholna
function openPublicReviewsModal(productId) {
  const modal = document.getElementById("viewReviewsModal");
  const listDiv = document.getElementById("publicReviewsList");
  if (!modal || !listDiv) return;

  const reviews = window.allPublicReviewsCache[String(productId)] || [];
  listDiv.innerHTML = "";

  if (reviews.length === 0) {
    listDiv.innerHTML = `<p style="padding:16px 0; text-align:center; color:#78716c; font-size:13px;">No reviews available for this outfit yet.</p>`;
  } else {
    reviews.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    reviews.forEach(rev => {
      const starsStr = "★".repeat(rev.rating || 5) + "☆".repeat(5 - (rev.rating || 5));
      let photosHTML = "";
      if (rev.photos && rev.photos.length > 0) {
        photosHTML = `<div style="display:flex; gap:6px; margin-top:8px; flex-wrap:wrap;">` +
          rev.photos.map(src => `<img src="${src}" style="width:64px; height:64px; object-fit:cover; border-radius:8px; border:1px solid #e7e5e4;">`).join("") +
          `</div>`;
      }

      listDiv.innerHTML += `
        <div style="padding:12px 0; border-bottom:1px solid #f5f5f4;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:13px; color:#1c1917;">${rev.buyerName || "Verified Buyer"} <span style="font-size:10px; color:#16a34a; font-weight:600;">✓ Verified</span></span>
            <span style="color:#f59e0b; font-size:13px;">${starsStr}</span>
          </div>
          <p style="margin:6px 0 0; font-size:13px; color:#44403c; line-height:1.4;">${rev.comment || ""}</p>
          ${photosHTML}
        </div>
      `;
    });
  }

  modal.style.display = "flex";
}

window.addEventListener("DOMContentLoaded", loadPublicReviews);
