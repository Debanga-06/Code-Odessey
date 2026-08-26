# Event Invitation Page 🎉

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://event-page-kappa.vercel.app/)

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

An event invitation page combining a live countdown timer, event details (date, time, venue), and an RSVP form with an accept/decline choice. The response leads to a different confirmation message depending on whether the guest is attending, and guests who accept can specify how many people are coming.

## ✨ Features

- ⏳ **Live countdown timer** — days, hours, minutes, and seconds ticking down to the event
- 📅 **Event details block** — date, time, and venue clearly laid out
- ✅❌ **Accept / decline RSVP** — a two-button choice rather than a generic yes/no dropdown
- 👥 **Guest count selector** — appears only when the user accepts the invitation
- ⚠️ **Form validation** — requires both a name and an attendance choice before submitting
- 🎊 **Dynamic confirmation message** — wording and icon change based on whether the guest is coming
- ✏️ **Edit RSVP** — return to the form from the confirmation screen to change a response

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Date arithmetic for a countdown** — subtracting the current time from a target `Date` to get a millisecond difference, then converting that into days/hours/minutes/seconds
2. **setInterval for a ticking timer** — updating the countdown display once per second
3. **Stopping a timer at its target** — clearing the interval once the countdown reaches zero, rather than letting it go negative
4. **Conditional field visibility** — showing the guest count selector only when "yes" is the current selection
5. **String padding for consistent formatting** — `padStart(2, '0')` ensuring single-digit values display as `05` instead of `5`
6. **Dynamic confirmation content** — building a different message and icon based on which branch of a two-way choice was selected
7. **Nested ternary in a template literal** — singular vs. plural guest wording based on the selected count

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed UI, countdown unit cards
- **JavaScript ES6+** — `Date` arithmetic, `setInterval`, form validation

## 📁 Project Structure

```id="x32pl9"
survey-page/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```


## 💻 Usage Guide

1. Open `index.html` in a browser
2. Watch the countdown at the top tick down live toward the event date
3. Enter your name and click either **Joyfully Accept** or **Can't Make It**
4. If accepting, select how many guests (including yourself) will attend
5. Click **Send RSVP** — a validation error appears if the name or attendance choice is missing
6. View the confirmation screen, worded differently depending on your response
7. Click **Edit RSVP** to go back and change your answer

## 🔍 Code Walkthrough

### Converting a millisecond difference into a countdown

```javascript
const diff = EVENT_DATE - now;

const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((diff / (1000 * 60)) % 60);
const seconds = Math.floor((diff / 1000) % 60);
```

Subtracting two `Date` objects gives a plain number of milliseconds. Dividing by progressively larger units (1000ms = 1s, 60s = 1min, etc.) and applying modulo at each step extracts the "remainder" for each unit — the same pattern used for converting any duration into a human-readable breakdown.

### Stopping the timer once the event arrives

```javascript
if (diff <= 0) {
  ...
  clearInterval(countdownIntervalId);
  return;
}
```

Without this guard, the countdown would continue calculating negative values past the event time. Checking `diff <= 0` first and clearing the interval keeps the display frozen at all zeros once the target time is reached.

### Branching the confirmation message

```javascript
if (selectedAttendance === 'yes') {
  confirmIcon.textContent = '✓';
  confirmTitle.textContent = "You're on the list!";
  confirmText.textContent = `We can't wait to see you and your ${guestCount.value == 1 ? 'company' : `${guestCount.value} guests`} there.`;
} else {
  confirmIcon.textContent = '✕';
  confirmTitle.textContent = "We'll miss you";
  confirmText.textContent = "Thanks for letting us know. Hope to see you next time!";
}
```

Rather than one generic "Thanks for your RSVP" message regardless of the answer, the confirmation screen's icon, title, and body text are all set conditionally based on `selectedAttendance`, making the response feel tailored to what the guest actually chose.

## 🎨 Customization Guide

### Add to calendar functionality

Generate a `.ics` file or a Google Calendar link using the event's date/time details, offered as a button on the confirmation screen.

### Add a guest list display

Store each submitted RSVP in an array (or send to a backend) and render a live "who's coming" list beneath the form.

### Add meal preference for accepted guests

Extend the guest count section with a dietary preference dropdown, shown alongside the guest count only when attending.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `Date` object, `setInterval`, form validation

## 🚀 Future Enhancements

- [ ] Add-to-calendar button (Google Calendar / .ics download)
- [ ] Live guest list showing who has RSVP'd
- [ ] Meal/dietary preference field for attending guests
- [ ] Shareable unique invitation links per guest
- [ ] Map embed for the venue location

---

**Part of the Code Odysseys Project Series** 🚀