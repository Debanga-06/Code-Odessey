const categoryTabs = document.getElementById('categoryTabs');
const menuSections = document.getElementById('menuSections');

const MENU_DATA = [
  {
    category: 'Starters',
    items: [
      { name: 'Crispy Corn Fritters', desc: 'Sweet corn, herbs, light batter, fried golden', price: 180, veg: true },
      { name: 'Chicken Wings', desc: 'Tossed in smoky BBQ glaze', price: 260, veg: false },
      { name: 'Paneer Tikka', desc: 'Char-grilled cottage cheese, tandoori spices', price: 220, veg: true, tag: 'Chef\'s pick' }
    ]
  },
  {
    category: 'Main Course',
    items: [
      { name: 'Butter Chicken', desc: 'Creamy tomato gravy, tender chicken pieces', price: 340, veg: false, tag: 'Bestseller' },
      { name: 'Paneer Butter Masala', desc: 'Rich tomato-cashew gravy, soft paneer cubes', price: 300, veg: true },
      { name: 'Veg Fried Rice', desc: 'Wok-tossed rice, mixed vegetables, soy', price: 220, veg: true },
      { name: 'Grilled Fish', desc: 'Lemon butter sauce, seasonal vegetables', price: 380, veg: false }
    ]
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Chocolate Lava Cake', desc: 'Warm molten center, vanilla ice cream', price: 190, veg: true },
      { name: 'Gulab Jamun', desc: 'Served warm with rose syrup', price: 120, veg: true }
    ]
  },
  {
    category: 'Beverages',
    items: [
      { name: 'Fresh Lime Soda', desc: 'Sweet, salted, or mixed', price: 90, veg: true },
      { name: 'Cold Coffee', desc: 'Blended with vanilla ice cream', price: 150, veg: true },
      { name: 'Masala Chai', desc: 'Traditional spiced tea', price: 60, veg: true }
    ]
  }
];

let activeCategory = 'All';

function getCategoryNames() {
  return ['All', ...MENU_DATA.map(section => section.category)];
}

function buildTabs() {
  categoryTabs.innerHTML = '';

  getCategoryNames().forEach(category => {
    const tab = document.createElement('button');
    tab.classList.add('tab-btn');
    if (category === activeCategory) tab.classList.add('active');
    tab.textContent = category;

    tab.addEventListener('click', () => {
      activeCategory = category;
      buildTabs();
      renderMenu();
    });

    categoryTabs.appendChild(tab);
  });
}

function renderMenu() {
  menuSections.innerHTML = '';

  const sectionsToShow = activeCategory === 'All'
    ? MENU_DATA
    : MENU_DATA.filter(section => section.category === activeCategory);

  sectionsToShow.forEach(section => {
    const sectionEl = document.createElement('div');
    sectionEl.classList.add('menu-section');

    const title = document.createElement('h2');
    title.classList.add('section-title');
    title.textContent = section.category;
    sectionEl.appendChild(title);

    section.items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('item-card');

      card.innerHTML = `
        <div class="item-info">
          <div class="item-name-row">
            <span class="veg-badge ${item.veg ? '' : 'non-veg'}"></span>
            <span class="item-name">${item.name}</span>
          </div>
          <p class="item-desc">${item.desc}</p>
          ${item.tag ? `<span class="item-tag">${item.tag}</span>` : ''}
        </div>
        <span class="item-price">₹${item.price}</span>
      `;

      sectionEl.appendChild(card);
    });

    menuSections.appendChild(sectionEl);
  });
}

buildTabs();
renderMenu();