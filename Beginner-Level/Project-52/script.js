const track = document.getElementById('slideTrack');
const images = document.querySelectorAll('.slide-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');
const thumbsContainer = document.getElementById('thumbs');

const AUTOPLAY_DELAY = 4000;

let current = 0;
let autoplayId = null;

function buildThumbs() {
  images.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.classList.add('thumb');
    if (index === 0) thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    thumbsContainer.appendChild(thumb);
  });
}

function updateSlide() {
  images.forEach((img, index) => {
    img.classList.toggle('active', index === current);
  });

  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === current);
  });

  counter.textContent = `${current + 1} / ${images.length}`;
}

function goToSlide(index) {
  current = index;
  updateSlide();
}

function nextSlide() {
  current = (current + 1) % images.length;
  updateSlide();
}

function prevSlide() {
  current = (current - 1 + images.length) % images.length;
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

buildThumbs();
updateSlide();
startAutoplay();
