# 🌓 Dark Mode Toggle

A complete implementation of dark mode with theme switching, CSS variables, localStorage persistence, and system preference detection. Learn how to build a professional theme switcher from scratch.

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](https://dark-iota-ten.vercel.app/)
- [Dark Mode Concepts](#dark-mode-concepts)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [How It Works](#how-it-works)
- [CSS Variables Explained](#css-variables-explained)
- [localStorage Implementation](#localstorage-implementation)
- [System Preference Detection](#system-preference-detection)
- [Best Practices](#best-practices)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Dark Mode Toggle (Project #028 from Code-Odyssey) demonstrates professional implementation of theme switching using modern web technologies. Features include instant theme toggling, persistent user preferences, automatic system theme detection, and smooth transitions.

## **Live Preview**

[Demo Link](https://dark-iota-ten.vercel.app/)

## ✨ Features

### Core Functionality
- **🌓 Dual Theme Support**: Complete light and dark color schemes
- **💾 Persistent Storage**: User preference saved via localStorage
- **⚡ Instant Switching**: No page reload required
- **🔄 Auto Mode**: Detects and follows system preference
- **🎨 CSS Variables**: 20+ customizable theme variables
- **✨ Smooth Transitions**: Beautiful color transitions (0.3s)

### User Interface
- **🎛️ Toggle Switch**: Animated sun/moon toggle button
- **🔘 Quick Selection**: Three-button theme selector
- **📛 Theme Badge**: Current theme indicator
- **🔔 Toast Notifications**: Visual feedback on theme change
- **📝 Full Coverage**: All UI elements adapt to theme

### Developer Features
- **🏗️ Scalable Architecture**: Easy to extend with more themes
- **📦 Zero Dependencies**: Pure HTML, CSS, JavaScript
- **♿ Accessible**: Proper ARIA attributes and keyboard support
- **📱 Responsive**: Works on all device sizes
- **💻 Code Examples**: Built-in CSS variables showcase

## 🎥 Demo

Open `index.html` and click the toggle switch to see instant theme switching!

### Testing Features:
1. **Toggle Switch**: Click sun/moon button in header
2. **Quick Buttons**: Use the three theme selection buttons
3. **Persistence**: Refresh page - theme is remembered
4. **Auto Mode**: Click "Auto" to follow system preference

## 📚 Dark Mode Concepts

### What is Dark Mode?

Dark mode is a color scheme that uses light text on dark backgrounds instead of the traditional dark text on light backgrounds. Benefits include:

- **Reduced Eye Strain**: Easier on eyes in low-light conditions
- **Battery Savings**: OLED screens use less power with dark pixels
- **Aesthetic Preference**: Many users prefer dark interfaces
- **Accessibility**: Can help users with light sensitivity

### Implementation Approaches

**1. CSS Variables (This Project)**
```css
:root { --bg: white; }
[data-theme="dark"] { --bg: black; }
```
✅ Best approach, cleanest code

**2. Class-based**
```css
.light { background: white; }
.dark { background: black; }
```
⚠️ Requires many duplicate styles

**3. Separate Stylesheets**
```html
<link rel="stylesheet" href="light.css">
```
❌ Causes FOUC (Flash of Unstyled Content)

## 📖 Learning Outcomes

### HTML Concepts
- ✓ Data attributes (`data-theme`)
- ✓ Semantic structure
- ✓ Accessibility attributes
- ✓ Button elements

### CSS Concepts
- ✓ **CSS Custom Properties (Variables)**
- ✓ **Attribute Selectors**: `[data-theme="dark"]`
- ✓ **Transitions**: Smooth color changes
- ✓ **Theming Strategy**: Scalable color systems
- ✓ **Cascade & Inheritance**: Variable propagation
- ✓ **Pseudo-classes**: Interactive states

### JavaScript Concepts
- ✓ **localStorage API**: Data persistence
- ✓ **DOM Manipulation**: Attribute changes
- ✓ **Event Listeners**: Click events
- ✓ **Media Queries**: System preference detection
- ✓ **Functions**: Modular code organization
- ✓ **Conditionals**: Theme logic

### Design Concepts
- ✓ **Color Theory**: Light vs dark palettes
- ✓ **Contrast Ratios**: WCAG compliance
- ✓ **User Experience**: Preference persistence
- ✓ **Visual Feedback**: Toast notifications

## 🛠️ Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Custom properties, transitions
- **Vanilla JavaScript**: Theme logic, storage
- **localStorage**: Preference persistence
- **Media Queries**: System preference detection

## 📥 Installation

1. **Clone or Download**:
   ```bash
   git clone https://github.com/yourusername/dark-mode-toggle.git
   ```

2. **Navigate to folder**:
   ```bash
   cd dark-mode-toggle
   ```

3. **Open in browser**:
   - Double-click `index.html`
   - Or use Live Server

No build process or dependencies!

## 💻 Usage Guide

### For Users

**Toggle Switch:**
- Click the switch in the header
- Sun icon = Light mode
- Moon icon = Dark mode

**Quick Selection:**
- **Light Mode**: Traditional bright theme
- **Dark Mode**: Eye-friendly dark theme
- **Auto**: Follows your system/browser setting

**Persistence:**
- Your choice is automatically saved
- Works across browser sessions
- Applies immediately on return visits

### For Developers

**Adding New Themes:**
```css
[data-theme="blue"] {
    --bg-primary: #1e3a8a;
    --text-primary: #dbeafe;
}
```

**Customizing Colors:**
Edit the CSS variables in `:root` and `[data-theme="dark"]`

**Adding More Modes:**
Extend the `setTheme()` function with new options

## ⚙️ How It Works

### 1. CSS Variables Setup

```css
/* Light theme (default) */
:root {
    --bg-primary: #ffffff;
    --text-primary: #1f2937;
    --accent-primary: #3b82f6;
}

/* Dark theme */
[data-theme="dark"] {
    --bg-primary: #0f172a;
    --text-primary: #f1f5f9;
    --accent-primary: #60a5fa;
}

/* Usage */
body {
    background: var(--bg-primary);
    color: var(--text-primary);
}
```

### 2. Theme Application

```javascript
function applyTheme(theme) {
    // Set data attribute on root element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update UI elements
    updateToggleButton(theme);
    updateThemeBadge(theme);
}
```

### 3. localStorage Persistence

```javascript
// Save preference
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Retrieve preference
function getSavedTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Apply on page load
const savedTheme = getSavedTheme();
applyTheme(savedTheme);
```

### 4. Toggle Functionality

```javascript
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

themeToggle.addEventListener('click', toggleTheme);
```

## 🎨 CSS Variables Explained

### Color System

**Background Layers:**
```css
--bg-primary: Primary background (page)
--bg-secondary: Secondary background (cards)
--bg-tertiary: Tertiary background (inputs)
```

**Text Hierarchy:**
```css
--text-primary: Main headings and body text
--text-secondary: Supporting text
--text-tertiary: Muted text (labels)
```

**Accent Colors:**
```css
--accent-primary: Primary brand color
--accent-secondary: Secondary accent
```

**Utilities:**
```css
--border-color: Border and divider lines
--shadow: Box shadow color/opacity
--transition: Transition timing
```

### Variable Naming Convention

```css
--{category}-{variant}
--bg-primary     /* Background - Primary */
--text-secondary /* Text - Secondary */
--accent-primary /* Accent - Primary */
```

## 💾 localStorage Implementation

### Storage Structure

```javascript
// Data stored in browser
{
    "theme": "dark" // or "light" or "auto"
}
```

### Key Functions

**Save Theme:**
```javascript
localStorage.setItem('theme', 'dark');
```

**Get Theme:**
```javascript
const theme = localStorage.getItem('theme');
```

**Remove Theme:**
```javascript
localStorage.removeItem('theme');
```

**Clear All:**
```javascript
localStorage.clear();
```

### Error Handling

```javascript
function getSavedTheme() {
    try {
        return localStorage.getItem('theme') || 'light';
    } catch (e) {
        console.warn('localStorage not available:', e);
        return 'light';
    }
}
```

## 🔄 System Preference Detection

### Detecting User Preference

```javascript
// Check if user prefers dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDark) {
    applyTheme('dark');
}
```

### Listening for Changes

```javascript
// Respond to system theme changes
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'auto') {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
```

### Auto Mode Implementation

```javascript
function applyTheme(theme) {
    if (theme === 'auto') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
}
```

## ✅ Best Practices

### Color Selection

**Light Mode:**
- Background: White (#FFFFFF) or very light gray
- Text: Dark gray (#1F2937), not pure black
- Contrast ratio: At least 7:1 for body text

**Dark Mode:**
- Background: Dark blue/gray, not pure black (#0F172A)
- Text: Off-white (#F1F5F9), not pure white
- Avoid bright whites (reduces eye strain)

### Transition Timing

```css
/* Smooth but not too slow */
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Don't transition everything */
transition: background-color 0.3s, color 0.3s;
```

### FOUC Prevention

```html
<!-- In <head> before styles -->
<script>
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
</script>
```

### Accessibility

```html
<button 
    aria-label="Toggle dark mode"
    aria-pressed="false"
    role="switch">
    Toggle
</button>
```

### Testing Checklist

- ✅ All text remains readable
- ✅ Contrast ratios meet WCAG AA (4.5:1)
- ✅ Images/icons work in both themes
- ✅ Form inputs are visible
- ✅ Focus states are clear
- ✅ Transitions are smooth

## 🎨 Customization

### Add New Theme

```css
[data-theme="blue"] {
    --bg-primary: #1e3a8a;
    --bg-secondary: #1e40af;
    --text-primary: #dbeafe;
    --accent-primary: #60a5fa;
}
```

```javascript
function setTheme(theme) {
    if (theme === 'blue') {
        document.documentElement.setAttribute('data-theme', 'blue');
    }
    saveTheme(theme);
}
```

### Customize Colors

Edit variables in CSS:
```css
:root {
    --accent-primary: #your-color;
}
```

### Add Theme Button

```html
<button class="theme-btn" onclick="setTheme('custom')">
    🎨 Custom Theme
</button>
```

### Extend Components

All components automatically inherit theme:
```css
.new-component {
    background: var(--bg-primary);
    color: var(--text-primary);
    border-color: var(--border-color);
}
```

## 🌐 Browser Support

### CSS Variables
- ✅ Chrome 49+ (March 2016)
- ✅ Firefox 31+ (July 2014)
- ✅ Safari 9.1+ (March 2016)
- ✅ Edge 15+ (April 2017)

**Support: 97%+ of browsers**

### localStorage
- ✅ Universal support
- ✅ IE8+ included

### prefers-color-scheme
- ✅ Chrome 76+ (July 2019)
- ✅ Firefox 67+ (May 2019)
- ✅ Safari 12.1+ (March 2019)

**Support: 95%+ of browsers**

## 🤝 Contributing

Enhancement ideas:

### Feature Ideas
- [ ] Multiple theme options (3+ themes)
- [ ] Custom color picker
- [ ] Scheduled theme switching (auto dark at night)
- [ ] Theme preview mode
- [ ] Keyboard shortcuts
- [ ] Import/export themes
- [ ] Gradient themes
- [ ] High contrast mode
- [ ] Theme analytics
- [ ] Animation toggle (reduced motion)

### How to Contribute
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## 🎓 Educational Value

Perfect for learning:
- **CSS Variables**: Modern theming
- **localStorage**: Data persistence
- **Media Queries**: System preferences
- **JavaScript**: DOM manipulation
- **Design**: Color theory
- **UX**: User preferences

## 🔗 Resources

### Documentation
- [MDN CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

### Tools
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors](https://coolors.co/) - Color scheme generator
- [Material Design Colors](https://material.io/design/color/dark-theme.html)

### Articles
- [Building Dark Mode](https://web.dev/prefers-color-scheme/)
- [Dark Mode Best Practices](https://developer.mozilla.org/en-US/blog/prefers-color-scheme/)

## 💡 Common Issues

### FOUC (Flash of Unstyled Content)
**Solution:** Load theme before CSS
```html
<script>
    const theme = localStorage.getItem('theme');
    if (theme) document.documentElement.setAttribute('data-theme', theme);
</script>
```

### localStorage Not Available
**Solution:** Check availability
```javascript
const storageAvailable = typeof(Storage) !== "undefined";
```

### Images Not Adapting
**Solution:** Use CSS filters or swap images
```css
[data-theme="dark"] img {
    filter: brightness(0.8) contrast(1.2);
}
```

## 📞 Support

- **Issues**: Create an issue
- **Email**: squadsyntax72@gmail.com
- **Discord**: Join Code-Odyssey

---

**Happy Theme Switching!** 🌓

*Made with ❤️ by the Code-Odyssey community*