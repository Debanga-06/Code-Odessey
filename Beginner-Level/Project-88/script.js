const miniProgressFill = document.getElementById('miniProgressFill');
const progressPercent = document.getElementById('progressPercent');

const REVEAL_THRESHOLD = 0.15;

function initRevealObserver() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay) || 0;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: REVEAL_THRESHOLD,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(element => observer.observe(element));
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
  const clamped = Math.min(Math.max(percentage, 0), 100);

  miniProgressFill.style.width = `${clamped}%`;
  progressPercent.textContent = `${Math.round(clamped)}%`;
}

window.addEventListener('scroll', updateScrollProgress);

initRevealObserver();
updateScrollProgress();