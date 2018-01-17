let rain = [];
let bg;

function setup() {
  // put setup code here
  myDiv = document.getElementById('sketch-holder');
  console.log(myDiv.offsetWidth);
  console.log(myDiv.offsetHeight);
  myCanvas = createCanvas(myDiv.offsetWidth, myDiv.offsetHeight);
  myCanvas.parent('sketch-holder');

  gravity = createVector(0, 9.8);
  for (let i = 0; i < 500; i++) {
    rain.push(new Drop());
  }
}

function preload() {
  bg = loadImage('bg.png');
}

function windowResized() {
  resizeCanvas(myDiv.offsetWidth, myDiv.offsetHeight);

}

function draw() {
  background(12, 110, 110);
  image(bg, 0, 0, myDiv.offsetWidth, myDiv.offsetHeight);

  push();

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