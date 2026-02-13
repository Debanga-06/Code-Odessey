# Tabs Component - Navigation & Content Display 📑

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Tab Variants](#tab-variants)
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

A comprehensive **Tabs Component** collection featuring 5 unique design patterns for content navigation. Includes horizontal tabs, pill-style tabs, icon tabs with counters, card-style tabs, and vertical tabs. Built with semantic HTML, smooth CSS animations, and vanilla JavaScript for optimal performance.

**Live Demo:** [View Project](#)

## ✨ Features

### 5 Tab Variants
- 📊 **Basic Horizontal** - Classic tab navigation with underline
- 💊 **Pill Style** - Rounded button-style tabs
- 🎯 **Icon Tabs** - Tabs with emojis and notification counters
- 🃏 **Card Style** - Elevated card-based tab design
- 📑 **Vertical Tabs** - Side navigation with vertical layout

### Interactive Features
- 🎭 **Smooth Transitions** - Fade-in animations on tab switch
- 🖱️ **Click to Switch** - Instant content switching
- 📱 **Touch Optimized** - Perfect for mobile devices
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🎨 **Active Indicators** - Clear visual feedback
- 💫 **Fade Animations** - Content fades in smoothly

### Technical Features
- ♿ **ARIA Compliant** - Full accessibility support
- 🎨 **CSS Variables** - Easy theming and customization
- 📦 **Zero Dependencies** - Pure vanilla JavaScript
- 🚀 **High Performance** - Optimized DOM updates
- 📱 **Responsive** - Adapts to all screen sizes
- 🔄 **Reusable** - Works with multiple tab groups on one page

## 🎓 Learning Outcomes

1. **Tab Switching** - Building navigation patterns
2. **Content Display** - Showing/hiding panels dynamically
3. **State Management** - Tracking active tab state
4. **Event Handling** - Click events and delegation
5. **DOM Manipulation** - Class toggling and attribute updates
6. **CSS Animations** - Fade-in effects and transitions
7. **ARIA Attributes** - Implementing role="tab" pattern
8. **Responsive Design** - Horizontal to vertical on mobile
9. **Component Isolation** - Multiple instances on one page
10. **Data Attributes** - Using data-* for configuration

## 🎨 Tab Variants

### 1. Basic Horizontal Tabs
**Use Case:** Product pages, documentation, settings

**Features:**
- Horizontal layout with equal-width tabs
- Bottom border indicator on active tab
- Clean, professional design
- Subtle hover effects

**Best For:** Traditional navigation patterns

### 2. Pill Style Tabs
**Use Case:** Filters, categories, language selection

**Features:**
- Rounded button-style design
- Filled background on active state
- More compact than basic tabs
- Modern, friendly appearance

**Best For:** Informal interfaces, mobile apps

### 3. Icon Tabs with Counters
**Use Case:** Email clients, notifications, dashboards

**Features:**
- Icons (emojis or SVG)
- Notification badges with counts
- Clear visual categories
- Informative at a glance

**Best For:** Data-heavy interfaces, inboxes

### 4. Card Style Tabs
**Use Case:** Pricing tables, comparison views

**Features:**
- Elevated card design
- Hover effects with lift
- Separated tab content area
- Premium, polished look

**Best For:** High-end products, premium services

### 5. Vertical Tabs
**Use Case:** Settings panels, admin interfaces

**Features:**
- Left-aligned vertical layout
- Right border indicator
- Space-efficient for long lists
- Desktop-optimized (converts to horizontal on mobile)

**Best For:** Dense navigation, many options

## 📁 Project Structure

```
Tabs-Component/
│
├── index.html          # Complete tabs demos
└── README.md           # This documentation
```

## 🚀 Installation

### Method 1: Direct Use

```bash
# Clone repository
git clone https://github.com/Debanga-06/Code-Odessey.git
cd Code-Odessey/Tabs-Component

# Open in browser
open index.html
```

### Method 2: Copy Implementation

1. Copy the HTML structure
2. Copy the CSS styles (customize as needed)
3. Copy the JavaScript code
4. Integrate into your project

## 💻 Usage Guide

### Basic Implementation

```html
<div class="tabs-container">
  <div class="tabs-list" role="tablist">
    <button class="tab-button active" data-tab="tab1" role="tab">
      Tab 1
    </button>
    <button class="tab-button" data-tab="tab2" role="tab">
      Tab 2
    </button>
  </div>
  
  <div class="tabs-content">
    <div class="tab-panel active" id="tab1" role="tabpanel">
      Content for Tab 1
    </div>
    <div class="tab-panel" id="tab2" role="tabpanel">
      Content for Tab 2
    </div>
  </div>
</div>

<script>
  function initTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active classes
        buttons.forEach(btn => btn.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        document.getElementById(targetTab).classList.add('active');
      });
    });
  }
  
  initTabs();
</script>
```

### Adding New Tabs

Add a new button and panel with matching `data-tab` and `id`:

```html
<!-- Add button -->
<button class="tab-button" data-tab="tab3" role="tab">
  Tab 3
</button>

<!-- Add panel -->
<div class="tab-panel" id="tab3" role="tabpanel">
  Content for Tab 3
</div>
```

### Tabs with Icons

```html
<button class="tab-button active" data-tab="home" role="tab">
  <span class="tab-icon">
    <span class="tab-icon-emoji">🏠</span>
    <span>Home</span>
  </span>
</button>
```

### Tabs with Counters

```html
<button class="tab-button active" data-tab="inbox" role="tab">
  <span class="tab-icon">
    <span class="tab-icon-emoji">📥</span>
    <span>Inbox</span>
    <span class="tab-counter">12</span>
  </span>
</button>
```

## 🎨 Customization

### Change Colors

```css
:root {
  --bg-primary: #0f1419;      /* Page background */
  --bg-secondary: #1a1f28;    /* Container background */
  --bg-card: #242b36;         /* Tab background */
  --border: #2f3845;          /* Border color */
  --accent: #3b82f6;          /* Active tab color */
  --text-primary: #f8fafc;    /* Main text */
  --text-secondary: #94a3b8;  /* Inactive tab text */
}
```

### Change Tab Indicator Style

```css
/* Underline (default) */
.tab-button.active::after {
  bottom: 0;
  height: 2px;
  background: var(--accent);
}

/* Top border */
.tab-button.active::after {
  top: 0;
  height: 3px;
  background: var(--accent);
}

/* Full background */
.tab-button.active {
  background: var(--accent);
  color: white;
}
```

### Make Tabs Scrollable on Mobile

```css
.tabs-list {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

.tabs-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
```

### Change Animation

```css
/* Slide from right */
@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateX(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

.tab-panel.active {
  animation: slideIn 0.3s ease;
}
```

## ♿ Accessibility

### ARIA Attributes

```html
<div class="tabs-list" role="tablist">
  <button 
    class="tab-button active" 
    data-tab="tab1" 
    role="tab"
    aria-selected="true"
    aria-controls="tab1"
  >
    Tab 1
  </button>
</div>

<div class="tabs-content">
  <div 
    class="tab-panel active" 
    id="tab1" 
    role="tabpanel"
    aria-labelledby="tab-button-1"
  >
    Content
  </div>
</div>
```

### Keyboard Navigation

- **Tab** - Move focus to next tab
- **Shift + Tab** - Move focus to previous tab
- **Enter/Space** - Activate focused tab
- **Arrow Left/Right** - Navigate between tabs (optional)

### Focus Management

```css
.tab-button:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tab-button:focus:not(:focus-visible) {
  outline: none;
}
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
- ✅ Firefox Mobile

## 🚀 Future Enhancements

- [ ] Add URL hash navigation (#tab-name)
- [ ] Implement keyboard arrow navigation
- [ ] Add swipe gestures for mobile
- [ ] Create React/Vue/Svelte components
- [ ] Add lazy loading for tab content
- [ ] Implement nested tabs
- [ ] Add tab close buttons
- [ ] Create draggable/reorderable tabs
- [ ] Add tab overflow menu (...)
- [ ] Implement tab history/breadcrumbs
- [ ] Add animation variants
- [ ] Create WordPress/Drupal plugins

## 🎯 Use Cases

### Product Pages
```html
<!-- Specs, Reviews, FAQ -->
<button data-tab="specs">Specifications</button>
<button data-tab="reviews">Reviews</button>
<button data-tab="faq">FAQ</button>
```

### Settings Panel
```html
<!-- Account, Privacy, Notifications -->
<button data-tab="account">Account</button>
<button data-tab="privacy">Privacy</button>
<button data-tab="notifications">Notifications</button>
```

### Pricing Tables
```html
<!-- Monthly, Annual -->
<button data-tab="monthly">Monthly</button>
<button data-tab="annual">Annual (Save 20%)</button>
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](../../CONTRIBUTING.md).

## 📝 License

MIT License - see [LICENSE](../../LICENSE) file.

---

## 🎓 Learning Resources

- [MDN - ARIA Tabs Pattern](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)
- [W3C - Tabs Design Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [CSS-Tricks - Tabs](https://css-tricks.com/tabs/)

## 📞 Contact

**Code-Odessey Project**

- GitHub: [@Debanga-06](https://github.com/Debanga-06)
- Repository: [Code-Odessey](https://github.com/Debanga-06/Code-Odessey)

---

**Part of the Code-Odessey Project Series** 🚀

**Happy Coding!** 📑✨