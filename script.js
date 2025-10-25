const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let playerX = 180;
let score = 0;
let gameRunning = true;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } else if (e.key === "ArrowRight" && playerX < 360) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
}

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.floor(Math.random() * 10) * 40 + "px";
  gameArea.appendChild(enemy);

  let enemyY = 0;
  const fallInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fallInterval);
      return;
    }

    enemyY += 5;
    enemy.style.top = enemyY + "px";

    // Collision detection
    if (
      enemyY > 450 &&
      parseInt(enemy.style.left) === playerX
    ) {
      endGame();
      clearInterval(fallInterval);
    }

    if (enemyY > 500) {
      enemy.remove();
      score++;
      scoreDisplay.textContent = "Score: " + score;
      clearInterval(fallInterval);
    }
  }, 50);
}

function endGame() {
  gameRunning = false;
  scoreDisplay.textContent = "Game Over! Final Score: " + score;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  score = 0;
  playerX = 180;
  player.style.left = playerX + "px";
  scoreDisplay.textContent = "Score: 0";
  restartBtn.style.display = "none";
  gameRunning = true;
});

setInterval(() => {
  if (gameRunning) createEnemy();
}, 1000);
