const fallingObjectsContainer = document.querySelector(".falling-objects");
const petalsCountDisplay = document.getElementById("petals-count");
const yesButton = document.querySelector(".button.yes");
const noButton = document.querySelector(".button.no");
const basket = document.getElementById("basket");
let petalsCollected = 0;
const totalPetalsNeeded = 10;

// Function to create a falling object (petal or enemy)
function createFallingObject(type) {
  const object = document.createElement("div");
  object.classList.add(type);

  if (type === "petal") {
    object.style.left = `${Math.random() * 100}%`;
    object.style.animationDuration = `${Math.random() * 3 + 2}s`;
  } else if (type === "enemy") {
    object.textContent = "💀"; // Skull emoji as the enemy
    object.style.left = `${Math.random() * 100}%`;
    object.style.animationDuration = `${Math.random() * 3 + 2}s`;
  }

  // Check for collision with the basket
  const checkCollision = setInterval(() => {
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
        if (petalsCollected >= totalPetalsNeeded) {
          yesButton.style.display = "inline-block";
          noButton.style.display = "none";
        }
      } else if (type === "enemy") {
        resetGame();
      }
      object.remove();
      clearInterval(checkCollision);
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
