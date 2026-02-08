let hours = 0,
    minutes = 0,
    seconds = 0;
let interval = null;
let running = false;

// Array to store last 5 records (persistent)
let records = [];

function updateDisplay() {
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("display").textContent = `${h}:${m}:${s}`;
}

// Start stopwatch
function startStopwatch() {
  if (!running) {
    running = true;
    interval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
  }
}

// Stop stopwatch
function stopStopwatch() {
  running = false;
  clearInterval(interval);
}

// Reset stopwatch **without clearing records**
function resetStopwatch() {
  stopStopwatch();
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay();
  // Records remain
}

// Record current time with FIFO limit of 5
function recordTime() {
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;
  const timeString = `${h}:${m}:${s}`;

  // Add to array
  records.push(timeString);

  // Remove oldest if more than 5
  if (records.length > 5) {
    records.shift();
  }

  updateRecordsDisplay();
}

// Clear all records
function clearAllRecords() {
  records = [];
  updateRecordsDisplay();
}

// Update HTML list of records
function updateRecordsDisplay() {
  const ul = document.getElementById("records");
  ul.innerHTML = "";
  records.forEach((time) => {
    const li = document.createElement("li");
    li.textContent = time;
    ul.appendChild(li);
  });
}

// Button event listeners
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("record").addEventListener("click", recordTime);
document.getElementById("clear-records").addEventListener("click", clearAllRecords);

// Initialize display
updateDisplay();
