# Login Validation Demo 🔐

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://login-form-rouge-omega.vercel.app/)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Code Walkthrough](#code-walkthrough)
- [Customization Guide](#customization-guide)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

A login form focused entirely on validation UX: real-time email format checking, a password strength meter, a show/hide password toggle, and a submit button that only enables once both fields are valid. The key UX detail is that errors don't appear the instant a field is empty — they only show up after the user has actually interacted with (and left) that field, avoiding the common annoyance of red errors flashing before someone has even started typing.

## ✨ Features

- 📧 **Real-time email validation** — checked against a regex pattern as the user types
- 👁️ **Show/hide password toggle** — switches the input's `type` between `password` and `text`
- 💪 **Password strength meter** — live-updating bar and label based on length and character variety
- ⏳ **"Touched" field tracking** — validation errors only appear after a field has been focused and left (blurred), not on first render or mid-typing before the user has finished
- 🚫 **Disabled submit until valid** — the Sign In button only becomes clickable once both email and password pass validation
- ⏱️ **Simulated async submit** — a brief "Signing in..." state before showing a success message, mimicking a real network request

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **The "touched" field pattern** — a common real-world UX technique where validation feedback is suppressed until the user has interacted with a field, tracked here with `hasEmailBeenTouched`/`hasPasswordBeenTouched` boolean flags
2. **blur vs. input events** — `input` fires on every keystroke (used to keep internal validity state current), while `blur` fires only when the field loses focus (used as the trigger to start actually *showing* errors)
3. **Regex-based email validation** — pattern matching against a standard email shape
4. **Toggling input type for password visibility** — switching `type="password"` to `type="text"` and back, a two-line trick with a real usability impact
5. **Deriving a password strength score** — accumulating points across multiple independent regex checks (length, uppercase, digits, symbols) into a single 0-5 score, then mapping that score to a label and color
6. **Disabling/enabling a submit button based on combined validity** — a single `updateSubmitState()` function checks both fields' validity flags together, called after every relevant change
7. **Simulating an async operation with setTimeout** — showing a loading state before a final result, standing in for what would be a real `fetch()` call to an authentication endpoint

## 🛠️ Technologies Used

- **HTML5** — Semantic form structure, `novalidate` to fully control validation via JavaScript
- **CSS3** — Flat neon-themed UI, valid/invalid input border states
- **JavaScript ES6+** — Regex, event handling (`input`, `blur`, `submit`), `setTimeout`

## 📁 Project Structure

```id="x32pl9"
login-page/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Start typing an email — no error shows yet, even if it's invalid, because the field hasn't been "touched"
3. Click into the password field and back out (or tab away) without finishing the email — now the email error appears if it's still invalid
4. Type a password — watch the strength meter update live as you add length, uppercase letters, numbers, or symbols
5. Click **Show** to reveal the password in plain text, or **Hide** to mask it again
6. Once both fields are valid, **Sign In** becomes enabled — click it to see a brief loading state followed by a success message

## 🔍 Code Walkthrough

### The "touched" field pattern

```javascript
function validateEmail() {
  const email = emailInput.value.trim();
  isEmailValid = EMAIL_REGEX.test(email);

  if (!hasEmailBeenTouched) {
    updateSubmitState();
    return;
  }

  emailInput.classList.toggle('invalid', !isEmailValid && email.length > 0);
  emailError.classList.toggle('hidden', isEmailValid || email.length === 0);
  ...
}
```

Validity (`isEmailValid`) is always calculated on every keystroke, so the submit button state stays accurate at all times. But the *visual* error state — red border, error text — is gated behind `hasEmailBeenTouched`, which only becomes `true` once the field has been blurred at least once. This means a fresh, empty field never shows an error the moment the page loads.

### Building a password strength score

```javascript
let score = 0;
if (password.length >= 8) score++;
if (password.length >= 12) score++;
if (/[A-Z]/.test(password)) score++;
if (/[0-9]/.test(password)) score++;
if (/[^A-Za-z0-9]/.test(password)) score++;

const level = levels[Math.min(score, levels.length - 1)];
```

Each independent criterion contributes at most one point, and the final score (0-5) is used as an index into a `levels` array of label/color/width combinations. `Math.min(score, levels.length - 1)` guards against an out-of-bounds array access if every criterion is met simultaneously.

### Simulating a network request

```javascript
submitBtn.disabled = true;
submitBtn.textContent = 'Signing in...';

setTimeout(() => {
  submitBtn.textContent = 'Sign In';
  submitBtn.disabled = false;
  formStatus.textContent = 'Signed in successfully!';
}, 1200);
```

The button is disabled and relabeled immediately on submit to prevent double-submission and give instant feedback, then `setTimeout` stands in for the delay a real `fetch()` call to a login API would introduce, before resolving to a final success state.

## 🎨 Customization Guide

### Add real backend authentication

Replace the `setTimeout` in `handleSubmit` with an actual `fetch()` POST request to a login endpoint, handling both success and failure (wrong password, server error) responses distinctly.

### Add a "forgot password" flow

Add a link beneath the password field that reveals a simple email-only form for a password reset request, reusing the existing email validation logic.

### Persist "Remember me"

Read the `rememberCheck` checkbox state and store a flag in `localStorage`, pre-checking it on return visits.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** Regex, `blur`/`input`/`submit` events, `classList`

## 🚀 Future Enhancements

- [ ] Real backend authentication via fetch()
- [ ] "Forgot password" flow
- [ ] Persisted "Remember me" preference
- [ ] Account lockout simulation after repeated failed attempts
- [ ] Social login button placeholders (Google, GitHub)

---

**Part of the Code Odysseys Project Series** 🚀