# Simple Quiz App

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-beginner-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A multiple-choice quiz with score tracking, answer feedback, and a results screen. Includes 5 switchable visual themes.
Part of the Code Odysseys series - JavaScript fundamentals practice.

### Demo :- [Live Now](https://quiz-app-omega-rosy-81.vercel.app/)

## Concepts Covered
- Array of objects as a data source (`questions`)
- Iterating over an array with `forEach` to render dynamic options
- State management with plain variables (`currentIndex`, `score`, `hasAnswered`)
- Conditional logic to compare selected vs. correct answers
- classList manipulation to visually mark correct/incorrect options
- Screen switching using the `hidden` class
- Ternary/if-else logic for a results message based on percentage

## Features
- 5-question multiple-choice quiz
- Live progress bar and running score
- Immediate visual feedback (green for correct, red for incorrect)
- Prevents double-answering a question
- Results screen with score and a message based on performance
- Restart button to reset and try again
- 5 selectable styles: Classic, Minimal, Dark, Gradient, Neon

## File Structure

```id="x32pl9"
Simple-Quiz-App/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## How to Run
Open `index.html` in any browser. No dependencies required.

## Possible Extensions
- Add a countdown timer per question
- Shuffle questions and options on each attempt
- Store high scores in localStorage

## 📖 Resources for Learning

### HTML Forms
- [MDN - HTML Form Elements](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [MDN - Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

### CSS
- [MDN - CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS-Tricks - A Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### JavaScript
- [MDN - JavaScript Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN - Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [JavaScript.info - Form Properties & Methods](https://javascript.info/form-elements)

### Security
- [OWASP - Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [MDN - Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🤝 Contributing

To improve this project:
- Test across different browsers and devices
- Report bugs and issues
- Suggest UI/UX improvements
- Share your enhancements with the community
- Create variations for learning purposes

## 📄 License

This project is provided as an educational resource. Check the repository's main [LICENSE](LICENSE) file for specific usage terms.

## 🎓 Getting Help

If you get stuck:
1. Check the browser console (F12) for JavaScript errors
2. Review the validation logic in the comments
3. Test each field individually to identify issues
4. Refer to the MDN documentation links above
5. Start with simpler changes before advanced customizations

---

**Happy Coding!** 🎉

Remember: Every expert was once a beginner. Take your time to understand each part of the code, experiment with changes, and build your skills step by step. Good luck with your web development journey!
