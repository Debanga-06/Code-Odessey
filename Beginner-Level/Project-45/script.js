const display = document.getElementById('display');

// Append numbers
function appendNumber(number) {
  if (display.value === "0" && number !== ".") {
    display.value = number;
  } else {
    display.value += number;
  }
}

// Append operators
function appendOperator(operator) {
  if (display.value === "") return;
  const lastChar = display.value.slice(-1);
  if ("+-*/".includes(lastChar)) {
    display.value = display.value.slice(0, -1) + operator;
  } else {
    display.value += operator;
  }
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    alert("Invalid expression");
    display.value = "";
  }
}