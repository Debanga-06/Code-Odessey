const track = document.getElementById('track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

const AUTOPLAY_DELAY = 3000;

let current = 0;
let autoplayId = null;

function buildDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateSlide() {
  track.style.transform = `translateX(-${current * 100}%)`;

  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[current].classList.add('active');
}

function goToSlide(index) {
  current = index;
  updateSlide();
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlide();
}

function startAutoplay() {
  autoplayId = setInterval(nextSlide, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  clearInterval(autoplayId);
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoplay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoplay();
});

buildDots();
startAutoplay();
