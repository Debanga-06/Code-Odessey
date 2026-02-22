// DOM elements
const tempInput = document.getElementById('tempInput');
const unitSelect = document.getElementById('unitSelect');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');

const resultDiv = document.getElementById('result');
const celsiusVal = document.getElementById('celsiusVal');
const fahrenheitVal = document.getElementById('fahrenheitVal');
const kelvinVal = document.getElementById('kelvinVal');

// Conversion logic
function convertTemperature() {
  const temp = parseFloat(tempInput.value);
  const unit = unitSelect.value;

  if (isNaN(temp)) {
    alert("Please enter a valid temperature value!");
    return;
  }

  let celsius, fahrenheit, kelvin;

  if (unit === "celsius") {
    celsius = temp;
    fahrenheit = (temp * 9/5) + 32;
    kelvin = temp + 273.15;
  } else if (unit === "fahrenheit") {
    celsius = (temp - 32) * 5/9;
    fahrenheit = temp;
    kelvin = (temp - 32) * 5/9 + 273.15;
  } else if (unit === "kelvin") {
    celsius = temp - 273.15;
    fahrenheit = (temp - 273.15) * 9/5 + 32;
    kelvin = temp;
  }

  // Display results with 2 decimal places
  celsiusVal.textContent = celsius.toFixed(2);
  fahrenheitVal.textContent = fahrenheit.toFixed(2);
  kelvinVal.textContent = kelvin.toFixed(2);

  resultDiv.classList.remove('hidden');
}

// Reset function
function resetConverter() {
  tempInput.value = '';
  resultDiv.classList.add('hidden');
}

// Event listeners
convertBtn.addEventListener('click', convertTemperature);
resetBtn.addEventListener('click', resetConverter);