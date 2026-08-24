const feedbackForm = document.getElementById('feedbackForm');
const starRating = document.getElementById('starRating');
const ratingError = document.getElementById('ratingError');
const emojiScale = document.getElementById('emojiScale');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const charCount = document.getElementById('charCount');
const messageError = document.getElementById('messageError');
const successScreen = document.getElementById('successScreen');
const newFeedbackBtn = document.getElementById('newFeedbackBtn');

const MAX_CHARS = 300;
const STAR_COUNT = 5;

const EMOJI_OPTIONS = [
  { value: 1, icon: '😠', label: 'Poor' },
  { value: 2, icon: '😕', label: 'Fair' },
  { value: 3, icon: '😐', label: 'Okay' },
  { value: 4, icon: '🙂', label: 'Good' },
  { value: 5, icon: '😍', label: 'Great' }
];

let selectedStars = 0;
let selectedEmoji = null;

function buildStars() {
  starRating.innerHTML = '';

  for (let i = 1; i <= STAR_COUNT; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.dataset.value = i;
    star.textContent = '★';

    star.addEventListener('mouseenter', () => previewStars(i));
    star.addEventListener('mouseleave', () => previewStars(selectedStars));
    star.addEventListener('click', () => {
      selectedStars = i;
      previewStars(selectedStars);
      ratingError.classList.add('hidden');
    });

    starRating.appendChild(star);
  }
}

function previewStars(count) {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.classList.toggle('filled', Number(star.dataset.value) <= count);
  });
}

function buildEmojiScale() {
  emojiScale.innerHTML = '';

  EMOJI_OPTIONS.forEach(option => {
    const item = document.createElement('div');
    item.classList.add('emoji-option');
    item.dataset.value = option.value;

    item.innerHTML = `
      ${option.icon}
      <span class="emoji-label">${option.label}</span>
    `;

    item.addEventListener('click', () => selectEmoji(option.value));
    emojiScale.appendChild(item);
  });
}

function selectEmoji(value) {
  selectedEmoji = value;

  const options = document.querySelectorAll('.emoji-option');
  options.forEach(option => {
    option.classList.toggle('selected', Number(option.dataset.value) === value);
  });
}

function updateCharCount() {
  const length = messageInput.value.length;
  charCount.textContent = `${length} / ${MAX_CHARS}`;

  if (length > 0) {
    messageError.classList.add('hidden');
  }
}

function validateForm() {
  let isValid = true;

  if (selectedStars === 0) {
    ratingError.classList.remove('hidden');
    isValid = false;
  }

  if (messageInput.value.trim().length === 0) {
    messageError.classList.remove('hidden');
    isValid = false;
  }

  return isValid;
}

function handleSubmit(event) {
  event.preventDefault();

  if (!validateForm()) return;

  feedbackForm.classList.add('hidden');
  successScreen.classList.remove('hidden');
}

function resetForm() {
  feedbackForm.reset();
  selectedStars = 0;
  selectedEmoji = null;
  previewStars(0);

  document.querySelectorAll('.emoji-option').forEach(option => {
    option.classList.remove('selected');
  });

  charCount.textContent = `0 / ${MAX_CHARS}`;
  ratingError.classList.add('hidden');
  messageError.classList.add('hidden');

  successScreen.classList.add('hidden');
  feedbackForm.classList.remove('hidden');
}

messageInput.addEventListener('input', updateCharCount);
feedbackForm.addEventListener('submit', handleSubmit);
newFeedbackBtn.addEventListener('click', resetForm);

buildStars();
buildEmojiScale();