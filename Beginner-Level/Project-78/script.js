const daysValue = document.getElementById('daysValue');
const hoursValue = document.getElementById('hoursValue');
const minutesValue = document.getElementById('minutesValue');
const secondsValue = document.getElementById('secondsValue');
const nameInput = document.getElementById('nameInput');
const attendButtons = document.querySelectorAll('.attend-btn');
const guestRow = document.getElementById('guestRow');
const guestCount = document.getElementById('guestCount');
const formError = document.getElementById('formError');
const rsvpForm = document.getElementById('rsvpForm');
const inviteCard = document.getElementById('inviteCard');
const confirmationScreen = document.getElementById('confirmationScreen');
const confirmIcon = document.getElementById('confirmIcon');
const confirmTitle = document.getElementById('confirmTitle');
const confirmText = document.getElementById('confirmText');
const editRsvpBtn = document.getElementById('editRsvpBtn');

const EVENT_DATE = new Date('2026-09-12T18:00:00');
let selectedAttendance = null;
let countdownIntervalId = null;

function pad(number) {
  return number.toString().padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    daysValue.textContent = '00';
    hoursValue.textContent = '00';
    minutesValue.textContent = '00';
    secondsValue.textContent = '00';
    clearInterval(countdownIntervalId);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysValue.textContent = pad(days);
  hoursValue.textContent = pad(hours);
  minutesValue.textContent = pad(minutes);
  secondsValue.textContent = pad(seconds);
}

function selectAttendance(value, button) {
  selectedAttendance = value;

  attendButtons.forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');

  guestRow.classList.toggle('hidden', value !== 'yes');
  formError.classList.add('hidden');
}

function validateRsvp() {
  if (nameInput.value.trim().length === 0 || selectedAttendance === null) {
    formError.classList.remove('hidden');
    return false;
  }
  return true;
}

function handleSubmit(event) {
  event.preventDefault();

  if (!validateRsvp()) return;

  showConfirmation();
}

function showConfirmation() {
  inviteCard.classList.add('hidden');
  confirmationScreen.classList.remove('hidden');

  if (selectedAttendance === 'yes') {
    confirmIcon.textContent = '✓';
    confirmTitle.textContent = "You're on the list!";
    confirmText.textContent = `We can't wait to see you and your ${guestCount.value == 1 ? 'company' : `${guestCount.value} guests`} there.`;
  } else {
    confirmIcon.textContent = '✕';
    confirmTitle.textContent = "We'll miss you";
    confirmText.textContent = "Thanks for letting us know. Hope to see you next time!";
  }
}

function editRsvp() {
  confirmationScreen.classList.add('hidden');
  inviteCard.classList.remove('hidden');
}

attendButtons.forEach(button => {
  button.addEventListener('click', () => selectAttendance(button.dataset.value, button));
});

rsvpForm.addEventListener('submit', handleSubmit);
editRsvpBtn.addEventListener('click', editRsvp);

updateCountdown();
countdownIntervalId = setInterval(updateCountdown, 1000);