const valueInput = document.getElementById('valueInput');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');
const convertedValue = document.getElementById('convertedValue');

// Conversion factors to base units
const conversionTable = {
  // Length in meters
  meter: 1,
  centimeter: 0.01,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  mile: 1609.34,

  // Weight in kilograms
  kilogram: 1,
  gram: 0.001,
  pound: 0.453592,
  ounce: 0.0283495,

  // Volume in liters
  liter: 1,
  milliliter: 0.001,
  gallon: 3.78541
};

function convert() {
  const value = parseFloat(valueInput.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (isNaN(value)) {
    alert("Please enter a valid number!");
    return;
  }

  // Check if both units are of same type (length, weight, volume)
  const lengthUnits = ["meter","centimeter","kilometer","inch","foot","mile"];
  const weightUnits = ["kilogram","gram","pound","ounce"];
  const volumeUnits = ["liter","milliliter","gallon"];

  let typeMismatch = false;

  if (lengthUnits.includes(from) && !lengthUnits.includes(to)) typeMismatch = true;
  if (weightUnits.includes(from) && !weightUnits.includes(to)) typeMismatch = true;
  if (volumeUnits.includes(from) && !volumeUnits.includes(to)) typeMismatch = true;

  if (typeMismatch) {
    alert("Please select units of the same type!");
    return;
  }

  // Convert to base unit
  const valueInBase = value * conversionTable[from];
  const result = valueInBase / conversionTable[to];

  convertedValue.textContent = `${result.toFixed(4)} ${to}`;
  resultDiv.classList.remove('hidden');
}

function resetConverter() {
  valueInput.value = '';
  resultDiv.classList.add('hidden');
}

convertBtn.addEventListener('click', convert);
resetBtn.addEventListener('click', resetConverter);