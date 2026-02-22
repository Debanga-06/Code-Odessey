// DOM elements
const generateBtn = document.getElementById('generateBtn');
const colorDisplay = document.getElementById('colorDisplay');
const colorCode = document.getElementById('colorCode');

// Function to generate random hex color
function getRandomHexColor() {
  const hex = Math.floor(Math.random()*16777215).toString(16);
  return `#${hex.padStart(6,'0')}`;
}

// Function to generate random RGB color
function getRandomRGBColor() {
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to update color display
function generateColor() {
  // Randomly choose RGB or HEX
  const useHex = Math.random() < 0.5;
  let color;

  if (useHex) {
    color = getRandomHexColor();
  } else {
    color = getRandomRGBColor();
  }

  colorDisplay.style.backgroundColor = color;
  colorCode.textContent = color;
}

// Event listener
generateBtn.addEventListener('click', generateColor);

// Initialize with a random color
generateColor();