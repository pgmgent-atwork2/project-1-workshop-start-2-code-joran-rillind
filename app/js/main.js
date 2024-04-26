  // Selecting elements
  const bird = document.getElementById("bird");
  const pipes = [
    document.getElementById("pipe1"),
    document.getElementById("pipe2"),
  ];
  const pointsDisplay = document.querySelector(".points");

  // Game parameters
  const gravity = 0.15;
  let velocity = 0;
  let position = 250;
  let points = 0;
  let isGameOver = false;

  // Event listener for space key
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isGameOver) {
      flap();
    }
  });

  // Flap function
  function flap() {
    velocity = -4;
  }

  // Game loop
  function gameLoop() {
    if (!isGameOver) {
      velocity += gravity;
      position += velocity;

      // Bird position constraints
      if (position >= 875 || position <= 0) {
        position = Math.max(Math.min(position, 875), 0);
        velocity = 0;
        gameOver(); 
      }

      bird.style.top = position + "px";

      // Collision detection
      if (pipes.some((pipe) => isColliding(bird, pipe))) {
        gameOver();
        return;
      }

      // Scoring
      let passedBothPipes = false;
      pipes.forEach((pipe, index) => {
        if (!pipe.passed && isPassing(pipe)) {
          pipe.passed = true;
          if (index % 2 === 0 && !passedBothPipes) {
            passedBothPipes = true;
          } else if (index % 2 !== 0 && passedBothPipes) {
            points++;
            updatePointsDisplay();
            passedBothPipes = false;
          }
        }
      });
    }
    requestAnimationFrame(gameLoop);
  }

  // Collision detection function
  function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
  }

  // Check if bird passes a pipe
  function isPassing(pipe) {
    const birdRect = bird.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();
    return (
      birdRect.right > pipeRect.left &&
      birdRect.left < pipeRect.left &&
      !isGameOver
    );
  }

  // Move pipes
  function movePipe(pipe) {
    let pipeRight = 1500;
    const pipeHeight = () => Math.floor(Math.random() * 100) + 100;
    pipe.passed = false; 
    setInterval(() => {
      if (!isGameOver) {
        if (pipeRight < -80) {
          pipeRight = 1500;
          pipe.style.height = pipeHeight() + "px";
          pipe.passed = false; 
        } else {
          pipeRight -= 5;
          pipe.style.left = pipeRight + "px";
        }
      }
    }, 10);
  }

  // Game over function
  function gameOver() {
    isGameOver = true;
    window.location.href = "index.html";
  }

  // Reset game function
  function resetGame() {
    position = 250;
    velocity = 0;
    points = 0;
    updatePointsDisplay();
    isGameOver = false;
  }

  // Update points display
  function updatePointsDisplay() {
    pointsDisplay.innerHTML = `<h1>Points: ${points}</h1>`;
  }

  // Start game
  movePipe(pipes[0]);
  movePipe(pipes[1]);
  gameLoop();
