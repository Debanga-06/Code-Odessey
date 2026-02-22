const billInput = document.getElementById('bill');
const tipInput = document.getElementById('tip');
const peopleInput = document.getElementById('people');
const tipAmountSpan = document.getElementById('tip-amount');
const totalPerPersonSpan = document.getElementById('total-per-person');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');

calculateBtn.addEventListener('click', calculateTip);
resetBtn.addEventListener('click', resetFields);

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const tipPercent = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  if (isNaN(bill) || isNaN(tipPercent) || isNaN(people) || bill <= 0 || tipPercent < 0 || people <= 0) {
    alert("Please enter valid values!");
    return;
  }

  const tipAmount = (bill * tipPercent / 100).toFixed(2);
  const totalPerPerson = ((bill + parseFloat(tipAmount)) / people).toFixed(2);

  tipAmountSpan.textContent = tipAmount;
  totalPerPersonSpan.textContent = totalPerPerson;
}

function resetFields() {
  billInput.value = '';
  tipInput.value = '';
  peopleInput.value = 1;
  tipAmountSpan.textContent = '0.00';
  totalPerPersonSpan.textContent = '0.00';
}