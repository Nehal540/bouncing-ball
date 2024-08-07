let ball;
let bricks = [];
let brickSize = 50;

function setup() {
  createCanvas(600, 400);

  // Initialize ball
  ball = {
    x: width / 2,
    y: height / 2,
    radius: 30,
    xSpeed: 6,
    ySpeed: 2
  };

  // Initialize bricks in each corner
  bricks.push({ x: 0, y: 0, size: brickSize });              // Top-left
  bricks.push({ x: width - brickSize, y: 0, size: brickSize }); // Top-right
  bricks.push({ x: 0, y: height - brickSize, size: brickSize }); // Bottom-left
  bricks.push({ x: width - brickSize, y: height - brickSize, size: brickSize }); // Bottom-right
}

function draw() {
  background(220);

  // Draw bricks
  fill(0); // Black color
  noStroke();
  for (let brick of bricks) {
    rect(brick.x, brick.y, brick.size, brick.size);
  }

  // Update ball position
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;

  // Bounce off walls
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > width) {
    ball.xSpeed *= -1;
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
    ball.ySpeed *= -1;
  }

  // Bounce off bricks
  for (let brick of bricks) {
    if (ball.x + ball.radius > brick.x && ball.x - ball.radius < brick.x + brick.size &&
        ball.y + ball.radius > brick.y && ball.y - ball.radius < brick.y + brick.size) {
      // Ball is inside the brick's bounding box
      if (ball.x < brick.x || ball.x > brick.x + brick.size) {
        ball.xSpeed *= -1;
      }
      if (ball.y < brick.y || ball.y > brick.y + brick.size) {
        ball.ySpeed *= -1;
      }
    }
  }

  // Draw ball
  fill(255, 0, 0); // Red color
  noStroke();
  ellipse(ball.x, ball.y, ball.radius * 2);
}