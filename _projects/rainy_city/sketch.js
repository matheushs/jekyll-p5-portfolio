let rain = [];
let bg;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  gravity = createVector(0, 9.8);

  for (let i = 0; i < 500; i++) {
    rain.push(new Drop());
  }
}

function preload() {
  bg = loadImage('./bg.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(12, 110, 110);

  push();
  image(bg, width - bg.width, height - bg.height, windowWidth, bg.height);

  for (drop of rain) {
    drop.applyForce(gravity);
    drop.update();
    drop.render();
  }
  pop();

  for (let i = rain.length - 1; i >= 0; i--) {
    if (rain[i].offScreen()) {
      rain[i].pos.x = random(width);
      rain[i].pos.y = random(-200, -100);
    }
  }
  pop();
}