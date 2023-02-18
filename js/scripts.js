// get reference to canvas, get 2D drawing context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// create the maze
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// define the tile size
const TILE_SIZE = 20;

// loop through the maze array
for (let i =0; i < maze.length; i++) {
  for (let j = 0; j < maze[i].length; j++) {
    if (maze[i][j] === 1) {
      // draw the wall tile
      ctx. fillStyle = "blue";
      ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    } else {
      // draw the floor tile
      ctx. fillStyle - "black";
      ctx.fillRect(j * TILE_SIZE, i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

// define the Pac-Man object with initial properties
const pacman = {
  x: 100, // initial x position
  y: 100, // initial y position
  radius: 10, // Pac-Man's radius
  mouth: 0, // Pac-Man's mouth opening
  speed: 5, // Pac-Man's speed
  direction: "right" // Pac-Man's initial direction
}

// draw Pac-Man on the canvas
function drawPacman() {
  // set the fill style to yellow for the body
  ctx.fillStyle = "yellow";

  // create a new path for Pac-Man
  ctx.beginPath();

  //Use the arc() method to create a circle shape for Pac-Man
  ctx.arc(pacman.x, pacman.y, pacman.radius, pacman.mouth, Math.PI * 2 - pacman.mouth);

  // fill the circle with the fill style
  ctx.fill();

  // update Pac-Man's mouth opening
  pacman.mouth += 0.1;

  // if mouth is fully open or closed, reverse the direction
  if (pacman.mouth > Math.PI / 4 || pacman.mouth <0) {
  pacman.speed = -pacman.speed;
  }

  // move Pac-Man in the current direction
  if (pacman.direction === "right") {
  pacman.x += pacman.speed;
  } else if (pacman.direction === "left") {
  pacman.x -= pacman.speed;
  } else if (pacman.direction === "up") {
  pacman.y -= pacman.speed;
  } else if (pacman.direction === "down") {
  pacman.y += pacman.speed;
  }
}

// draw Pac-Man to the canvas
drawPacman();