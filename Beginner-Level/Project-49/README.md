# Accordion Component - Toggle Functionality 📂

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Accordion Variants](#accordion-variants)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A fully-featured **Accordion Component** showcasing multiple design variations and interaction patterns. Includes basic accordions, styled variants with plus/minus icons, numbered accordions, and FAQ-style layouts. Built with semantic HTML, smooth CSS transitions, and vanilla JavaScript for maximum compatibility and performance.

**Live Demo:** [View Project](#)

## ✨ Features

### 4 Accordion Variants
- 📋 **Basic Accordion** - Clean, minimal design with chevron icons
- ➕ **Plus/Minus Icons** - Styled accordion with + and − symbols
- 🔢 **Numbered Accordion** - Process steps with numbered badges
- 💬 **FAQ Style** - Question-and-answer format with hover effects

### Interactive Features
- 🎭 **Smooth Animations** - CSS transitions for open/close
- 🖱️ **Click to Toggle** - Expand/collapse content on click
- 🔄 **Multiple Open** - Allow multiple panels open simultaneously
- ⌨️ **Keyboard Accessible** - Full keyboard navigation support
- 📱 **Touch Friendly** - Optimized for mobile devices
- 💫 **Fade-In Effect** - Content fades in when opening

### Technical Features
- ♿ **ARIA Attributes** - Proper accessibility markup
- 🎨 **Custom Properties** - Easy theming with CSS variables
- 📦 **Zero Dependencies** - Pure vanilla JavaScript
- 🚀 **Performance Optimized** - Efficient DOM manipulation
- 📱 **Fully Responsive** - Works on all screen sizes

## 🎓 Learning Outcomes

1. **Toggle Functionality** - Building expand/collapse interactions
2. **Dynamic Content** - Showing/hiding content programmatically
3. **CSS Transitions** - Smooth animations with max-height
4. **Event Handling** - Click events and state management
5. **DOM Manipulation** - Adding/removing CSS classes
6. **ARIA Attributes** - Implementing accessibility features
7. **Component Patterns** - Reusable UI component structure
8. **State Management** - Tracking open/closed states
9. **Icon Transitions** - Rotating icons on state change
10. **Event Delegation** - Efficient event handling

## 🎨 Accordion Variants

### 1. Basic Accordion
**Use Case:** Simple FAQ, documentation sections

**Features:**
- Clean, minimal design
- Chevron down (▼) icons
- Border-bottom separators
- Subtle hover effects

### 2. Styled with Plus/Minus
**Use Case:** Feature lists, product specifications

**Features:**
- + and − icon indicators
- Rounded card design
- Spacing between items
- More prominent visual separation

### 3. Numbered Accordion
**Use Case:** Step-by-step processes, ordered lists

**Features:**
- Numbered badges (01, 02, 03...)
- Grid layout with three columns
- Clear visual hierarchy
- Perfect for tutorials or workflows

### 4. FAQ Style
**Use Case:** Help centers, support pages

**Features:**
- Individual card styling
- Hover effects with border glow
- Increased padding for readability
- Question-answer format

## 📁 Project Structure

```
Accordion-Component/
│
├── index.html          # Complete accordion demos
└── README.md           # This documentation
```

## 🚀 Installation

### Method 1: Direct Use

```bash
# Clone repository
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/Accordion-Component

# Open in browser
open index.html
```

### Method 2: Copy Code

1. Copy the HTML structure from the code example
2. Copy the CSS styles (or customize them)
3. Copy the JavaScript initialization code
4. Paste into your project

## 💻 Usage Guide

### Basic Implementation

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header">
      <span>Your Question Here</span>
      <span class="accordion-icon">▼</span>
    </button>
    <div class="accordion-content">
      <div class="accordion-body">
        Your answer content goes here.
      </div>
    </div>
  </div>
</div>

<script>
  // Initialize
  const headers = document.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      header.classList.toggle('active');
      content.classList.toggle('active');
    });
  });
</script>
```

### Adding New Items

Simply duplicate the `.accordion-item` structure:

```html
<div class="accordion-item">
  <button class="accordion-header">
    <span>New Question</span>
    <span class="accordion-icon">▼</span>
  </button>
  <div class="accordion-content">
    <div class="accordion-body">
      New answer content.
    </div>
  </div>
</div>
```

## 🎨 Customization

### Change Colors

```css
:root {
  --bg-primary: #0f1419;      /* Page background */
  --bg-secondary: #1a1f28;    /* Accordion background */
  --bg-card: #242b36;         /* Card background */
  --border: #2f3845;          /* Border color */
  --accent: #7c6ef5;          /* Accent color */
  --text-primary: #f8fafc;    /* Main text */
  --text-secondary: #94a3b8;  /* Secondary text */
}
```

### Change Icons

Replace the chevron with any character or emoji:

```html
<!-- Arrow -->
<span class="accordion-icon">→</span>

<!-- Plus/Minus -->
<span class="accordion-icon">+</span>

<!-- Emoji -->
<span class="accordion-icon">🔽</span>
```

### Adjust Animation Speed

```css
.accordion-header,
.accordion-icon,
.accordion-content {
  transition: all 0.5s ease; /* Change from 0.3s */
}
```

### Make Only One Open at a Time

```javascript
headers.forEach(header => {
  header.addEventListener('click', () => {
    // Close all other accordions
    headers.forEach(h => {
      if (h !== header) {
        h.classList.remove('active');
        h.nextElementSibling.classList.remove('active');
      }
    });
    
    // Toggle clicked accordion
    header.classList.toggle('active');
    header.nextElementSibling.classList.toggle('active');
  });
});
```

## ♿ Accessibility

### ARIA Attributes

```html
<button 
  class="accordion-header" 
  aria-expanded="false" 
  aria-controls="panel-1"
>
  Question
</button>
<div 
  class="accordion-content" 
  id="panel-1" 
  role="region"
>
  Answer
</div>
```

### Keyboard Navigation

- **Enter/Space** - Toggle accordion
- **Tab** - Navigate between accordion items
- **Shift + Tab** - Navigate backwards

### Focus Indicators

```css
.accordion-header:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Screen Reader Support

```html
<button class="accordion-header">
  <span class="visually-hidden">Expand</span>
  Question Text
</button>
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

**Mobile Browsers:**
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

## 🚀 Future Enhancements

- [ ] Add open/close all button
- [ ] Implement search/filter functionality
- [ ] Add deep linking to specific items
- [ ] Create React/Vue/Svelte versions
- [ ] Add lazy loading for content
- [ ] Implement nested accordions
- [ ] Add animation variants (slide, fade, scale)
- [ ] Create WordPress/Drupal plugins
- [ ] Add print styles
- [ ] Implement auto-scroll to opened item

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](../../CONTRIBUTING.md).

## 📝 License

MIT License - see [LICENSE](../../LICENSE) file.

---


## 🎓 Learning Resources

- [MDN - ARIA Accordion Pattern](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
- [W3C - Accordion Design Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [CSS-Tricks - CSS Accordion](https://css-tricks.com/css-accordions/)

## 📞 Contact

**Code-Odessey Project**

- GitHub: [@Debanga-06](https://github.com/Debanga-06)
- Repository: [Code-Odessey](https://github.com/Debanga-06/Code-Odessey)

---

**Part of the Code-Odessey Project Series** 🚀

**Happy Coding!** 📂✨