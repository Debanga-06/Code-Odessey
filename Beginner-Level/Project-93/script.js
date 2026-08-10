const searchInput = document.getElementById('searchInput');
const categoryChips = document.getElementById('categoryChips');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');
const resetBtn = document.getElementById('resetBtn');
const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');

const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 25 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 80 },
  { id: 3, name: 'USB-C Hub', category: 'Electronics', price: 35 },
  { id: 4, name: 'Cotton T-Shirt', category: 'Clothing', price: 15 },
  { id: 5, name: 'Denim Jacket', category: 'Clothing', price: 60 },
  { id: 6, name: 'Running Shoes', category: 'Clothing', price: 90 },
  { id: 7, name: 'Coffee Maker', category: 'Home', price: 45 },
  { id: 8, name: 'Table Lamp', category: 'Home', price: 30 },
  { id: 9, name: 'Throw Pillow', category: 'Home', price: 12 },
  { id: 10, name: 'Yoga Mat', category: 'Fitness', price: 20 },
  { id: 11, name: 'Dumbbell Set', category: 'Fitness', price: 55 },
  { id: 12, name: 'Water Bottle', category: 'Fitness', price: 10 }
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

let activeCategory = 'All';
let currentSearch = '';
let maxPrice = 200;
let currentSort = 'default';

function buildCategoryChips() {
  categoryChips.innerHTML = '';

  CATEGORIES.forEach(category => {
    const chip = document.createElement('button');
    chip.classList.add('chip');
    if (category === activeCategory) chip.classList.add('active');
    chip.textContent = category;
    chip.addEventListener('click', () => {
      activeCategory = category;
      buildCategoryChips();
      applyFilters();
    });
    categoryChips.appendChild(chip);
  });
}

function applyFilters() {
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
    const matchesPrice = product.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  filtered = sortProducts(filtered);
  renderProducts(filtered);
}

function sortProducts(products) {
  const sorted = [...products];

  if (currentSort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'name-asc') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
}

function renderProducts(products) {
  productGrid.innerHTML = '';
  resultCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;

  if (products.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <div class="product-category">${product.category}</div>
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price}</div>
    `;

    productGrid.appendChild(card);
  });
}

function resetFilters() {
  activeCategory = 'All';
  currentSearch = '';
  maxPrice = 200;
  currentSort = 'default';

  searchInput.value = '';
  priceRange.value = 200;
  priceValue.textContent = 200;
  sortSelect.value = 'default';

  buildCategoryChips();
  applyFilters();
}

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim();
  applyFilters();
});

priceRange.addEventListener('input', () => {
  maxPrice = Number(priceRange.value);
  priceValue.textContent = maxPrice;
  applyFilters();
});

sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  applyFilters();
});

resetBtn.addEventListener('click', resetFilters);

buildCategoryChips();
applyFilters();