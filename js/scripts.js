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

// define a function to check for collisions
function checkCollision(pacman, pellet) {
  // calculate the distance between Pac-Man and the pellet
  const dx = pacman.x - pellet.x;
  const dy = pacman.y - pellet.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // check if the distance between Pac-Man and the pellet is less than the sum of their radii
  if (distance < pacman.radius + pellet.radius) {
  return true; // collision
  } else {
  return false; // no collision
  }
}

// define a function to remove a pellet from the pellets array
function removePellet(pellet) {
  const index = pellets.indexOf(pellet);
  pellets.splice(index, 1);
}

// define a function to update the game
function update() {
  // check for collision
  for (let i = 0; i < pellets.length; i++) {
    const pellet = pellets[i];
    if (checkCollision(pacman, pellet)) {
      removePellet(pellet);
      score++;
    }
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

  // redraw the game
  drawMaze();
  drawPellets();
  drawPacman();
  drawScore();

  // call the update() function again in the next frame
  requestAnimationFrame(update);
}

// define a function to reset the pellets
function resetPellets() {
  // remove all pellets from the array
  pellets = [];

  // recreate the pellets in their original positions
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 0) {
        pellets.push({
          x: j * TILE_SIZE + TILE_SIZE / 2,
          y: i * TILE_SIZE + TILE_SIZE / 2,
          radius: TILE_SIZE / 10,
        });
      }
    }
  }
}

// define a function to handle key events
function keydown(e) {
  // handle the "c" key to clear the pellets
  if (e.code === "KeyC") {
    resetPellets();
  }
}

// add an event listener to the document to handle key events
document.addEventListener("keydown", handleKeyDown);

// create ghosts
let ghosts = [
  {
    x: 9 * TILE_SIZE + TILE_SIZE / 2,
    y: 8 * TILE_SIZE + TILE_SIZE / 2,
    direction: "left",
    color: "red",
  },
  {
    x: 9 * TILE_SIZE + TILE_SIZE / 2,
    y: 7 * TILE_SIZE + TILE_SIZE / 2,
    direction: "right",
    color: "pink",
  },
  {
    x: 10 * TILE_SIZE + TILE_SIZE / 2,
    y: 8 * TILE_SIZE + TILE_SIZE / 2,
    direction: "up",
    color: "cyan",
  },
  {
    x: 8 * TILE_SIZE + TILE_SIZE / 2,
    y: 8 * TILE_SIZE + TILE_SIZE / 2,
    direction: "down",
    color: "orange",
  }
];

// define a function to draw the ghosts
function drawGhosts() {
  ghosts.forEach((ghost) => {
    constext.beginPath();
    context.fillStyle = ghost.color;
    context.arc(ghost.x, ghost.y, TILE_SIZE / 2, 0, 2 * Math.PI);
    context.fill();
    context.clostPath();
  });
}

function draw() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the maze and pellets
  drawMaze();
  drawPellets();

  // draw Pac-Man
  drawPacman();

  // draw the ghosts
  if (showGhosts) {
    drawGhosts();
  }

  // update the ghost positions
  ghosts.forEach((ghost) => {
    if (ghost.direction === "left") {
      ghost.x -= 1;
    } else if (ghost.direction === "right") {
      ghost.x += 1;
    } else if (ghost.direction === "up") {
      ghost.y -= 1;
    } else if (ghost.direction === "down") {
      ghost.y += 1;
    }
  });

  // request the next animation frame
  requestAnimationFrame(draw);
}

// update the handleKeyDown() function to toggle ghosts on/off
function handleKeyDown(e) {
  if (e.code === "KeyG") {
    showGhosts = !showGhosts;
  }
}
