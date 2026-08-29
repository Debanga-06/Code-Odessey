# Pricing Calculator 💵

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

### Demo :- [Live Now](https://pricing-calculator-sage-three.vercel.app/)

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

A SaaS-style pricing calculator where the total updates live as the user picks a plan, adjusts team size, toggles between monthly/yearly billing, selects add-ons, and applies a promo code. A running price summary breaks down exactly what's contributing to the final number — base plan, add-ons, and each discount applied, in order.

## ✨ Features

- 📦 **Three selectable plans** with different per-seat pricing
- 👥 **Team size slider** — cost scales directly with seat count
- 📅 **Monthly / yearly billing toggle** — yearly applies an automatic 20% discount
- 🧩 **Toggleable add-ons** — multiple can be selected at once, each with its own flat monthly cost
- 🏷️ **Promo code input** — validated against a small set of known codes, applying an additional percentage discount
- 📊 **Itemized price summary** — shows every cost and discount line separately, not just a final number

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Chained percentage discounts** — applying the yearly discount to the subtotal first, then applying the promo discount to what's *left* after that, rather than both being calculated off the original subtotal independently
2. **Set for toggle-style multi-selection** — using a `Set` (`selectedAddonIds`) to track which add-ons are active, since it naturally handles add/remove/has-membership checks without duplicate entries
3. **Recalculating on every relevant input** — plan selection, slider movement, billing toggle, and add-on clicks all funnel into the same `calculateTotal()` function, keeping one single source of truth for the final price
4. **Building an itemized breakdown dynamically** — rather than only showing a final total, each contributing line (plan cost, add-ons, each discount) is rendered separately and conditionally, only appearing when it actually applies
5. **Object lookup for promo validation** — `PROMO_CODES[code]` checks membership and retrieves the discount rate in one step, cleaner than a chain of `if/else if` comparisons
6. **Combining reduce and filter** — filtering `ADDONS` down to only the selected ones, then reducing that filtered list into a single cost total
7. **Conditional singular/plural text** — "1 seat" vs. "5 seats" handled with a small ternary inside a template literal

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flat neon-themed two-column layout, sticky summary panel
- **JavaScript ES6+** — `Set`, array methods (`filter`, `reduce`, `find`), template literals

## 📁 Project Structure

```id="x32pl9"
pricing-calculator/
│
├── index.html      # Main structure
├── style.css       # Styling file
├── script.js       # JavaScript logic
├── README.md       # Documentation
```

## 💻 Usage Guide

1. Open `index.html` in a browser
2. Click a plan card to select it — the summary updates immediately
3. Drag the team size slider — cost scales per seat
4. Switch between **Monthly** and **Yearly** billing — yearly applies an automatic 20% discount
5. Click any add-on to toggle it on or off; multiple can be active at once
6. Enter a promo code (try `SAVE10` or `WELCOME15`) and click **Apply**
7. Watch the price summary panel break down exactly how the final total was reached

## 🔍 Code Walkthrough

### Chaining discounts in sequence

```javascript
let subtotal = planCost + addonCost;

const yearlyDiscountAmount = billingCycle === 'yearly' ? subtotal * YEARLY_DISCOUNT : 0;
subtotal -= yearlyDiscountAmount;

const promoDiscountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
subtotal -= promoDiscountAmount;
```

The promo discount is calculated as a percentage of `subtotal` *after* the yearly discount has already been subtracted from it — not of the original pre-discount amount. This models how stacked discounts typically work in real pricing systems: each discount applies to whatever remains, not to the original full price independently.

### Using a Set for multi-select add-ons

```javascript
let selectedAddonIds = new Set();

if (selectedAddonIds.has(addon.id)) {
  selectedAddonIds.delete(addon.id);
} else {
  selectedAddonIds.add(addon.id);
}
```

A `Set` is a natural fit for "which of these are currently selected" state — `has()` checks membership, `add()`/`delete()` toggle it, and duplicates are structurally impossible, unlike managing the same logic with a plain array and manual index-finding.

### Building the summary conditionally

```javascript
if (addonCost > 0) {
  addSummaryLine('Add-ons', addonCost);
}

if (yearlyDiscount > 0) {
  addSummaryLine('Yearly discount (20%)', -yearlyDiscount, true);
}
```

Each summary line only appears if it's actually relevant — no add-ons selected means no "Add-ons" line at all, and choosing monthly billing means no yearly discount line. This keeps the summary panel clean and only shows what's genuinely contributing to the final price at any given moment.

## 🎨 Customization Guide

### Add usage-based pricing

Add a second slider for something like "API calls per month" with its own per-unit rate, added into `calculateTotal()` alongside the seat-based cost.

### Add a plan comparison table

Show a small feature comparison grid above or beside the plan cards, similar to the Compare Options patterns used in typical pricing pages.

### Persist the configuration

Save the selected plan, seats, billing cycle, and add-ons to `localStorage` so a returning visitor sees their last configuration restored.

## 🌐 Browser Compatibility

- ✅ Chrome, Firefox, Safari, Edge — all modern versions
- **Required Features:** `Set`, array methods (`filter`, `reduce`, `find`)

## 🚀 Future Enhancements

- [ ] Usage-based pricing tier (e.g. per API call or per GB)
- [ ] Feature comparison table alongside plan selection
- [ ] Persisted configuration via localStorage
- [ ] Multi-currency display with live conversion
- [ ] "Contact sales" flow for enterprise-tier custom quotes

---

**Part of the Code Odysseys Project Series** 🚀