let countdownInterval;
let remainingTime;

function startTimer() {
  const minutesInput = document.getElementById("minutes").value;
  if (!minutesInput || minutesInput <= 0) {
    alert("Please enter a valid number of minutes!");
    return;
  }

  remainingTime = minutesInput * 60; // convert minutes to seconds
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    let hours = Math.floor(remainingTime / 3600);
    let minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = remainingTime % 60;

    document.getElementById("countdown").textContent =
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);

      // Play default beep sound using Web Audio API
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      oscillator.type = "sine"; // sound type: sine, square, triangle, sawtooth
      oscillator.frequency.setValueAtTime(1000, context.currentTime); // frequency in Hz
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1); // play for 1 second

      alert("⏰ Time's up!");
    }

    remainingTime--;
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  document.getElementById("countdown").textContent = "00:00:00";
  document.getElementById("minutes").value = "";
}