const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const stepShipping = document.getElementById('stepShipping');
const stepPayment = document.getElementById('stepPayment');
const stepSuccess = document.getElementById('stepSuccess');
const toPaymentBtn = document.getElementById('toPaymentBtn');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const orderSummary = document.getElementById('orderSummary');

const PRODUCTS = [
  { id: 1, name: 'Wireless Earbuds', price: 59.99, icon: '🎧' },
  { id: 2, name: 'Smart Watch', price: 129.99, icon: '⌚' },
  { id: 3, name: 'Backpack', price: 45.00, icon: '🎒' },
  { id: 4, name: 'Desk Lamp', price: 24.99, icon: '💡' },
  { id: 5, name: 'Coffee Mug', price: 12.50, icon: '☕' },
  { id: 6, name: 'Sunglasses', price: 34.99, icon: '🕶️' }
];

let cart = [];

function renderProducts() {
  productGrid.innerHTML = '';

  PRODUCTS.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <div class="product-image">${product.icon}</div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    productGrid.appendChild(card);
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id), btn));
  });
}

function addToCart(productId, buttonEl) {
  const product = PRODUCTS.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  buttonEl.textContent = 'Added ✓';
  buttonEl.classList.add('added');
  setTimeout(() => {
    buttonEl.textContent = 'Add to Cart';
    buttonEl.classList.remove('added');
  }, 1000);

  updateCartUI();
}

function changeQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartUI() {
  const count = getCartCount();
  cartBadge.textContent = count;
  cartBadge.classList.toggle('hidden', count === 0);

  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
  } else {
    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');

      itemEl.innerHTML = `
        <span class="cart-item-icon">${item.icon}</span>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
        </div>
      `;

      cartItemsEl.appendChild(itemEl);
    });

    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        changeQuantity(Number(btn.dataset.id), Number(btn.dataset.delta));
      });
    });
  }

  cartTotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  checkoutBtn.disabled = cart.length === 0;
}

function openCart() {
  cartPanel.classList.add('open');
  overlay.classList.remove('hidden');
}

function closeCart() {
  cartPanel.classList.remove('open');
  overlay.classList.add('hidden');
}

function openCheckout() {
  closeCart();
  checkoutModal.classList.remove('hidden');
  showCheckoutStep('shipping');
}

function showCheckoutStep(step) {
  stepShipping.classList.toggle('hidden', step !== 'shipping');
  stepPayment.classList.toggle('hidden', step !== 'payment');
  stepSuccess.classList.toggle('hidden', step !== 'success');
}

function goToPayment() {
  renderOrderSummary();
  showCheckoutStep('payment');
}

function renderOrderSummary() {
  const itemLines = cart.map(item => `${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`).join('<br>');
  orderSummary.innerHTML = `${itemLines}<br><strong>Total: $${getCartTotal().toFixed(2)}</strong>`;
}

function placeOrder() {
  showCheckoutStep('success');
  cart = [];
  updateCartUI();
}

function closeCheckout() {
  checkoutModal.classList.add('hidden');
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', openCheckout);
closeCheckoutBtn.addEventListener('click', closeCheckout);
toPaymentBtn.addEventListener('click', goToPayment);
placeOrderBtn.addEventListener('click', placeOrder);
closeSuccessBtn.addEventListener('click', closeCheckout);

renderProducts();
updateCartUI();