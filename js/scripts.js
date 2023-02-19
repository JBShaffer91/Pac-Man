const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const MAZE_WIDTH = 20;
const MAZE_HEIGHT = 20;
const tileSize = 20;

const WALL = 1;
const COIN = 2;
// Add other tile types as needed

const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,2,1,1,2,1],
  [1,2,1,2,1,2,1,2,2,1,2,1,2,2,1],
  [1,2,1,1,1,1,1,2,1,1,1,1,2,2,1],
  [1,2,2,2,1,2,2,2,2,2,1,2,2,2,1],
  [1,2,1,2,1,1,1,2,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const pacman = {
  x: 9,
  y: 14,
  radius: 10,
  mouthOpen: 0.2 * Math.PI,
  mouthClose: 1.8 * Math.PI,
  direction: 'left',
  speed: 4,
  update() {
    if (this.direction === 'left') {
      this.x -= this.speed;
    } else if (this.direction === 'right') {
      this.x += this.speed;
    } else if (this.direction === 'up') {
      this.y -= this.speed;
    } else if (this.direction === 'down') {
      this.y += this.speed;
    }
    this.wrap();
  },
  wrap() {
    if (this.x < 0) {
      this.x = MAZE_WIDTH * tileSize;
    } else if (this.x > MAZE_WIDTH * tileSize) {
      this.x = 0;
    } else if (this.y < 0) {
      this.y = MAZE_HEIGHT * tileSize;
    } else if (this.y > MAZE_HEIGHT * tileSize) {
      this.y = 0;
    }
  },
  draw() {
    const angle1 = this.mouthOpen;
    const angle2 = 2 * Math.PI - this.mouthOpen;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, angle1, angle2);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
  },
};

let coinsLeft = 0;
let gameover = false;

const mazeWidth = maze[0].length;
const mazeHeight = maze.length;

function drawMaze() {
  for (let i = 0; i < mazeHeight; i++) {
    for (let j = 0; j < mazeWidth; j++) {
      const tile = maze[i][j];
      if (tile === WALL) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
      } else if (tile === COIN) {
        ctx.beginPath();
        ctx.arc(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, tileSize / 4, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        coinsLeft++;
      }
      // Add drawing code for other tile types as needed
    }
  }
}

function drawScore() {
  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText(`Coins: ${coinsLeft}`, 20, 30);
}

function checkCollisions() {
  const pacmanTileX = Math.floor(pacman.x / tileSize);
  const pacmanTileY = Math.floor(pacman.y / tileSize);
  const tile = maze[pacmanTileY][pacmanTileX];
  if (tile === COIN) {
    coinsLeft--;
    maze[pacmanTileY][pacmanTileX] = 0;
    if (coinsLeft === 0) {
      gameover = true;
    }
  } else if (tile === WALL) {
    pacman.direction = '';
  }
}

function gameLoop() {
  if (!gameover) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawScore();
    pacman.update();
    checkCollisions();
    pacman.draw();
    window.requestAnimationFrame(gameLoop);
  } else {
    ctx.font = 'bold 48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over', canvas.width / 2 - 120, canvas.height / 2);
  }
}

function handleKeyDown(e) {
  switch (e.code) {
    case 'ArrowLeft':
      pacman.direction = 'left';
      break;
    case 'ArrowRight':
      pacman.direction = 'right';
      break;
    case 'ArrowUp':
      pacman.direction = 'up';
      break;
    case 'ArrowDown':
      pacman.direction = 'down';
      break;
  }
}

document.addEventListener('keydown', handleKeyDown);

// Start the game loop
gameLoop();

