const planOptions = document.getElementById('planOptions');
const seatsRange = document.getElementById('seatsRange');
const seatsValue = document.getElementById('seatsValue');
const billingButtons = document.querySelectorAll('.billing-btn');
const addonList = document.getElementById('addonList');
const promoInput = document.getElementById('promoInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoMsg = document.getElementById('promoMsg');
const summaryLines = document.getElementById('summaryLines');
const summaryTotal = document.getElementById('summaryTotal');
const billingNote = document.getElementById('billingNote');

const PLANS = [
  { id: 'starter', name: 'Starter', desc: 'For small teams getting started', pricePerSeat: 4 },
  { id: 'pro', name: 'Pro', desc: 'Advanced tools and priority support', pricePerSeat: 9 },
  { id: 'enterprise', name: 'Enterprise', desc: 'Custom limits and dedicated support', pricePerSeat: 18 }
];

const ADDONS = [
  { id: 'analytics', name: 'Advanced Analytics', price: 15 },
  { id: 'storage', name: 'Extra Storage (500GB)', price: 10 },
  { id: 'sso', name: 'Single Sign-On (SSO)', price: 25 },
  { id: 'support', name: 'Priority Support', price: 20 }
];

const PROMO_CODES = {
  'SAVE10': 0.10,
  'WELCOME15': 0.15
};

const YEARLY_DISCOUNT = 0.20;

let selectedPlanId = 'pro';
let selectedAddonIds = new Set();
let billingCycle = 'monthly';
let appliedPromo = null;

function buildPlanOptions() {
  planOptions.innerHTML = '';

  PLANS.forEach(plan => {
    const card = document.createElement('div');
    card.classList.add('plan-card');
    if (plan.id === selectedPlanId) card.classList.add('selected');

    card.innerHTML = `
      <div>
        <div class="plan-name">${plan.name}</div>
        <div class="plan-desc">${plan.desc}</div>
      </div>
      <span class="plan-price">$${plan.pricePerSeat}/seat</span>
    `;

    card.addEventListener('click', () => {
      selectedPlanId = plan.id;
      buildPlanOptions();
      calculateTotal();
    });

    planOptions.appendChild(card);
  });
}

function buildAddonList() {
  addonList.innerHTML = '';

  ADDONS.forEach(addon => {
    const item = document.createElement('div');
    item.classList.add('addon-item');
    if (selectedAddonIds.has(addon.id)) item.classList.add('selected');

    item.innerHTML = `
      <span>${addon.name}</span>
      <span class="addon-price">+$${addon.price}/mo</span>
    `;

    item.addEventListener('click', () => {
      if (selectedAddonIds.has(addon.id)) {
        selectedAddonIds.delete(addon.id);
      } else {
        selectedAddonIds.add(addon.id);
      }
      buildAddonList();
      calculateTotal();
    });

    addonList.appendChild(item);
  });
}

function selectBillingCycle(cycle, button) {
  billingCycle = cycle;
  billingButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  calculateTotal();
}

function applyPromoCode() {
  const code = promoInput.value.trim().toUpperCase();

  if (code.length === 0) {
    promoMsg.textContent = 'Enter a promo code first';
    promoMsg.className = 'promo-msg error';
    return;
  }

  if (PROMO_CODES[code]) {
    appliedPromo = { code, discount: PROMO_CODES[code] };
    promoMsg.textContent = `Applied: ${Math.round(PROMO_CODES[code] * 100)}% off`;
    promoMsg.className = 'promo-msg success';
  } else {
    appliedPromo = null;
    promoMsg.textContent = 'Invalid promo code';
    promoMsg.className = 'promo-msg error';
  }

  calculateTotal();
}

function calculateTotal() {
  const plan = PLANS.find(p => p.id === selectedPlanId);
  const seats = Number(seatsRange.value);

  const planCost = plan.pricePerSeat * seats;

  const addonCost = ADDONS
    .filter(addon => selectedAddonIds.has(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  let subtotal = planCost + addonCost;

  const yearlyDiscountAmount = billingCycle === 'yearly' ? subtotal * YEARLY_DISCOUNT : 0;
  subtotal -= yearlyDiscountAmount;

  const promoDiscountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  subtotal -= promoDiscountAmount;

  renderSummary(planCost, addonCost, yearlyDiscountAmount, promoDiscountAmount, subtotal, seats);
}

function renderSummary(planCost, addonCost, yearlyDiscount, promoDiscount, total, seats) {
  summaryLines.innerHTML = '';

  const plan = PLANS.find(p => p.id === selectedPlanId);

  addSummaryLine(`${plan.name} plan (${seats} seat${seats !== 1 ? 's' : ''})`, planCost);

  if (addonCost > 0) {
    addSummaryLine('Add-ons', addonCost);
  }

  if (yearlyDiscount > 0) {
    addSummaryLine('Yearly discount (20%)', -yearlyDiscount, true);
  }

  if (promoDiscount > 0) {
    addSummaryLine(`Promo (${appliedPromo.code})`, -promoDiscount, true);
  }

  summaryTotal.textContent = `$${total.toFixed(2)}`;
  billingNote.textContent = billingCycle === 'yearly'
    ? 'Billed annually'
    : 'Billed monthly';
}

function addSummaryLine(label, amount, isDiscount = false) {
  const line = document.createElement('div');
  line.classList.add('summary-line');
  if (isDiscount) line.classList.add('discount');

  const sign = amount < 0 ? '-' : '';
  line.innerHTML = `<span>${label}</span><span>${sign}$${Math.abs(amount).toFixed(2)}</span>`;

  summaryLines.appendChild(line);
}

seatsRange.addEventListener('input', () => {
  seatsValue.textContent = seatsRange.value;
  calculateTotal();
});

billingButtons.forEach(button => {
  button.addEventListener('click', () => selectBillingCycle(button.dataset.cycle, button));
});

applyPromoBtn.addEventListener('click', applyPromoCode);

buildPlanOptions();
buildAddonList();
calculateTotal();