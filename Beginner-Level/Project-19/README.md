# Project-19: Hero Section Designs

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A comprehensive showcase of **10 different hero section design patterns** using HTML, CSS, and vanilla JavaScript. Perfect for learning modern web design techniques, animations, and responsive layouts.

---

## 📋 Project Overview

**Hero sections** are the first major visual element visitors see on a webpage. This project demonstrates various design approaches, from simple text-based layouts to complex interactive designs with background images, videos, and animations.

**Learning Outcomes:**
- CSS Flexbox and Grid layouts for hero sections
- CSS animations and transitions
- Background image and video integration
- Responsive design for mobile and desktop
- JavaScript event handling and DOM manipulation
- Scroll effects and parallax animation
- Intersection Observer API for scroll animations

---

## 🎯 Demo Link

 **[View the live demo here](https://hero-section-designs-coral.vercel.app/)**

---

## 🎨 Hero Section Designs (10 Variations)

### 1. **Simple Gradient Hero**
- **Style:** Minimalist design with purple gradient background
- **Features:**
  - Centered text with large heading
  - Primary CTA button
  - Smooth slideInUp animation
- **Use Case:** Startup landing pages, service portfolios
- **Customization:** Edit gradient colors in `.hero-simple` class

```css
/* Main background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Adjust colors: */
/* Light: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); */
/* Dark: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); */
```

---

### 2. **Background Image Hero**
- **Style:** Full-width background image with dark overlay
- **Features:**
  - High-quality background image (Unsplash)
  - Semi-transparent dark overlay for text readability
  - Primary and secondary CTA buttons
  - Parallax scrolling effect
- **Use Case:** Photography portfolios, travel websites, real estate
- **Customization:** Replace image URL in background-image property

```css
/* Change background image: */
background-image: 
  linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
  url('your-image-url.jpg');
background-position: center;
background-size: cover;
background-attachment: fixed; /* Parallax effect */
```

---

### 3. **Gradient Overlay Hero**
- **Style:** Multi-color gradient overlay with smooth transitions
- **Features:**
  - Animated gradient overlay
  - Multiple color transitions
  - Centered heading and description
  - Smooth color animation
- **Use Case:** Creative agencies, art portfolios, modern SaaS
- **Customization:** Modify gradient colors and animation timing

```css
/* 10-second gradient animation */
animation: gradientShift 10s ease infinite;

@keyframes gradientShift {
  0% { background: linear-gradient(45deg, #667eea, #764ba2); }
  50% { background: linear-gradient(45deg, #764ba2, #f093fb); }
  100% { background: linear-gradient(45deg, #667eea, #764ba2); }
}
```

---

### 4. **Centered Content Hero**
- **Style:** Centered layout with badge and multiple CTAs
- **Features:**
  - Category badge above heading
  - Large centered heading
  - Descriptive paragraph
  - Primary and secondary buttons
  - Accent line decoration
- **Use Case:** Product launches, event promotions, blog posts
- **Customization:** Update badge text, heading, and button labels

```html
<!-- Badge styling -->
<span class="badge">New Release</span>
<!-- Primary button -->
<button class="btn btn-primary">Get Started</button>
<!-- Secondary button -->
<button class="btn btn-secondary">Learn More</button>
```

---

### 5. **Split Layout Hero**
- **Style:** Two-column layout (text + image)
- **Features:**
  - Responsive grid (1 column on mobile, 2 on desktop)
  - Left side: heading, description, CTA
  - Right side: hero image with border radius
  - Individual animations for each side
- **Use Case:** Product pages, feature highlights, about sections
- **Customization:** Adjust grid columns, image, and text content

```css
/* Desktop: 2 columns | Mobile: 1 column */
grid-template-columns: 1fr 1fr; /* Desktop */

@media (max-width: 768px) {
  grid-template-columns: 1fr; /* Mobile */
}
```

---

### 6. **Dark Minimalist Hero**
- **Style:** Clean dark background with gold accent
- **Features:**
  - Dark background (#1a1a2e)
  - Gold (#ffd700) accent line above heading
  - Minimalist typography
  - Simple centered layout
  - Elegant spacing
- **Use Case:** Luxury brands, corporate websites, professional portfolios
- **Customization:** Change accent color, background color, or heading size

```css
/* Gold accent line */
::before {
  content: '';
  width: 80px;
  height: 4px;
  background: #ffd700;
  margin: 0 auto 20px;
}
```

---

### 7. **Hero with Statistics**
- **Style:** Hero with animated counter statistics
- **Features:**
  - Large heading and description
  - 3-column statistics grid
  - Animated number counters
  - Responsive design (1 column on mobile)
  - Smooth transitions
- **Use Case:** Company portfolios, case studies, metrics pages
- **Customization:** Update stat numbers, labels, and animation speed

```javascript
/* Animated counters */
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 30);
  });
}
```

---

### 8. **Angled/Skewed Hero**
- **Style:** Hero with angled bottom using SVG
- **Features:**
  - SVG wave/angle at bottom
  - Gradient background
  - Next section visible underneath angled section
  - Modern design aesthetic
  - Semantic HTML structure
- **Use Case:** Modern SaaS platforms, tech startups, design-forward sites
- **Customization:** Modify SVG viewBox, colors, or angles

```svg
<!-- Angled bottom section -->
<svg viewBox="0 0 1200 120" preserveAspectRatio="none">
  <polygon points="0,50 0,120 1200,120 1200,0" fill="#f5f5f5"/>
</svg>
```

---

### 9. **Video Background Hero**
- **Style:** Full-width HTML5 video background with overlay
- **Features:**
  - Autoplay video background (muted)
  - Semi-transparent overlay for readability
  - Fallback background color
  - Modern interactive design
  - Large heading and CTA
- **Use Case:** Creative portfolios, motion design showcases, modern brands
- **Customization:** Replace video source, adjust overlay opacity

```html
<!-- Video background -->
<video autoplay muted loop>
  <source src="your-video.mp4" type="video/mp4">
</video>

<!-- CSS: Controls video sizing -->
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

### 10. **Minimal Hero with Scroll Indicator**
- **Style:** Ultra-minimal design with animated scroll hint
- **Features:**
  - Simple centered heading
  - Scrollable content indication
  - Animated bounce effect on scroll hint
  - Disappears when scrolling begins
  - Clean and modern
- **Use Case:** Single-page portfolios, landing pages, portfolio sites
- **Customization:** Adjust heading size, scroll hint icon, colors

```css
/* Bounce animation for scroll hint */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

.scroll-hint {
  animation: bounce 2s infinite;
}
```

---

## 🚀 Features Implemented

### Interactive Elements
- ✅ Smooth scroll navigation with active link highlighting
- ✅ Button click feedback with scale animation
- ✅ Scroll detection to hide scroll indicator
- ✅ Navbar shadow enhancement on scroll
- ✅ Ripple effect on button click (visual feedback)

### Animations
- ✅ `slideInDown` - Navigation entrance
- ✅ `slideInUp` - Content entrance (bottom)
- ✅ `slideInLeft` - Left content entrance
- ✅ `slideInRight` - Right content entrance
- ✅ `scaleIn` - Element scaling entrance
- ✅ `bounce` - Scroll hint indicator
- ✅ `pulse` - Subtle animation loop
- ✅ `gradientShift` - Color animation

### Responsive Design
- ✅ Desktop: Full features and layouts
- ✅ Tablet (768px): Adjusted spacing, single column where needed
- ✅ Mobile (480px): Optimized for small screens, stacked layouts

### Accessibility
- ✅ Semantic HTML5 (`<section>`, `<nav>`, `<h1>`, etc.)
- ✅ Proper color contrast
- ✅ Keyboard navigation support (arrow keys)
- ✅ Focus states on interactive elements
- ✅ ARIA labels where needed

---

## 📁 File Structure

```
Project-19/
├── index.html          # HTML structure with 10 hero sections
├── style.css           # Complete styling and animations
├── script.js           # JavaScript interactions and effects
└── README.md           # This file - documentation and guide
```

---

## 💻 Installation & Setup

### 1. **Extract Files**
Ensure all three files are in the same project folder:
```
Project-19/
├── index.html
├── style.css
├── script.js
```

### 2. **Open in Browser**
- Double-click `index.html` to open in default browser
- OR use a local server:
  ```bash
  # Python 3.x
  python -m http.server 8000
  
  # Python 2.x
  python -m SimpleHTTPServer 8000
  
  # Node.js (using http-server)
  npx http-server
  ```

### 3. **View Project**
Navigate to `http://localhost:8000` in your browser

---

## 🎨 Customization Guide

### Changing Colors

**Primary Theme Colors:**
```css
/* In style.css */
:root {
  --primary-color: #667eea;    /* Change purple */
  --secondary-color: #764ba2;  /* Change dark purple */
  --accent-color: #ffd700;     /* Change gold */
  --dark-bg: #1a1a2e;          /* Change dark background */
  --light-bg: #f5f5f5;         /* Change light background */
}
```

**Update specific hero:**
```css
.hero-simple {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Changing Text Content

Edit in `index.html`:
```html
<h1>Your Heading Here</h1>
<p>Your description text here</p>
```

### Changing Button Text

```html
<button class="btn btn-primary">Your Button Text</button>
```

### Changing Images

**Background image:**
```css
.hero-bg-image {
  background-image: 
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('YOUR_IMAGE_URL');
}
```

**Inline image (split layout):**
```html
<img src="YOUR_IMAGE_URL" alt="Hero image">
```

**Video background:**
```html
<video autoplay muted loop>
  <source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
</video>
```

### Adjusting Animation Speed

```css
/* Find animation property and change duration */
animation: slideInUp 0.8s ease;  /* Change 0.8s to desired duration */

/* Or in @keyframes */
@keyframes gradientShift {
  /* Default: 10s */
  animation: gradientShift 10s ease infinite;
  /* Faster: 5s, Slower: 20s */
}
```

---

## 🎓 Learning Resources

### CSS Grid & Flexbox
- Hero sections use Flexbox for centering
- Split layout uses CSS Grid for 2-column design
- Statistics section uses Grid for responsive layout

### CSS Animations
- All animations defined in `@keyframes`
- Smooth transitions for hover effects
- Duration and timing functions customizable

### JavaScript Interactions
- Smooth scroll navigation (native browser API)
- Intersection Observer for scroll detection
- Event listeners for button clicks and scrolling
- DOM manipulation for dynamic updates

### Responsive Design
- Mobile-first approach (styles then breakpoints)
- Media queries at 768px and 480px
- Flexible units (%, vh, em, rem)
- Viewport meta tag configured

---

## 🔧 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Latest versions (90+) |
| Firefox | ✅ Full | Latest versions (88+) |
| Safari | ✅ Full | Latest versions (14+) |
| Edge | ✅ Full | Latest versions (90+) |
| IE 11 | ⚠️ Partial | CSS Grid/Flexbox basic support only |

---

## 📚 CSS Classes Reference

### Hero Classes
- `.hero` - Base hero container
- `.hero-simple` - Simple gradient hero
- `.hero-bg-image` - Background image hero
- `.hero-gradient-overlay` - Gradient overlay hero
- `.hero-centered` - Centered content hero
- `.hero-split` - Split layout hero
- `.hero-dark` - Dark minimalist hero
- `.hero-with-stats` - Statistics hero
- `.hero-angled` - Angled/skewed hero
- `.hero-video` - Video background hero
- `.hero-minimal` - Minimal scroll indicator hero

### Component Classes
- `.navbar` - Navigation bar
- `.hero-content` - Content wrapper inside hero
- `.btn` - Base button
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-accent` - Accent button style
- `.split-content` - Content in split layout
- `.split-image` - Image in split layout
- `.stat-card` - Statistics card
- `.stat-number` - Animated number
- `.scroll-hint` - Scroll indicator element

---

## 🚀 Advanced Features

### Parallax Scrolling
Background image hero includes parallax effect:
```javascript
// JavaScript automatically handles background position on scroll
bgHero.style.backgroundPosition = `center ${distance * 0.5}px`;
```

### Animated Counters
Statistics automatically count up when section comes into view:
```javascript
animateStats(); // Called when hero-with-stats is visible
```

### Active Navigation Links
Navbar links highlight current section:
```javascript
// Automatically updates based on scroll position
link.classList.add('active');
```

---

## 💡 Enhancement Ideas

1. **Add More Hero Variations**
   - Carousel/slider hero
   - Hero with timeline
   - Hero with testimonial

2. **Interactive Features**
   - Form submission in CTA
   - Video modal popup
   - Navigation menu toggle

3. **Performance**
   - Image lazy loading
   - CSS minification
   - JavaScript bundling

4. **Advanced Animations**
   - Scroll-triggered animations
   - Mouse follow effects
   - Text animation variations

---

## 📋 Checklist for Using This Project

- [ ] All files extracted to same folder
- [ ] Opened in browser (desktop 1280px or responsive dev tools)
- [ ] Scroll through all 10 hero sections
- [ ] Test button clicks and hover effects
- [ ] Check responsive design at 768px and 480px
- [ ] Open browser console to see logs
- [ ] Try keyboard navigation (arrow keys)
- [ ] Test on different browsers if needed

---

## 🎯 Key Takeaways

By completing this project, you've learned:
1. **CSS Layouts** - Flexbox for centering, Grid for complex layouts
2. **Modern Animations** - Smooth transitions and keyframe animations
3. **Responsive Design** - Mobile-first with media queries
4. **JavaScript Interactivity** - Event handling and DOM manipulation
5. **Image & Video** - Background images, inline images, video backgrounds
6. **Best Practices** - Semantic HTML, accessibility, performance

---

## 📞 Support & Questions

For issues or questions:
1. Check browser console for error messages
2. Verify all files are in correct folder
3. Ensure using modern browser (Chrome 90+, Firefox 88+, Safari 14+)
4. Test in incognito/private mode to clear cache

---

## 📄 License

This project is free to use and modify for educational purposes.

---

**Happy Learning! 🎉**

*Last Updated: 2026*  
*Version: 1.0*

