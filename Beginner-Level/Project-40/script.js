// Get DOM elements
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');
const bmiValueSpan = document.getElementById('bmiValue');
const bmiCategoryP = document.getElementById('bmiCategory');

// BMI calculation function
function calculateBMI() {
  const weight = parseFloat(weightInput.value);
  const heightCm = parseFloat(heightInput.value);

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    alert("Please enter valid weight and height!");
    return;
  }

  // Convert height from cm to meters
  const heightM = heightCm / 100;

  // BMI formula
  const bmi = weight / (heightM * heightM);
  const bmiRounded = bmi.toFixed(2);

  // Determine BMI category
  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 24.9) {
    category = 'Normal weight';
  } else if (bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  // Display results
  bmiValueSpan.textContent = bmiRounded;
  bmiCategoryP.textContent = category;
  resultDiv.classList.remove('hidden');
}

// Reset function
function resetBMI() {
  weightInput.value = '';
  heightInput.value = '';
  resultDiv.classList.add('hidden');
}

// Event listeners
calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetBMI);