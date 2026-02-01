# 🔷 Flexbox Layout Builder

An interactive learning tool for mastering CSS Flexbox. Experiment with all flexbox properties in real-time, visualize layouts, and generate production-ready CSS code instantly.

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](https://css-vju3.vercel.app/)
- [CSS Flexbox Concepts](#css-flexbox-concepts)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Layout Presets](#layout-presets)
- [Flexbox Properties Explained](#flexbox-properties-explained)
- [Main Axis vs Cross Axis](#main-axis-vs-cross-axis)
- [Common Use Cases](#common-use-cases)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Flexbox Layout Builder is an interactive educational tool (Project #026 from Code-Odyssey) that helps developers learn and master CSS Flexbox through hands-on experimentation. Adjust properties, see immediate results, and generate clean CSS code ready for production use.

## **Live Preview**

[Demo Link](https://css-vju3.vercel.app/)

## ✨ Features

### Core Functionality
- **🎨 Live Preview**: Real-time visualization of flexbox layouts
- **⚙️ Complete Control Panel**: All major flexbox properties
- **📐 Axis Visualization**: Toggle to see main/cross axes
- **🎯 6 Layout Presets**: Navbar, Cards, Centered, Sidebar, Footer, Gallery
- **📋 Code Generation**: Clean, production-ready CSS output
- **💾 Copy to Clipboard**: One-click code copying
- **➕ Dynamic Items**: Add/remove flex items on the fly
- **📱 Responsive Interface**: Works on all devices

### Flexbox Controls

**Container Properties:**
- flex-direction (row, column, reverse)
- flex-wrap (wrap, nowrap, wrap-reverse)
- justify-content (6 options)
- align-items (5 options)
- align-content (7 options)
- gap (spacing)

**Interactive Features:**
- **Add Items**: Dynamically add flex items
- **Remove Items**: Click × on any item to remove
- **Colorful Items**: Visual distinction between items
- **Hover Effects**: Interactive scaling
- **Item Counter**: Track number of items

## 🎥 Demo

Open `index.html` in your browser to start learning Flexbox!

### Quick Start:
1. **Explore presets** to see common layouts
2. **Adjust flex-direction** to understand main axis
3. **Play with justify-content** for main axis alignment
4. **Try align-items** for cross axis alignment
5. **Add/remove items** to see flex behavior
6. **Copy CSS** for your projects

## 📚 CSS Flexbox Concepts

### What is Flexbox?

Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill available space or shrink to prevent overflow.

### Key Concepts

**1. Flex Container**
- The parent element with `display: flex`
- Controls overall layout behavior

**2. Flex Items**
- Direct children of flex container
- Can have individual flex properties

**3. Main Axis**
- Primary axis along which flex items are laid out
- Determined by `flex-direction`

**4. Cross Axis**
- Perpendicular to main axis
- Used for alignment

## 📖 Learning Outcomes

### HTML Concepts
- ✓ Semantic structure
- ✓ Dynamic element creation
- ✓ Event handling
- ✓ Accessibility

### CSS Concepts
- ✓ **Flexbox Layout**: Complete understanding
- ✓ **flex-direction**: Main axis control
- ✓ **flex-wrap**: Multi-line layouts
- ✓ **justify-content**: Main axis alignment
- ✓ **align-items**: Cross axis item alignment
- ✓ **align-content**: Multi-line cross axis alignment
- ✓ **gap**: Modern spacing method
- ✓ **flex property**: Item sizing (flex-grow, flex-shrink, flex-basis)

### JavaScript Concepts
- ✓ **DOM Manipulation**: Style updates
- ✓ **Event Listeners**: Change events
- ✓ **Dynamic Content**: Add/remove elements
- ✓ **Preset System**: Configuration objects
- ✓ **Code Generation**: Template building
- ✓ **Clipboard API**: Copy functionality

### Layout Design
- ✓ **Navigation bars**: Horizontal layouts
- ✓ **Card grids**: Wrapping items
- ✓ **Centered content**: Perfect centering
- ✓ **Sidebar layouts**: Multi-section pages
- ✓ **Footers**: Multi-column footers
- ✓ **Galleries**: Flexible image layouts

## 🛠️ Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Flexbox layout, styling, animations
- **Vanilla JavaScript**: All interactivity
- **No dependencies**: Pure web technologies

## 📥 Installation

1. **Clone or Download**:
   ```bash
   git clone https://github.com/yourusername/flexbox-layout-builder.git
   ```

2. **Navigate to folder**:
   ```bash
   cd flexbox-layout-builder
   ```

3. **Open in browser**:
   - Double-click `index.html`
   - Right-click → Open with browser
   - Use Live Server (optional)

No build process required!

## 💻 Usage Guide

### Understanding Flex Direction

**flex-direction: row** (default)
- Main axis: Horizontal (left to right)
- Cross axis: Vertical (top to bottom)
- Items arranged in a row

**flex-direction: column**
- Main axis: Vertical (top to bottom)
- Cross axis: Horizontal (left to right)
- Items arranged in a column

**-reverse variants**
- Reverses the direction of items

### Alignment Guide

**Main Axis (justify-content):**
- Controls spacing/position along main axis
- Options: flex-start, center, flex-end, space-between, space-around, space-evenly

**Cross Axis (align-items):**
- Controls alignment perpendicular to main axis
- Options: stretch, flex-start, center, flex-end, baseline

**Multi-line (align-content):**
- Only works with flex-wrap: wrap
- Controls line spacing
- Same options as justify-content

### Wrapping Behavior

**flex-wrap: nowrap** (default)
- All items on single line
- Items may shrink to fit

**flex-wrap: wrap**
- Items wrap to new lines as needed
- Enables align-content

**flex-wrap: wrap-reverse**
- Wraps in reverse order

## 🎨 Layout Presets

### 1. Navbar
```css
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
gap: 20px;
```
**Use Case:** Navigation menus, headers  
**Items:** 3 (Logo, Menu, Actions)

### 2. Centered
```css
display: flex;
justify-content: center;
align-items: center;
```
**Use Case:** Perfect centering, modals, hero sections  
**Items:** 1

### 3. Card Grid
```css
display: flex;
flex-wrap: wrap;
gap: 20px;
```
**Use Case:** Product cards, blog posts, galleries  
**Items:** 6+

### 4. Sidebar
```css
display: flex;
flex-direction: row;
```
**Use Case:** App layouts with navigation  
**Items:** 2 (Sidebar, Main Content)

### 5. Footer
```css
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: flex-start;
gap: 30px;
```
**Use Case:** Website footers, multi-column info  
**Items:** 4 (columns)

### 6. Gallery
```css
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
align-content: space-around;
gap: 15px;
```
**Use Case:** Image galleries, flexible grids  
**Items:** 6+

## 📐 Flexbox Properties Explained

### flex-direction

Controls the main axis direction:

```css
flex-direction: row;           /* → (default) */
flex-direction: row-reverse;   /* ← */
flex-direction: column;        /* ↓ */
flex-direction: column-reverse; /* ↑ */
```

### flex-wrap

Controls whether items wrap to new lines:

```css
flex-wrap: nowrap;       /* Single line (default) */
flex-wrap: wrap;         /* Multi-line */
flex-wrap: wrap-reverse; /* Multi-line, reversed */
```

### justify-content

Aligns items along the **main axis**:

```css
justify-content: flex-start;    /* Start of container */
justify-content: flex-end;      /* End of container */
justify-content: center;        /* Centered */
justify-content: space-between; /* First and last at edges */
justify-content: space-around;  /* Equal space around items */
justify-content: space-evenly;  /* Equal space between all */
```

### align-items

Aligns items along the **cross axis**:

```css
align-items: stretch;    /* Fill container (default) */
align-items: flex-start; /* Start of cross axis */
align-items: flex-end;   /* End of cross axis */
align-items: center;     /* Centered on cross axis */
align-items: baseline;   /* Aligned by text baseline */
```

### align-content

Aligns **lines** when wrapping (requires flex-wrap: wrap):

```css
align-content: normal;        /* Default */
align-content: flex-start;    /* Lines at start */
align-content: flex-end;      /* Lines at end */
align-content: center;        /* Lines centered */
align-content: space-between; /* Space between lines */
align-content: space-around;  /* Space around lines */
align-content: stretch;       /* Lines stretched */
```

### gap

Modern way to add spacing between flex items:

```css
gap: 20px;              /* Both row and column */
row-gap: 20px;          /* Vertical spacing */
column-gap: 10px;       /* Horizontal spacing */
```

## 🎯 Main Axis vs Cross Axis

### When flex-direction: row

```
Main Axis: →  (Horizontal)
Cross Axis: ↓ (Vertical)

justify-content = Horizontal alignment
align-items = Vertical alignment
```

### When flex-direction: column

```
Main Axis: ↓  (Vertical)
Cross Axis: → (Horizontal)

justify-content = Vertical alignment
align-items = Horizontal alignment
```

**Remember:** 
- **justify-*** always controls the main axis
- **align-*** always controls the cross axis

## 💡 Common Use Cases

### 1. Perfect Centering
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

### 2. Navigation Bar
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
```

### 3. Responsive Card Grid
```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, base 300px */
}
```

### 4. Sidebar Layout
```css
.app {
  display: flex;
}

.sidebar {
  flex: 0 0 250px; /* Fixed width sidebar */
}

.main {
  flex: 1; /* Takes remaining space */
}
```

### 5. Footer Columns
```css
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-column {
  flex: 1 1 200px;
}
```

### 6. Holy Grail Layout
```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}

.sidebar {
  flex: 0 0 200px;
}

.main {
  flex: 1;
}
```

## ⚙️ How It Works

### Real-Time Updates

```javascript
function updateFlex() {
    const direction = document.getElementById('flexDirection').value;
    const wrap = document.getElementById('flexWrap').value;
    const justify = document.getElementById('justifyContent').value;
    const alignItems = document.getElementById('alignItems').value;
    const gap = document.getElementById('gap').value;

    flexWrapper.style.flexDirection = direction;
    flexWrapper.style.flexWrap = wrap;
    flexWrapper.style.justifyContent = justify;
    flexWrapper.style.alignItems = alignItems;
    flexWrapper.style.gap = gap + 'px';

    updateCode();
}
```

### Dynamic Item Management

```javascript
function addItem() {
    itemCounter++;
    const item = document.createElement('div');
    item.className = 'flex-item';
    item.innerHTML = `
        <div class="item-number">${itemCounter}</div>
        <div class="item-size">flex: 1</div>
        <button class="remove-item" onclick="removeItem(this)">×</button>
    `;
    flexWrapper.appendChild(item);
}
```

### Code Generation

```javascript
function updateCode() {
    let code = `.flex-container {\n  display: flex;`;
    
    if (direction !== 'row') 
        code += `\n  flex-direction: ${direction};`;
    if (wrap !== 'nowrap') 
        code += `\n  flex-wrap: ${wrap};`;
    // ... other properties
    
    code += '\n}';
    codeOutput.textContent = code;
}
```

## 🎨 Customization

### Add Custom Presets

```javascript
const presets = {
    // ... existing presets
    'pricing-table': {
        direction: 'row',
        wrap: 'wrap',
        justify: 'center',
        alignItems: 'stretch',
        alignContent: 'normal',
        gap: '30',
        items: 3
    }
};
```

### Modify Item Styles

```css
.flex-item:nth-child(7) {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}
```

### Add Individual Item Controls

```javascript
// Add flex-grow, flex-shrink, flex-basis controls for each item
<select onchange="updateItemFlex(this, 'grow')">
    <option value="0">0</option>
    <option value="1" selected>1</option>
    <option value="2">2</option>
</select>
```

## 🌐 Browser Support

- ✅ Chrome 29+ (July 2013)
- ✅ Firefox 28+ (March 2014)
- ✅ Safari 9+ (September 2015)
- ✅ Edge (all versions)
- ✅ Opera 17+ (August 2013)

**Flexbox is supported in 98%+ of browsers worldwide!**

**Note:** IE11 has partial support with some quirks

## 🤝 Contributing

Enhancement ideas:

### Feature Ideas
- [ ] Individual flex item controls (flex-grow, flex-shrink, flex-basis)
- [ ] Order property for items
- [ ] Align-self for individual items
- [ ] Flex shorthand visualization
- [ ] Responsive breakpoint preview
- [ ] Export as React/Vue components
- [ ] Save custom presets
- [ ] Dark mode
- [ ] Animation transitions
- [ ] Accessibility improvements
- [ ] Tutorial mode
- [ ] Flexbox vs Grid comparison
- [ ] Real-world examples library
- [ ] Performance metrics

### How to Contribute
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## 🎓 Educational Value

Perfect for:
- **Beginners**: Learn flexbox fundamentals
- **Intermediate**: Master alignment properties
- **Teachers**: Interactive teaching tool
- **Designers**: Quick prototyping
- **Developers**: Property reference

## 🔗 Resources

### Documentation
- [MDN Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS Tricks Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [W3C Specification](https://www.w3.org/TR/css-flexbox-1/)

### Learning
- [Flexbox Froggy](https://flexboxfroggy.com/) - Game
- [Flexbox Defense](http://www.flexboxdefense.com/) - Tower defense game
- [Flexbox Zombies](https://mastery.games/flexboxzombies/) - Course

### Tools
- [Flexbox Playground](https://codepen.io/enxaneta/pen/adLPwv)
- [Flexy Boxes](https://the-echoplex.net/flexyboxes/)
- [Flexulator](https://www.flexulator.com/)

## 📞 Support

- **Issues**: Create an issue
- **Email**: squadsyntax72@gmail.com
- **Discord**: Join Code-Odyssey community

---

**Happy Flexbox Learning!** 🔷

*Made with ❤️ by the Code-Odyssey community*