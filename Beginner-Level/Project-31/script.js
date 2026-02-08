// State
let count = 0;

// DOM elements
const counter = document.getElementById("counter");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

// Initial display
counter.textContent = count;

// Event Listeners
incrementBtn.addEventListener("click", () => {
  count++;
  counter.textContent = count;
});

decrementBtn.addEventListener("click", () => {
  count--;
  counter.textContent = count;
});

resetBtn.addEventListener("click", () => {
  count = 0;
  counter.textContent = count;
});
