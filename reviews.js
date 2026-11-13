// reviews.js - Public Ratings & Multiple Photos System

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
  document.getElementById("reviewPhotosInput").value = "";
  document.getElementById("reviewPhotoPreview").innerHTML = "";
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

// 3. Multiple Photos ko compress karke preview dikhana (Max 3 photos)
function previewReviewPhotos(event) {
  const files = Array.from(event.target.files).slice(0, 3);
  const previewDiv = document.getElementById("reviewPhotoPreview");
  previewDiv.innerHTML = "";

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style = "width:50px; height:50px; object-fit:cover; border-radius:6px; border:1px solid #ddd;";
      previewDiv.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// Helper: Photo ko chhota (compress) karna taaki Firebase fast chale
function compressImage(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 500;
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.6)); // 60% quality JPEG
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
