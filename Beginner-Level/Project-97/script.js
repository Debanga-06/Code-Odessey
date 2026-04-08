/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) *.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; });
});

/* ── NAV SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));

/* ── MOBILE MENU ── */
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target) {
  let start = 0;
  const dur = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const p = Math.min((timestamp - start) / dur, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, +e.target.dataset.count);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── REVEAL ON SCROLL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── PROJECTS DATA & FILTER ── */
const projects = [
  { title:'Spotify Clone', desc:'Full static clone of Spotify\'s web player with interactive player controls, card grids, and sidebar.', emoji:'🎵', bg:'linear-gradient(135deg,#1db954,#006d2c)', tags:['HTML','CSS','JavaScript'], cat:'javascript', featured:true },
  { title:'Portfolio v1', desc:'My first personal portfolio — clean layout, about section, skills, and contact form.', emoji:'🌐', bg:'linear-gradient(135deg,#667eea,#764ba2)', tags:['HTML','CSS'], cat:'layout' },
  { title:'Dark Mode Toggle', desc:'Theme switching system with CSS variables and localStorage persistence across sessions.', emoji:'🌙', bg:'linear-gradient(135deg,#1e3264,#0d0d0d)', tags:['JavaScript','CSS Vars'], cat:'javascript' },
  { title:'CSS Loaders', desc:'Collection of 12 pure CSS loading animations — spinners, dots, bars, progress rings.', emoji:'⏳', bg:'linear-gradient(135deg,#f093fb,#f5576c)', tags:['CSS','Animations','Keyframes'], cat:'css' },
  { title:'FAQ Accordion', desc:'Smooth accordion with animated height transitions and accessible keyboard navigation.', emoji:'❓', bg:'linear-gradient(135deg,#4481eb,#04befe)', tags:['JavaScript','CSS','DOM'], cat:'javascript' },
  { title:'Image Gallery', desc:'Masonry-style grid gallery with lightbox overlay, keyboard navigation, and zoom effect.', emoji:'🖼️', bg:'linear-gradient(135deg,#fa709a,#fee140)', tags:['CSS Grid','JavaScript'], cat:'layout', featured:true },
  { title:'Hero Sections x5', desc:'Five distinct hero section designs — parallax, split-layout, text-reveal, gradient mesh, and typewriter.', emoji:'🦸', bg:'linear-gradient(135deg,#a18cd1,#fbc2eb)', tags:['HTML','CSS','Animations'], cat:'css' },
  { title:'Pricing Table', desc:'Three-tier responsive pricing table with highlighted popular plan and hover effects.', emoji:'💰', bg:'linear-gradient(135deg,#0fd850,#f9f047)', tags:['HTML','CSS'], cat:'layout' },
  { title:'Gradient Generator', desc:'Real-time gradient builder — pick colors, angle, type. Copy CSS to clipboard instantly.', emoji:'🎨', bg:'linear-gradient(135deg,#f7971e,#ffd200)', tags:['JavaScript','DOM','Tool'], cat:'javascript', featured:true },
];

let activeFilter = 'all';

function buildProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="project-card reveal">
      <div class="project-thumb" style="background:${p.bg}">${p.emoji}</div>
      <div class="project-body">
        <div class="project-tags">
          ${p.featured ? '<span class="project-tag featured">Featured</span>' : ''}
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-footer">
          <div class="project-links">
            <a class="proj-link primary" href="https://github.com/Debanga-06/Code-Odessey" target="_blank">↗ Live</a>
            <a class="proj-link" href="https://github.com/Debanga-06/Code-Odessey" target="_blank">⌥ Code</a>
          </div>
        </div>
      </div>
    </div>`).join('');
  // Re-observe newly rendered cards
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    revealObserver.observe(el);
  });
}

document.getElementById('filterBtns').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  buildProjects(activeFilter);
});

buildProjects('all');

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 1200);
}