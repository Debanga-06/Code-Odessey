const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const confirmBtn = document.getElementById('confirmBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');

function openModal() {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
confirmBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeModal();
  }
});

modal.addEventListener('click', (event) => {
  event.stopPropagation();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && overlay.classList.contains('active')) {
    closeModal();
  }
});
