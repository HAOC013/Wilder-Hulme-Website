<!DOCTYPE JSON>
function startGame() {
  // Set up the canvas and context
  const canvas = document.getElementById("minigame");
  const context = canvas.getContext("2d");

  // Set up the player object
  const player = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    velocity: 0,
    gravity: 1,
    jumping: false
  };

  // Set up the obstacle objects
  const obstacles = [
    {
      x: canvas.width,
      y: 0,
      width: 50,
      height: Math.floor(Math.random() * canvas.height),
      passed: false
    },
    {
      x: canvas.width + 300,
      y: 0,
      width: 50,
      height: Math.floor(Math.random() * canvas.height),
      passed: false
    }
  ];

// Get the canvas and context
const canvas = document.getElementById("minigame");
const context = canvas.getContext("2d");

// Set up the player object
const player = {
  x: 50,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  velocity: 0,
  gravity: 1,
  jumping: false
};

// Set up the obstacle objects
const obstacles = [{
    x: canvas.width,
    y: 0,
    width: 50,
    height: Math.floor(Math.random() * canvas.height),
    passed: false
  },
  {
    x: canvas.width + 300,
    y: 0,
    width: 50,
    height: Math.floor(Math.random() * canvas.height),
    passed: false
  }
];

// Set up the score
let score = 0;

// Set up the game loop
function gameLoop() {
  // Update the player's position
  player.velocity += player.gravity;
  player.y += player.velocity;

  // Check for collisions with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (
      player.x < obstacles[i].x + obstacles[i].width &&
      player.x + player.width > obstacles[i].x &&
      player.y < obstacles[i].height
    ) {
      gameOver();
      return;
    }

    // Update the score if the player passes an obstacle
    if (!obstacles[i].passed && obstacles[i].x < player.x) {
      obstacles[i].passed = true;
      score++;
    }
  }

  // Move obstacles to the left
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5;

    // Reset obstacles if they move off screen
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles[i] = {
        x: canvas.width,
        y: 0,
        width: 50,
        height: Math.floor(Math.random() * canvas.height),
        passed: false
      };
    }
  }

  // Clear the canvas and draw the player and obstacles
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "green";
  context.fillRect(player.x, player.y, player.width, player.height);

  for (let i = 0; i < obstacles.length; i++) {
    context.fillStyle = "brown";
    context.fillRect(
      obstacles[i].x,
      0,
      obstacles[i].width,
      obstacles[i].height
    );
    context.fillRect(
      obstacles[i].x,
      obstacles[i].height + 200,
      obstacles[i].width,
      canvas.height - obstacles[i].height - 200
    );
  }

  // Draw the score
  context.fillStyle = "white";
  context.font = "20px Arial";
  context.fillText("Score: " + score, 10, 25);

  // Request another animation frame
  window.requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Handle player input
document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !player.jumping) {
    player.velocity = -20;
    player.jumping = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code === "Space") {
    player.jumping = false;
  }
});

// Handle game over

alert("Game over! Your score was " + score)
