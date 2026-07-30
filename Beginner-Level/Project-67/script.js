const progressBar = document.getElementById('progressBar');
const percentBadge = document.getElementById('percentBadge');
const backToTop = document.getElementById('backToTop');

const BACK_TO_TOP_THRESHOLD = 400;

function calculateScrollPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = document.documentElement.clientHeight;
  const scrollableDistance = documentHeight - viewportHeight;

  if (scrollableDistance <= 0) {
    return 0;
  }

  const percentage = (scrollTop / scrollableDistance) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}

function updateProgress() {
  const percentage = calculateScrollPercentage();
  const rounded = Math.round(percentage);

  progressBar.style.width = `${percentage}%`;
  percentBadge.textContent = `${rounded}%`;

  backToTop.classList.toggle('hidden', window.scrollY < BACK_TO_TOP_THRESHOLD);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
backToTop.addEventListener('click', scrollToTop);

updateProgress();