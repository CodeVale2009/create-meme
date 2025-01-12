const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");
const presetImages = document.getElementById("presetImages");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const downloadMemeButton = document.getElementById("downloadMeme");
const randomTextButton = document.getElementById("randomTextButton");


// Store the current image for redrawing
let currentImage = null;

// Random text arrays for top and bottom text
const topTextOptions = [
  "Just woke up",
  "I need coffee",
  "Too tired",
  "One more episode",
  "Not today",
  "Too much work",
  "Help me",
  "Weekend please",
  "Napping all day",
  "Will it ever end?",
  "I can't even",
  "Why am I awake?",
  "Can I stay home?",
  "I’m so lost",
  "Gotta nap",
  "Still tired",
  "So done",
  "Too much thinking",
  "No more meetings",
  "Is it Friday yet?",
  "Time to zone out",
  "Need a break",
  "This can’t be real",
  "Everything hurts",
  "Just five more minutes",
  "No motivation",
  "Can’t focus",
  "I need a snack",
  "Please no more",
  "I’ll pass",
  "I am broken",
  "Can we cancel today?",
  "Brain is off",
  "Not enough sleep",
  "Feeling lazy",
  "Send coffee",
  "Send memes",
  "Please be the weekend",
  "Why is it so early?",
  "I’m not ready",
  "Can I get a nap?",
  "Just woke up confused",
  "This is a lot"
];

const bottomTextOptions = [
  "Coffee first",
  "Send help",
  "Not enough sleep",
  "Where's my blanket?",
  "Five more minutes",
  "I can't adult",
  "Let me sleep",
  "This is fine",
  "Can't function",
  "Send memes",
  "Too much to do",
  "In need of caffeine",
  "Brain not working",
  "Maybe tomorrow",
  "Where is my bed?",
  "Let’s nap forever",
  "Just one more minute",
  "I can't even today",
  "Does it ever end?",
  "Not ready for this",
  "My brain is mush",
  "Please, no more work",
  "Who needs sleep?",
  "I need chocolate",
  "Can I skip this?",
  "I need a nap",
  "I’ll deal with it later",
  "Nothing makes sense",
  "Send snacks",
  "I’m still in bed",
  "This isn’t real",
  "Just leave me alone",
  "Can't talk now",
  "Let me be",
  "In a mood today",
  "Too much chaos",
  "I’ll sleep through it",
  "Not today, please",
  "Just let me rest",
  "Work in progress",
  "Don’t talk to me",
  "Please let me sleep",
  "I’m so done"
];


// Initial canvas size
canvas.width = 800;
canvas.height = 600;

// Load and draw image
function loadImage(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    currentImage = img;
    adjustCanvasSize(img);
    redrawCanvas();
  };
}

// Adjust canvas size based on the image's aspect ratio
function adjustCanvasSize(img) {
  const aspectRatio = img.width / img.height;

  if (img.width > img.height) {
    canvas.width = Math.min(img.width, 800);
    canvas.height = canvas.width / aspectRatio;
  } else {
    canvas.height = Math.min(img.height, 600);
    canvas.width = canvas.height * aspectRatio;
  }

  const canvasContainer = document.querySelector(".meme-container");
  canvasContainer.style.width = canvas.width + 'px';
  canvasContainer.style.height = canvas.height + 'px';
}

// Redraw the canvas with the image and text
function redrawCanvas() {
  if (!currentImage) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const imgAspectRatio = currentImage.width / currentImage.height;
  let imgWidth = canvas.width;
  let imgHeight = canvas.width / imgAspectRatio;

  if (imgHeight > canvas.height) {
    imgHeight = canvas.height;
    imgWidth = canvas.height * imgAspectRatio;
  }

  const xPos = (canvas.width - imgWidth) / 2;
  const yPos = (canvas.height - imgHeight) / 2;

  ctx.drawImage(currentImage, xPos, yPos, imgWidth, imgHeight);

  const textMargin = 40;
  const topText = topTextInput.value.toUpperCase();
  const bottomText = bottomTextInput.value.toUpperCase();

  let fontSize = Math.min(imgHeight * 0.1, 50); // Font size 10% of image height, or 50px max

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = 2;

  function getMaxFontSize(text, width) {
    let size = fontSize;
    ctx.font = `${size}px Impact`;

    while (ctx.measureText(text).width > width - 40 && size > 10) {
      size -= 1;
      ctx.font = `${size}px Impact`;
    }
    return size;
  }

  function drawTextWithWrapping(text, x, y, maxWidth) {
    const words = text.split(" ");
    let line = "";
    const lineHeight = 1.2; // Line spacing for text

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && line !== "") {
        ctx.fillText(line, x, y);
        ctx.strokeText(line, x, y);
        line = words[i] + " ";
        y += fontSize * lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line, x, y);
    ctx.strokeText(line, x, y);
  }

  let adjustedFontSize = getMaxFontSize(topText, imgWidth);
  ctx.font = `${adjustedFontSize}px Impact`;
  let topTextY = yPos + textMargin + adjustedFontSize;

  if (topText) {
    drawTextWithWrapping(topText, canvas.width / 2, topTextY, imgWidth);
  }

  adjustedFontSize = getMaxFontSize(bottomText, imgWidth);
  ctx.font = `${adjustedFontSize}px Impact`;
  let bottomTextY = yPos + imgHeight - textMargin - adjustedFontSize / 2;

  if (bottomText) {
    drawTextWithWrapping(bottomText, canvas.width / 2, bottomTextY, imgWidth);
  }
}

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => loadImage(event.target.result);
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
  } else if (selectedImage) {
    loadImage(selectedImage);
  }
});

topTextInput.addEventListener("input", redrawCanvas);
bottomTextInput.addEventListener("input", redrawCanvas);

randomTextButton.addEventListener("click", () => {
  const randomTopText = topTextOptions[Math.floor(Math.random() * topTextOptions.length)];
  const randomBottomText = bottomTextOptions[Math.floor(Math.random() * bottomTextOptions.length)];

  topTextInput.value = randomTopText;
  bottomTextInput.value = randomBottomText;

  redrawCanvas();
});

downloadMemeButton.addEventListener("click", () => {
  const memeUrl = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = memeUrl;
  a.download = "meme.png";
  a.click();
});

const shareButton = document.getElementById("shareButton");

shareButton.addEventListener("click", () => {
  memeCanvas.toBlob((blob) => {
    const memeUrl = URL.createObjectURL(blob);

    if (navigator.share) {
      navigator.share({
        title: 'Check out my Meme!',
        text: 'Here is a funny meme I created!',
        files: [new File([blob], 'meme.png', { type: 'image/png' })],
      }).then(() => console.log('Meme shared successfully'))
        .catch((error) => console.error('Error sharing the meme:', error));
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = memeUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      alert('Meme URL copied to clipboard! You can share it now!');
    }

    URL.revokeObjectURL(memeUrl);
  }, 'image/png');
});
// Fullscreen functionality
fullscreenButton.addEventListener("click", function () {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
});

