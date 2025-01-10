const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");
const presetImages = document.getElementById("presetImages");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const downloadMemeButton = document.getElementById("downloadMeme");
const randomizeMemeButton = document.getElementById("conditionalRandomizeMeme");

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

const memeTopTextOptions = [
  "When you realize it's Monday...",
  "Me trying to survive this day...",
  "That moment you regret your decisions...",
  "When you see the bill after a night out...",
  "Me, looking at my empty fridge...",
  "When the WiFi goes down for 5 minutes...",
  "That feeling when you find your lost socks...",
  "When the coffee kicks in...",
  "Me when I hear someone eating chips loudly...",
  "When your favorite show ends forever...",
  "Me pretending to be busy at work...",
  "When you hit snooze for the 10th time...",
  "The moment you realize you're late...",
  "Me when I see someone eating my food...",
  "That awkward moment when you forget someone's name...",
  "When the dog looks at you like that...",
  "When you're trying to act cool but fail...",
  "Me waiting for the weekend like...",
  "When you see your ex after a long time...",
  "When the autocorrect makes things worse...",
  "Me looking for my phone while holding it...",
  "That moment when you remember a funny joke...",
  "When you have no idea what you're doing...",
  "Me looking at my bank account...",
  "When you realize you have an exam tomorrow...",
  "When you see a spider and you're alone...",
  "When you're too tired to function...",
  "When the pizza delivery guy arrives...",
  "When you catch your reflection in the mirror...",
  "Me in the morning before coffee...",
  "That moment when you understand the joke...",
  "When your friend tells a terrible pun...",
  "When you can't decide between two options...",
  "Me trying to remember if I locked the door...",
  "That feeling when you wake up in a panic...",
  "When your phone battery is on 1%...",
  "When you accidentally send a text to the wrong person...",
  "When you try to take a cute selfie...",
  "Me trying to read a long message from my mom...",
  "That awkward silence when someone says something dumb...",
  "When you finally find your glasses...",
  "When you're stuck in traffic for hours...",
  "Me when I hear a new song I love...",
  "That moment when you get a compliment...",
  "When you're not sure if you want to nap or work...",
  "Me looking for my charger in the dark...",
  "When you get lost in your own neighborhood...",
  "That moment when you realize you're out of snacks...",
  "When you see a kid do something impressive...",
  "When you realize you're out of coffee...",
  "That moment when you hear a doorbell ring...",
  "When you decide to start a diet but eat junk food...",
  "When your friend makes a bad joke...",
  "When you open your computer to work and get distracted...",
  "When you try to impress someone and fail miserably...",
  "When you see someone embarrassing themselves...",
  "When you find out you still have to work...",
  "Me after I mess up in a meeting...",
  "When the text is too long to read but you do anyway...",
  "That moment when you realize you're the only one left...",
  "When you hear someone else’s plans and you’re too tired to go...",
  "When you binge-watch a whole series in one day...",
  "When you find out there’s a new flavor of ice cream...",
  "Me when I accidentally call someone by the wrong name...",
  "That feeling when you just want to take a nap...",
  "When you realize it's Friday but you're still working...",
  "When the weekend feels so far away...",
  "When you’re too tired to function properly...",
  "When you’re waiting for an email from your boss...",
  "Me looking for my glasses in my hand...",
  "That feeling when you realize you left your phone somewhere...",
  "When you get a new message but it's just spam...",
  "When you discover a new app that wastes all your time...",
  "When the weather is perfect but you're stuck inside...",
  "That feeling when you wake up and it's still dark outside...",
  "When you hear a joke but don’t get it...",
  "Me trying to hide my excitement when I see food...",
  "When you look at the time and realize it's way too late...",
  "When you finally decide to take a break from work...",
  "That moment when your friend steals your food...",
  "When you think you’ve seen a ghost but it’s just your shadow...",
  "When the boss says 'Just one more thing'...",
  "That moment when your pet gives you a disapproving look...",
  "When you realize you’ve been holding your breath...",
  "Me when I’m trying to act like I’m not interested...",
  "When the WiFi comes back after a long break...",
  "When you eat something spicy for the first time...",
  "Me when my phone autocorrects something funny...",
  "When the coffee hits and suddenly everything makes sense...",
  "When your friend makes a suggestion you didn’t ask for...",
  "That moment when you find the perfect meme...",
  "When you see something cute and just can’t handle it...",
  "When you remember you forgot to do something important...",
  "Me trying to act professional in front of my boss...",
  "When your favorite song comes on the radio...",
  "That moment when you realize you’re running late...",
  "When you’re trying to get comfy but your pillow doesn’t cooperate...",
  "When you’re too tired to deal with it...",
  "When you see an unexpected text from someone...",
  "Me when I look at my calendar and see deadlines...",
  "When you decide to skip work and just nap all day..."
];

const memeBottomTextOptions = [
  "...and you're not prepared.",
  "...but the damage is already done.",
  "...and then you immediately regret it.",
  "...and wish you could turn back time.",
  "...it’s always the same story.",
  "...and now everything is ruined.",
  "...I don't think I'll ever be the same.",
  "...and everything else is just a blur.",
  "...seriously, it's like a torture device.",
  "...and you're just left there, speechless.",
  "...no one warned me about this.",
  "...but it’s too late now.",
  "...and you're still confused.",
  "...and nothing makes sense anymore.",
  "...but at least I survived.",
  "...and I never want to go through that again.",
  "...I didn’t ask for this.",
  "...and it’s going to haunt me forever.",
  "...just another day of chaos.",
  "...and now I’m stuck with the consequences.",
  "...and my heart can’t take it anymore.",
  "...and that’s when things went downhill.",
  "...and I’m never going back.",
  "...and I’ll be sleeping forever.",
  "...but now it's a whole new adventure.",
  "...and I can't believe this happened.",
  "...and I’m just here for the ride.",
  "...and it’s been downhill from there.",
  "...and now I need therapy.",
  "...but I’m not sure if I’m alive anymore.",
  "...and nothing makes sense anymore.",
  "...and that's how the story ends.",
  "...and I can't stop laughing.",
  "...and it's all downhill from here.",
  "...but I can’t stop smiling.",
  "...and I’m so confused right now.",
  "...and I need answers, NOW.",
  "...and my whole life is a meme.",
  "...and I think I broke something.",
  "...but my patience is wearing thin.",
  "...and that was my last nerve.",
  "...and it's just another Monday...",
  "...and it's too late to change things.",
  "...but I still have to survive.",
  "...and I’ll never let it go.",
  "...but I’m still here for it.",
  "...and it’s always the worst timing.",
  "...and I’ll never get over this moment.",
  "...and it’s the end of the world as I know it.",
  "...and life just keeps getting weirder."
];

// Function to generate random meme text
const generateRandomMemeText = () => {
  const randomTopText = memeTopTextOptions[Math.floor(Math.random() * memeTopTextOptions.length)];
  const randomBottomText = memeBottomTextOptions[Math.floor(Math.random() * memeBottomTextOptions.length)];

  topTextInput.value = randomTopText;
  bottomTextInput.value = randomBottomText;

  console.log(`Generated Meme Text: Top - "${randomTopText}", Bottom - "${randomBottomText}"`);

  redrawCanvas(); // Re-render the canvas with the new random text
};

// Randomize meme button click event
randomizeMemeButton.addEventListener('click', () => {
  console.log('Randomize Meme button clicked');

  // Generate meme text
  generateRandomMemeText();
});
