const button = document.getElementById('changeColorBtn');
const colorCodeDisplay = document.getElementById('colorCode');

// Function to generate random HEX color
function getRandomHexColor() {
  const hex = Math.floor(Math.random()*16777215).toString(16);
  return `#${hex.padStart(6,'0')}`;
}

// Function to change background color
function changeBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
  colorCodeDisplay.textContent = color;
}

// Event listener
button.addEventListener('click', changeBackgroundColor);