const trackZone = document.getElementById('trackZone');
const dot = document.getElementById('dot');
const zoneHint = document.getElementById('zoneHint');
const xValue = document.getElementById('xValue');
const yValue = document.getElementById('yValue');
const distanceValue = document.getElementById('distanceValue');
const speedValue = document.getElementById('speedValue');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');

let totalDistance = 0;
let lastX = null;
let lastY = null;
let lastTimestamp = null;

function handleMouseMove(event) {
  const rect = trackZone.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  const now = performance.now();

  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  xValue.textContent = x;
  yValue.textContent = y;

  if (lastX !== null && lastY !== null) {
    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const segmentDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    totalDistance += segmentDistance;
    distanceValue.textContent = `${Math.round(totalDistance)}px`;

    const deltaTimeSeconds = (now - lastTimestamp) / 1000;
    if (deltaTimeSeconds > 0) {
      const speed = segmentDistance / deltaTimeSeconds;
      speedValue.textContent = `${Math.round(speed)} px/s`;
    }
  }

  lastX = x;
  lastY = y;
  lastTimestamp = now;
}

function handleMouseEnter() {
  dot.style.display = 'block';
  zoneHint.style.display = 'none';
  statusText.textContent = 'Tracking active';
}

function handleMouseLeave() {
  dot.style.display = 'none';
  zoneHint.style.display = 'block';
  statusText.textContent = 'Cursor outside zone';
  lastX = null;
  lastY = null;
  lastTimestamp = null;
  speedValue.textContent = '0 px/s';
}

function resetDistance() {
  totalDistance = 0;
  distanceValue.textContent = '0px';
}

trackZone.addEventListener('mousemove', handleMouseMove);
trackZone.addEventListener('mouseenter', handleMouseEnter);
trackZone.addEventListener('mouseleave', handleMouseLeave);
resetBtn.addEventListener('click', resetDistance);