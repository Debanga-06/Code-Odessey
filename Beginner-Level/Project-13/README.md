# Company About Us Page

A modern, responsive "About Us" webpage built with HTML, CSS, and JavaScript. This project showcases a professional company profile with smooth scroll animations and an interactive team section.

## 🎯 Live Demo

**[View the live demo here](https://code-odessey-h5az.vercel.app/)**

Once you deploy this project to a hosting platform (GitHub Pages, Netlify, Vercel, etc.), update this link with your project's URL.

## Features

✨ **Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile devices
🎨 **Smooth Animations** - Elegant fade-in and slide-up animations triggered on page load and scroll
👥 **Team Section** - Professional team member cards with hover effects
📱 **Mobile Optimized** - Meta viewport tag for proper mobile rendering
⚡ **Lightweight** - Minimal dependencies, pure HTML, CSS, and JavaScript

## Project Structure

```
Project-13/
├── index.html       # Main HTML file with page structure
├── style.css        # Styling and animations
├── script.js        # JavaScript for scroll animations
└── README.md        # This file
```

## Getting Started

### System Requirements

**Minimum Requirements:**
- Operating System: Windows 10+, macOS 10.12+, or Linux (any modern distribution)
- RAM: 2GB minimum (4GB recommended)
- Disk Space: 100MB free space
- Internet Connection: Required for placeholder images

**Software Required:**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Sublime Text, Notepad++, or similar)
- Python 3.6+ OR Node.js 12+ (for running a local server - optional but recommended)

### Prerequisites

#### For Windows Users:
1. **Download Python:**
   - Visit [https://www.python.org/downloads/](https://www.python.org/downloads/)
   - Download Python 3.10 or later
   - During installation, check "Add Python to PATH"
   - Click Install Now

2. **Verify Installation:**
   - Open Command Prompt (press `Win + R`, type `cmd`)
   - Type: `python --version`
   - You should see the Python version number

#### For Mac Users:
1. **Python comes pre-installed on macOS**, but to verify:
   - Open Terminal (press `Cmd + Space`, type `terminal`)
   - Type: `python3 --version`
   - You should see the Python version number

#### For Linux Users:
1. **Open Terminal**
2. **Install Python (if not already installed):**
   ```bash
   sudo apt update
   sudo apt install python3
   ```
3. **Verify Installation:**
   ```bash
   python3 --version
   ```

### Installation

#### Step 1: Download or Clone the Project

**Option A: Download ZIP**
1. Go to the Code-Odessey repository
2. Click "Download ZIP"
3. Extract the folder to your desired location
4. Navigate to `Beginner-Level/Project-13/`

**Option B: Clone with Git**
```bash
git clone https://github.com/your-repo/Code-Odessey.git
cd Code-Odessey/Beginner-Level/Project-13/
```

#### Step 2: Run the Local Server

**For Windows Users:**
```bash
# Open Command Prompt in the Project-13 folder
# Press Shift + Right Click in the folder, select "Open PowerShell here"
# Then type:
python -m http.server 8000
```

**For Mac/Linux Users:**
```bash
# Open Terminal and navigate to Project-13 folder
cd path/to/Project-13
python3 -m http.server 8000
```

#### Step 3: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, or Edge)
2. Go to: `http://localhost:8000`
3. You should see the "About Us" page with animations

#### Step 4: Stop the Server

- Press `Ctrl + C` in the terminal/command prompt where the server is running

### Quick Alternative: Direct File Opening

If you don't want to set up a server, you can also:
1. Right-click on `index.html`
2. Select "Open with" → Choose your browser
3. The page will work, but some features may be limited

**Note:** Using a local server is recommended for full functionality.

## How It Works

### HTML Structure
- **Company Info Section** - Brand introduction with compelling copy
- **Story Section** - Company history and values
- **Team Section** - Team member profiles with images and titles

### CSS Features
- Custom color scheme with professional blues and grays
- Flexbox layout for team cards
- CSS transitions for smooth animations
- Hover effects on team member cards

### JavaScript Functionality
- Scroll event listener that detects when sections enter the viewport
- Adds "visible" class to trigger CSS animations
- Runs on page load to display initial content
- Smooth opacity and transform effects

## Customization

### Change Colors
Edit the color values in `style.css`:
- `.company-info` - Company section background color
- `.storytelling` - Story section background color
- `.team` - Team section background color

### Update Team Members
Edit the team member cards in `index.html`:
```html
<div class="team-member">
  <img src="https://your-image-url.jpg" alt="Member Name">
  <h3>Member Name</h3>
  <p>Position Title</p>
</div>
```

### Modify Content
Edit text and headings directly in `index.html` to match your company's information.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Page Load Time** - Less than 1 second on modern connections
- **File Size** - Minimal (HTML ~2KB, CSS ~2KB, JS ~0.5KB)
- **No External Dependencies** - Pure vanilla JavaScript

## Future Enhancements

- [ ] Add contact form section
- [ ] Integrate with backend for dynamic team data
- [ ] Add testimonials section
- [ ] Implement dark mode toggle
- [ ] Add social media links
- [ ] Email newsletter signup

## License

This project is open source and available for educational purposes.

## Author

Code-Odessey - Beginner Level Project 13

## Support

For issues or questions, refer to the main repository documentation or create an issue in the Code-Odessey project.

---

**Last Updated:** January 28, 2026






