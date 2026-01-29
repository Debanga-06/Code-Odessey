// ========== SMOOTH SCROLL NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== BUTTON INTERACTIONS ==========
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const text = this.textContent;
    
    // Visual feedback
    this.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);

    console.log('Button clicked:', text);
  });

  // Ripple effect on click
  button.addEventListener('mousedown', function(e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = ripple.style.height = '10px';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ========== SCROLL INDICATOR ==========
window.addEventListener('scroll', function() {
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint && window.scrollY > 200) {
    scrollHint.style.opacity = '0';
    scrollHint.style.pointerEvents = 'none';
  } else if (scrollHint) {
    scrollHint.style.opacity = '1';
    scrollHint.style.pointerEvents = 'auto';
  }
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// ========== HERO INTERSECTION OBSERVER ==========
const heroes = document.querySelectorAll('.hero');
const heroObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

heroes.forEach(hero => {
  heroObserver.observe(hero);
});

// ========== ACTIVE NAVIGATION LINK ==========
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.hero');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ========== STATS COUNTER ANIMATION ==========
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const text = stat.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + text;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + text;
      }
    }, 30);
  });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('.hero-with-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !statsSection.classList.contains('stats-animated')) {
      statsSection.classList.add('stats-animated');
      animateStats();
    }
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', function() {
  const bgHero = document.querySelector('.hero-bg-image');
  if (bgHero) {
    const scrollPosition = window.scrollY;
    const heroOffset = bgHero.offsetTop;
    const distance = scrollPosition - heroOffset;
    
    if (distance > -window.innerHeight && distance < window.innerHeight) {
      bgHero.style.backgroundPosition = `center ${distance * 0.5}px`;
    }
  }
});

// ========== HERO COUNTER ==========
console.log('Hero Section Gallery Loaded');
console.log('Total Hero Sections:', document.querySelectorAll('.hero').length);

// Count hero types
const heroTypes = {
  simple: document.querySelectorAll('.hero-simple').length,
  bgImage: document.querySelectorAll('.hero-bg-image').length,
  gradientOverlay: document.querySelectorAll('.hero-gradient-overlay').length,
  centered: document.querySelectorAll('.hero-centered').length,
  split: document.querySelectorAll('.hero-split').length,
  dark: document.querySelectorAll('.hero-dark').length,
  stats: document.querySelectorAll('.hero-with-stats').length,
  angled: document.querySelectorAll('.hero-angled').length,
  video: document.querySelectorAll('.hero-video').length,
  minimal: document.querySelectorAll('.hero-minimal').length
};

console.log('Hero Types:', heroTypes);

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown') {
    window.scrollBy(0, 200);
  }
  if (e.key === 'ArrowUp') {
    window.scrollBy(0, -200);
  }
});
