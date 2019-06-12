let canvas = document.querySelector("canvas");

//canvas measurements
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
let mouse = {
  x: undefined,
  y: undefined
};
let colorArray = ["#20448C", "#0367A6", "#0378A6", "#A0A603", "#BF9D7E"];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x, y, dy, dx, r) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.dx = dx;
  this.r = r;
  this.minRadius = r;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  this.update = function() {
    if (this.x + this.r > innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //growth interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.r < 40) {
        this.r += 1;
      }
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }

    this.draw();
  };
}

let circleArray = [];

//frame loop
function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
function init() {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
    let r = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    /* let x = innerWidth / 2;
        let y = innerHeight / 2; */
    let dy = Math.random() - 0.5;
    let dx = Math.random() - 0.5;
    circleArray.push(new Circle(x, y, dy, dx, r));
  }
}
init();
animate();
