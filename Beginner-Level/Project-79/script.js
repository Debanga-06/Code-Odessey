const nameInput = document.getElementById('nameInput');
const roleInput = document.getElementById('roleInput');
const bioInput = document.getElementById('bioInput');
const charCount = document.getElementById('charCount');
const colorRow = document.getElementById('colorRow');
const githubInput = document.getElementById('githubInput');
const twitterInput = document.getElementById('twitterInput');
const linkedinInput = document.getElementById('linkedinInput');
const downloadBtn = document.getElementById('downloadBtn');
const copyMsg = document.getElementById('copyMsg');

const cardBanner = document.getElementById('cardBanner');
const avatar = document.getElementById('avatar');
const cardName = document.getElementById('cardName');
const cardRole = document.getElementById('cardRole');
const cardBio = document.getElementById('cardBio');
const cardSocials = document.getElementById('cardSocials');

const MAX_BIO_LENGTH = 120;

const ACCENT_COLORS = ['#2be0d0', '#ff2bd6', '#4cc9f0', '#ffcb47', '#57c785', '#e63946'];
let selectedColor = ACCENT_COLORS[0];

function buildColorSwatches() {
  colorRow.innerHTML = '';

  ACCENT_COLORS.forEach(color => {
    const swatch = document.createElement('div');
    swatch.classList.add('color-swatch');
    if (color === selectedColor) swatch.classList.add('active');
    swatch.style.background = color;

    swatch.addEventListener('click', () => {
      selectedColor = color;
      buildColorSwatches();
      updatePreview();
    });

    colorRow.appendChild(swatch);
  });
}

function getInitials(fullName) {
  const words = fullName.trim().split(/\s+/).filter(word => word.length > 0);

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function updateCharCount() {
  const length = bioInput.value.length;
  charCount.textContent = `${length} / ${MAX_BIO_LENGTH}`;
}

function buildSocialChips() {
  cardSocials.innerHTML = '';

  const socials = [
    { label: 'GitHub', value: githubInput.value.trim() },
    { label: 'Twitter', value: twitterInput.value.trim() },
    { label: 'LinkedIn', value: linkedinInput.value.trim() }
  ].filter(social => social.value.length > 0);

  if (socials.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.classList.add('no-socials');
    emptyMsg.textContent = 'No social links added';
    cardSocials.appendChild(emptyMsg);
    return;
  }

  socials.forEach(social => {
    const chip = document.createElement('span');
    chip.classList.add('social-chip');
    chip.textContent = social.label;
    cardSocials.appendChild(chip);
  });
}

function updatePreview() {
  const name = nameInput.value.trim() || 'Your Name';
  const role = roleInput.value.trim() || 'Your Role';
  const bio = bioInput.value.trim() || 'A short bio about yourself goes here.';

  cardName.textContent = name;
  cardRole.textContent = role;
  cardBio.textContent = bio;
  avatar.textContent = getInitials(name);

  cardBanner.style.background = selectedColor;
  avatar.style.color = selectedColor;
  cardRole.style.color = selectedColor;

  updateCharCount();
  buildSocialChips();
}

function buildCardSummary() {
  const name = nameInput.value.trim() || 'Your Name';
  const role = roleInput.value.trim() || 'Your Role';
  const bio = bioInput.value.trim() || 'No bio provided';

  const socials = [
    githubInput.value.trim() ? `GitHub: ${githubInput.value.trim()}` : null,
    twitterInput.value.trim() ? `Twitter: ${twitterInput.value.trim()}` : null,
    linkedinInput.value.trim() ? `LinkedIn: ${linkedinInput.value.trim()}` : null
  ].filter(Boolean).join('\n');

  return `${name}\n${role}\n\n${bio}\n\n${socials || 'No social links'}`;
}

function copyCardSummary() {
  const summary = buildCardSummary();

  navigator.clipboard.writeText(summary)
    .then(() => {
      copyMsg.textContent = 'Copied to clipboard!';
      setTimeout(() => { copyMsg.textContent = ''; }, 2000);
    })
    .catch(() => {
      copyMsg.textContent = 'Copy failed. Try selecting manually.';
    });
}

[nameInput, roleInput, bioInput, githubInput, twitterInput, linkedinInput].forEach(input => {
  input.addEventListener('input', updatePreview);
});

downloadBtn.addEventListener('click', copyCardSummary);

buildColorSwatches();
updatePreview();