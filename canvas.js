const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const circles = [
  {
    x: 100,
    y: 80,
    radius: 30,
    color: "yellow",
    hitColor: "gray",
    hit: false,
  },
  {
    x: 100,
    y: 160,
    radius: 30,
    color: "blue",
    hitColor: "gray",
    hit: false,
  },
  {
    x: 100,
    y: 240,
    radius: 30,
    color: "red",
    hitColor: "gray",
    hit: false,
  },
  {
    x: 100,
    y: 320,
    radius: 30,
    color: "green",
    hitColor: "gray",
    hit: false,
  },
];

const arrows = [
  { x: 700, y: 80, dx: -5, active: false, target: 0 },
  { x: 700, y: 160, dx: -5, active: false, target: 1 },
  { x: 700, y: 240, dx: -5, active: false, target: 2 },
  { x: 700, y: 320, dx: -5, active: false, target: 3 },
];

let animationId;

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.hit ? circle.hitColor : circle.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  });

  arrows.forEach((arrow) => {
    ctx.beginPath();
    ctx.moveTo(arrow.x, arrow.y);
    ctx.lineTo(arrow.x + 30, arrow.y - 10);
    ctx.lineTo(arrow.x + 30, arrow.y - 5);
    ctx.lineTo(arrow.x + 60, arrow.y - 5);
    ctx.lineTo(arrow.x + 60, arrow.y + 5);
    ctx.lineTo(arrow.x + 30, arrow.y + 5);
    ctx.lineTo(arrow.x + 30, arrow.y + 10);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  });
}

function animate() {
  let shouldContinue = false;
  arrows.forEach((arrow) => {
    const targetCircle = circles[arrow.target];

    if (arrow.active && !targetCircle.hit) {
      if (arrow.x > targetCircle.x + targetCircle.radius) {
        arrow.x += arrow.dx;
        shouldContinue = true;
      } else {
        targetCircle.hit = true;
        arrow.active = false;
        // arrow.x = 700;
      }
    }
  });

  drawScene();
  if (shouldContinue) {
    animationId = requestAnimationFrame(animate);
  }
}

function resetGame() {
  circles.forEach((circle) => (circle.hit = false));
  arrows.forEach((arrow) => {
    arrow.x = 700;
    arrow.active = false;
  });
  drawScene();
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  circles.forEach((circle, index) => {
    const distance = Math.sqrt(
      (clickX - circle.x) ** 2 + (clickY - circle.y) ** 2
    );
    if (distance < circle.radius && !circle.hit) {
      arrows[index].active = true;
      animate();
    }
  });
});

document.getElementById("resetButton").addEventListener("click", resetGame);

drawScene();
