const starsLayer = document.getElementById('starsLayer');
const sceneTabs = document.querySelectorAll('.scene-tab');
const scenes = document.querySelectorAll('.scene');

const STAR_COUNT = 120;

function generateStars() {
  starsLayer.innerHTML = '';

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 4;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    starsLayer.appendChild(star);
  }
}

function switchScene(sceneName, tabEl) {
  scenes.forEach(scene => {
    scene.classList.toggle('active', scene.id === `${sceneName}Scene`);
  });

  sceneTabs.forEach(tab => tab.classList.remove('active'));
  tabEl.classList.add('active');
}

sceneTabs.forEach(tab => {
  tab.addEventListener('click', () => switchScene(tab.dataset.scene, tab));
});

generateStars();