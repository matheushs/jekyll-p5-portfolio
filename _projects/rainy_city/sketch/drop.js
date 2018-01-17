class Drop {
  constructor() {
    let x = random(width);
    let y = random(-height, -10);
    let colors = ['#34495E',
      '#4B7A12',
      '#8FC34F',
      '#85C932',
      '#44A94B',
      '#0F6915'
    ];
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.size = random(8, 12);
    this.r = random(1, 2);
    this.color = random(colors);
  }

  applyForce(force) {
    let f = force.copy();
    f.mult(this.r);

    this.acc.add(f);
  }

  offScreen() {
    return (this.pos.y > height + this.size) || (this.pos.x > width + this.r)
  }

  render() {
    stroke(this.color);
    strokeWeight(this.r);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.size);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.r * 1.8);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

}