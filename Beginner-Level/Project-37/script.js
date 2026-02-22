// Get dice element
const dice = document.getElementById("dice");

// Track current rotation
let currentX = 0;
let currentY = 0;

// Dot positions for each dice number (1-6)
const positions = {
  1: [5],
  2: [1,9],
  3: [1,5,9],
  4: [1,3,7,9],
  5: [1,3,5,7,9],
  6: [1,3,4,6,7,9]
};

// Initialize dots on each face
const faces = document.querySelectorAll(".face");
faces.forEach((face, index) => {
  const number = index + 1;
  face.innerHTML = "";
  positions[number].forEach(pos => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.gridArea = `${Math.ceil(pos/3)} / ${pos%3===0?3:pos%3}`;
    face.appendChild(dot);
  });
});

// Roll Dice function
function rollDice() {
  // Random number 1-6
  const roll = Math.floor(Math.random() * 6) + 1;

  // Add extra spins
  currentX += 720;
  currentY += 720;

  // Map dice number to rotation
  const rotations = {
    1: { x: 0,   y: 0 },
    2: { x: -90, y: 0 },
    3: { x: 0,   y: -90 },
    4: { x: 0,   y: 90 },
    5: { x: 90,  y: 0 },
    6: { x: 180, y: 0 }
  };

  // Apply rotation
  currentX += rotations[roll].x;
  currentY += rotations[roll].y;
  dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

  // ✅ Remove result text update
}