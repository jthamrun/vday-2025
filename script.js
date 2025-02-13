const fallingObjectsContainer = document.querySelector(".falling-objects");
const petalsCountDisplay = document.getElementById("petals-count");
const yesButton = document.querySelector(".button.yes");
const noButton = document.querySelector(".button.no");
const basket = document.getElementById("basket");
const memoryLanePopup = document.getElementById("memory-lane-popup");
const memoryPhoto = document.getElementById("memory-photo");
const memoryCaption = document.getElementById("memory-caption");
const loveNote = document.getElementById("love-note");

let petalsCollected = 0;
const totalPetalsNeeded = 10;
let gamePaused = false; // Track if the game is paused
let fallingObjects = []; // Track all falling objects

// Memory Lane Data (Replace with your own photos and messages)
const memoryLaneData = [
  {
    photo: "photo1.jpg",
    caption: "Our first movie together",
    note: "I fell in love with your smile that day, and I’ve been falling for you ever since. You are my sunshine ☀️.",
  },
  {
    photo: "photo2.jpg",
    caption: "My 23rd Birthday",
    note: "You looked so beautiful with your short hair, and I can’t wait to see how stunning you’ll be when you cut it again. You always take my breath away.",
  },
  {
    photo: "photo3.jpg",
    caption: "Random Staircase in San Gabriel",
    note: "Even in the most ordinary places, you make everything extraordinary. With you, every moment feels like a treasure.",
  },
  {
    photo: "photo4.jpeg",
    caption: "First Photoshoot Together",
    note: "This was just the beginning of our many photoshoots. Who knew we’d have so many beautiful memories captured together? You make every picture perfect.",
  },
  {
    photo: "photo5.jpeg",
    caption: "First Jimjilbang Together",
    note: "You always push me to try new things, and I love how adventurous life feels with you. Every experience is better because you’re by my side.",
  },
  {
    photo: "photo6.jpeg",
    caption: "First Music Festival Together",
    note: "I never thought I’d enjoy a music festival, but with you, even the loudest crowds feel peaceful. You make everything magical.",
  },
  {
    photo: "photo7.jpeg",
    caption: "First Time in Indo Together",
    note: "Showing you my world was one of the most special moments of my life. I’ll always go the extra mile to make you happy.",
  },
  {
    photo: "photo8.jpeg",
    caption: "Pre-wedding Photoshoot",
    note: "You were right—we’re pretty, and that’s why! 😂 But more than that, we’re perfect together. I can’t wait for our forever.",
  },
  {
    photo: "photo9.jpeg",
    caption: "Full of Promises",
    note: "Every day with you feels like a new promise from God. I’m so grateful for the life we’re building together.",
  },
  {
    photo: "photo10.jpeg",
    caption: "Our First Trip Together - Just the Two of Us",
    note: "So many ‘firsts’ with you, and I’m looking forward to countless more. You make every journey unforgettable.",
  },
];

// Function to show Memory Lane popup
function showMemoryLane(index) {
  const memory = memoryLaneData[index];
  memoryPhoto.src = memory.photo;
  memoryCaption.innerHTML = `<strong>${memory.caption}</strong>`; // Bold the caption
  loveNote.textContent = memory.note;
  memoryLanePopup.style.display = "flex";
  pauseGame(); // Pause the game
}

// Function to close Memory Lane popup
function closePopup() {
  memoryLanePopup.style.display = "none";
  resumeGame(); // Resume the game
}

// Function to pause the game
function pauseGame() {
  gamePaused = true;
  fallingObjects.forEach((object) => {
    object.style.animationPlayState = "paused"; // Pause all falling objects
  });
}

// Function to resume the game
function resumeGame() {
  gamePaused = false;
  fallingObjects.forEach((object) => {
    object.style.animationPlayState = "running"; // Resume all falling objects
  });
}

// Function to create a falling object (petal or enemy)
function createFallingObject(type) {
  if (gamePaused) return; // Don't create objects if the game is paused

  const object = document.createElement("div");
  object.classList.add(type);

  if (type === "petal") {
    object.style.left = `${Math.random() * 100}%`;
    object.style.animationDuration = `${Math.random() * 5 + 5}s`; // Slower falling speed
  } else if (type === "enemy") {
    object.textContent = "💀";
    object.style.left = `${Math.random() * 100}%`;
    object.style.animationDuration = `${Math.random() * 5 + 5}s`; // Slower falling speed
  }

  // Add the object to the tracking array
  fallingObjects.push(object);

  // Check for collision with the basket
  const checkCollision = setInterval(() => {
    if (gamePaused) return; // Don't check collisions if the game is paused

    const objectRect = object.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      objectRect.bottom >= basketRect.top &&
      objectRect.left >= basketRect.left &&
      objectRect.right <= basketRect.right
    ) {
      if (type === "petal") {
        petalsCollected++;
        petalsCountDisplay.textContent = totalPetalsNeeded - petalsCollected;
        showMemoryLane(petalsCollected - 1); // Show memory and love note
        if (petalsCollected >= totalPetalsNeeded) {
          yesButton.style.display = "inline-block";
          noButton.style.display = "none";
        }
      } else if (type === "enemy") {
        resetGame();
      }
      object.remove();
      clearInterval(checkCollision);
      fallingObjects = fallingObjects.filter((obj) => obj !== object); // Remove from tracking array
    }
  }, 100);

  fallingObjectsContainer.appendChild(object);
}

// Function to reset the game
function resetGame() {
  fallingObjectsContainer.innerHTML = "";
  petalsCollected = 0;
  petalsCountDisplay.textContent = totalPetalsNeeded;
  yesButton.style.display = "none";
  noButton.style.display = "inline-block";
  fallingObjects = []; // Clear the tracking array
  startGame();
}

// Function to start the game
function startGame() {
  // Create petals
  setInterval(() => createFallingObject("petal"), 1000);

  // Create enemies (less frequently)
  setInterval(() => createFallingObject("enemy"), 3000);
}

// Move the basket with touch or mouse
function moveBasket(event) {
  if (gamePaused) return; // Don't move the basket if the game is paused

  let clientX;
  if (event.touches) {
    clientX = event.touches[0].clientX; // For touch devices
  } else {
    clientX = event.clientX; // For desktop
  }
  basket.style.left = `${clientX - basket.offsetWidth / 2}px`;
}

// Add event listeners for both touch and mouse
document.addEventListener("mousemove", moveBasket);
document.addEventListener("touchmove", moveBasket);

// Initialize
startGame();
