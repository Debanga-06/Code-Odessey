function updateClock() {
  const now = new Date(); // Current date & time

  let hours = now.getHours(); // 0 - 23
  let minutes = now.getMinutes(); // 0 - 59
  let seconds = now.getSeconds(); // 0 - 59
  let ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24hr to 12hr format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  // Add leading zero
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

  document.getElementById('clock').textContent = timeString;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initialize immediately
updateClock();
