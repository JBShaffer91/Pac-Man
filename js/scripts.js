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

// Define the tile size
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