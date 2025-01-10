const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");
const presetImages = document.getElementById("presetImages");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const conditionalRandomizeMemeButton = document.getElementById("conditionalRandomizeMeme");
const downloadMemeButton = document.getElementById("downloadMeme");

canvas.width = 600;
canvas.height = 400;

let currentImage = null;
let currentImageName = "";

// Smart text dictionary based on image type
const textByImage = {
  cat: {
    top: ["Just a purr-fect day", "When you're the cat's meow"],
    bottom: ["#MeowLife", "Catitude overload"],
  },
  dog: {
    top: ["Best. Day. Ever.", "Who’s a good boi?"],
    bottom: ["#Pawsitivity", "Doggo mode: activated"],
  },
  default: {
    top: ["Life’s a meme", "When reality hits"],
    bottom: ["Meme level: 100", "Can’t stop, won’t stop"],
  },
};

function loadImage(url, name = "") {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    currentImage = img;
    currentImageName = name;
    redrawCanvas();
  };
}

function redrawCanvas() {
  if (!currentImage) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

  const topText = topTextInput.value.toUpperCase();
  const bottomText = bottomTextInput.value.toUpperCase();

  ctx.font = "30px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = 2;

  if (topText) {
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);
  }

  if (bottomText) {
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => loadImage(event.target.result, file.name.toLowerCase());
    reader.readAsDataURL(file);
  }
});

presetImages.addEventListener("change", (e) => {
  const selectedImage = e.target.value;
  if (selectedImage === "none") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    topTextInput.value = "";
    bottomTextInput.value = "";
    currentImage = null;
    currentImageName = "";
  } else if (selectedImage) {
    loadImage(selectedImage, selectedImage);
  }
});

// Smart randomizer
conditionalRandomizeMemeButton.addEventListener("click", () => {
  let key = "default";

  // Check if current image matches any keyword
  for (const keyword in textByImage) {
    if (currentImageName.includes(keyword)) {
      key = keyword;
      break;
    }
  }

  const randomTop = textByImage[key].top[Math.floor(Math.random() * textByImage[key].top.length)];
  const randomBottom = textByImage[key].bottom[Math.floor(Math.random() * textByImage[key].bottom.length)];

  topTextInput.value = randomTop;
  bottomTextInput.value = randomBottom;

  redrawCanvas();
});

downloadMemeButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
});
