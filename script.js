// script.js
const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");
const presetImages = document.getElementById("presetImages");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const downloadMemeButton = document.getElementById("downloadMeme");

// Set canvas dimensions
canvas.width = 600;
canvas.height = 400;

// Store the current image for redrawing
let currentImage = null;

// Load and draw image
function loadImage(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    currentImage = img;
    redrawCanvas();
  };
}

// Redraw the canvas with the image and text
function redrawCanvas() {
  if (!currentImage) return;

  // Clear entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw image
  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

  // Draw text
  const topText = topTextInput.value.toUpperCase();
  const bottomText = bottomTextInput.value.toUpperCase();

  ctx.font = "30px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = 2;

  // Top text
  if (topText) {
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);
  }

  // Bottom text
  if (bottomText) {
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

// Handle image upload
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => loadImage(event.target.result);
    reader.readAsDataURL(file);
  }
});

// Handle preset image selection
presetImages.addEventListener("change", (e) => {
    const selectedImage = e.target.value;
    
    if (selectedImage === "none") {
      // Clear canvas and reset inputs
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      topTextInput.value = "";
      bottomTextInput.value = "";
      currentImage = null; // Clear the current image reference
    } else if (selectedImage) {
      loadImage(selectedImage);
    }
  });
  

// Update text dynamically
topTextInput.addEventListener("input", redrawCanvas);
bottomTextInput.addEventListener("input", redrawCanvas);

// Download meme
downloadMemeButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
});
