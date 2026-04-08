/* ── DATA ── */
const posts = [
  { id:1,  title:'CSS Grid vs Flexbox: The Definitive Guide for 2025', excerpt:'Two layout systems, countless use cases. Here\'s exactly when to reach for Grid vs Flexbox — with visual examples and real code patterns.', cat:'css', catLabel:'CSS', tags:['css-grid','flexbox','layout','responsive'], emoji:'📐', bg:'linear-gradient(135deg,#e34c26,#f06529)', date:'Apr 12, 2025', readTime:'6 min', views:4200 },
  { id:2,  title:'JavaScript DOM Manipulation: The Modern Way', excerpt:'Forget jQuery. Here\'s how to write fast, clean DOM manipulation with vanilla JS — covering selectors, events, and the IntersectionObserver API.', cat:'javascript', catLabel:'JavaScript', tags:['dom','vanilla-js','es6','events'], emoji:'⚡', bg:'linear-gradient(135deg,#f7df1e,#f0ad00)', date:'Apr 6, 2025', readTime:'8 min', views:3800 },
  { id:3,  title:'Building a Real Portfolio: 10 Things Beginners Get Wrong', excerpt:'Your portfolio isn\'t just a showcase — it\'s a conversation starter. Here are the mistakes I see on 90% of junior portfolios and how to fix them.', cat:'career', catLabel:'Career', tags:['portfolio','tips','beginners','jobs'], emoji:'🚀', bg:'linear-gradient(135deg,#7c3aed,#a78bfa)', date:'Mar 30, 2025', readTime:'5 min', views:2700 },
  { id:4,  title:'The 10 CSS Properties You\'re Probably Underusing', excerpt:'clamp(), aspect-ratio, gap, scroll-margin — these modern CSS properties will save you hundreds of lines of media queries and JavaScript hacks.', cat:'css', catLabel:'CSS', tags:['css','modern','clamp','aspect-ratio'], emoji:'🎨', bg:'linear-gradient(135deg,#264de4,#4a90e2)', date:'Mar 24, 2025', readTime:'7 min', views:3100 },
  { id:5,  title:'How I Plan and Track 300+ Projects Without Burning Out', excerpt:'The system I use to stay consistent building one project a day — from choosing what to build, to time-boxing, to celebrating small wins.', cat:'tips', catLabel:'Tips', tags:['productivity','projects','habits','consistency'], emoji:'📋', bg:'linear-gradient(135deg,#2d7a4f,#34d399)', date:'Mar 18, 2025', readTime:'4 min', views:2100 },
  { id:6,  title:'Understanding the Box Model Once and For All', excerpt:'margins, padding, borders, content — the box model confused me for months. Here\'s the explanation I wish I had at the start.', cat:'css', catLabel:'CSS', tags:['css','box-model','fundamentals','beginner'], emoji:'📦', bg:'linear-gradient(135deg,#d97706,#fbbf24)', date:'Mar 10, 2025', readTime:'5 min', views:1900 },
  { id:7,  title:'5 VS Code Extensions That Changed How I Write HTML & CSS', excerpt:'Not the generic list you\'ve seen everywhere. These are the five tools I actually use every day that have the biggest impact on my workflow.', cat:'tools', catLabel:'Tools', tags:['vscode','tools','workflow','extensions'], emoji:'🔧', bg:'linear-gradient(135deg,#0d7377,#14a085)', date:'Mar 4, 2025', readTime:'3 min', views:1600 },
  { id:8,  title:'Responsive Design Without Media Queries: The clamp() Method', excerpt:'A 2025 approach to fluid typography and spacing that adapts smoothly to any screen size using just one CSS function.', cat:'webdev', catLabel:'Web Dev', tags:['responsive','clamp','css','mobile-first'], emoji:'📱', bg:'linear-gradient(135deg,#1e3264,#503590)', date:'Feb 26, 2025', readTime:'6 min', views:2400 },
  { id:9,  title:'localStorage vs sessionStorage: When and Why', excerpt:'Both store data in the browser, but they behave very differently. Here\'s a clear breakdown with real use cases from my projects.', cat:'javascript', catLabel:'JavaScript', tags:['localstorage','browser','javascript','state'], emoji:'💾', bg:'linear-gradient(135deg,#e91429,#ff6437)', date:'Feb 18, 2025', readTime:'4 min', views:1450 },
  { id:10, title:'Writing HTML That Actually Makes Sense: Semantic Markup', excerpt:'Div soup is easy to write and hard to maintain. Learn the semantic elements that make your markup readable, accessible, and SEO-friendly.', cat:'webdev', catLabel:'Web Dev', tags:['html','semantic','accessibility','seo'], emoji:'🌐', bg:'linear-gradient(135deg,#e34c26,#264de4)', date:'Feb 10, 2025', readTime:'5 min', views:1800 },
  { id:11, title:'Git Commit Messages That Don\'t Make Future-You Cry', excerpt:'A simple, practical guide to writing clear commit messages. No complex branching strategies — just the fundamentals that matter daily.', cat:'tips', catLabel:'Tips', tags:['git','workflow','best-practices','tips'], emoji:'🐙', bg:'linear-gradient(135deg,#333,#555)', date:'Feb 2, 2025', readTime:'3 min', views:1200 },
  { id:12, title:'Building a REST API Consumer with Vanilla JS Fetch', excerpt:'Step-by-step: fetching data from a public API, handling errors gracefully, showing loading states, and rendering dynamic content.', cat:'webdev', catLabel:'Web Dev', tags:['fetch','api','async','javascript'], emoji:'🔗', bg:'linear-gradient(135deg,#0f4020,#1db954)', date:'Jan 25, 2025', readTime:'9 min', views:2200 },
];

const allTags = [...new Set(posts.flatMap(p => p.tags))];
let activeCategory = 'all';
let activeTag = null;
let searchQuery = '';
let currentView = 'grid';
let visibleCount = 6;

/* ── TAG CLOUD ── */
function buildTagCloud() {
  document.getElementById('tagCloud').innerHTML = allTags.map(t =>
    `<button class="tag-pill" onclick="filterByTag('${t}')">#${t}</button>`
  ).join('');
}

/* ── FILTER LOGIC ── */
function getFilteredPosts() {
  return posts.filter(p => {
    const catOk  = activeCategory === 'all' || p.cat === activeCategory;
    const tagOk  = !activeTag || p.tags.includes(activeTag);
    const query  = searchQuery.toLowerCase();
    const searchOk = !query ||
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.tags.some(t => t.includes(query)) ||
      p.catLabel.toLowerCase().includes(query);
    return catOk && tagOk && searchOk;
  });
}

/* ── HIGHLIGHT TEXT ── */
function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<mark class="highlight">$1</mark>');
}

/* ── RENDER POSTS ── */
function renderPosts() {
  const filtered = getFilteredPosts();
  const visible  = filtered.slice(0, visibleCount);
  const grid     = document.getElementById('postsGrid');
  const empty    = document.getElementById('emptyState');
  const lmw      = document.getElementById('loadMoreWrap');

  grid.innerHTML = '';
  empty.classList.toggle('visible', filtered.length === 0);
  lmw.style.display = filtered.length > visibleCount ? 'flex' : 'none';

  visible.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `post-card ${currentView === 'list' ? 'list-card' : 'grid-card'} reveal`;
    card.style.transitionDelay = (i * 0.05) + 's';

    const titleHtml   = highlight(p.title, searchQuery);
    const excerptHtml = highlight(p.excerpt, searchQuery);

    if (currentView === 'list') {
      card.innerHTML = `
        <div class="card-body-main">
          <div class="card-cats"><span class="card-cat cat-${p.cat}">${p.catLabel}</span></div>
          <div class="card-title">${titleHtml}</div>
          <div class="card-excerpt">${excerptHtml}</div>
          <div class="card-footer-row">
            <div class="card-tags">${p.tags.slice(0,3).map(t=>`<span class="card-tag" onclick="event.stopPropagation();filterByTag('${t}')">#${t}</span>`).join('')}</div>
            <div class="card-meta-row">${p.readTime}<span class="sep">·</span>${p.date}</div>
          </div>
        </div>
        <div class="card-thumb" style="background:${p.bg};border-radius:8px;min-width:100px;height:80px;">${p.emoji}</div>`;
    } else {
      card.innerHTML = `
        <div class="card-thumb" style="background:${p.bg};">${p.emoji}</div>
        <div class="card-body">
          <div class="card-cats"><span class="card-cat cat-${p.cat}">${p.catLabel}</span></div>
          <div class="card-title">${titleHtml}</div>
          <div class="card-excerpt">${excerptHtml}</div>
          <div class="card-footer-row">
            <div class="card-tags">${p.tags.slice(0,2).map(t=>`<span class="card-tag" onclick="event.stopPropagation();filterByTag('${t}')">#${t}</span>`).join('')}</div>
            <div class="card-meta-row">${p.readTime}<span class="sep">·</span>${p.date}</div>
          </div>
        </div>`;
    }
    grid.appendChild(card);
    revealObserver.observe(card);
  });

  // Update section label
  const label = searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'all' ? 'Latest Articles' : posts.find(p=>p.cat===activeCategory)?.catLabel + ' Articles';
  document.getElementById('sectionLabel').textContent = label;
}

/* ── SET CATEGORY ── */
function setCategory(cat) {
  activeCategory = cat;
  activeTag = null;
  visibleCount = 6;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
  document.querySelectorAll('.tag-pill').forEach(t => t.classList.remove('active'));

  // Show/hide featured
  document.getElementById('featuredPost').style.display = (cat === 'all' && !searchQuery) ? '' : 'none';
  renderPosts();
}

function setCatFromSidebar(cat) {
  setCategory(cat);
  document.querySelector('.main-layout').scrollIntoView({behavior:'smooth'});
}

/* ── FILTER BY TAG ── */
function filterByTag(tag) {
  activeTag = activeTag === tag ? null : tag;
  document.querySelectorAll('.tag-pill').forEach(t => t.classList.toggle('active', t.textContent === '#'+tag));
  renderPosts();
}

/* ── SEARCH ── */
let searchDebounce;
function handleSearch(val) {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = val.trim();
    const header = document.getElementById('searchHeader');
    const clear  = document.getElementById('searchClear');
    document.getElementById('searchQuery').textContent = `"${searchQuery}"`;
    header.classList.toggle('visible', searchQuery.length > 0);
    clear.style.display = searchQuery.length > 0 ? 'block' : 'none';
    document.getElementById('featuredPost').style.display = searchQuery ? 'none' : '';
    visibleCount = 6;
    renderPosts();
  }, 180);
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  searchQuery = '';
  document.getElementById('searchHeader').classList.remove('visible');
  document.getElementById('searchClear').style.display = 'none';
  document.getElementById('featuredPost').style.display = '';
  renderPosts();
}

/* ── VIEW TOGGLE ── */
function setView(v) {
  currentView = v;
  const grid = document.getElementById('postsGrid');
  grid.className = v === 'grid' ? 'grid-view' : '';
  document.getElementById('vList').classList.toggle('active', v === 'list');
  document.getElementById('vGrid').classList.toggle('active', v === 'grid');
  renderPosts();
}

/* ── LOAD MORE ── */
function loadMore() {
  const btn = document.getElementById('loadMoreBtn');
  btn.classList.add('loading');
  document.getElementById('loadMoreText').textContent = 'Loading...';
  setTimeout(() => {
    visibleCount += 6;
    renderPosts();
    btn.classList.remove('loading');
    document.getElementById('loadMoreText').textContent = 'Load more articles';
  }, 600);
}

/* ── NEWSLETTER ── */
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email.includes('@')) { alert('Please enter a valid email.'); return; }
  document.querySelector('.newsletter-form').innerHTML = '<p style="font-size:14px;color:rgba(255,255,255,0.7);text-align:center;">🎉 You\'re subscribed! Welcome aboard.</p>';
}

/* ── CATEGORY BAR CLICKS ── */
document.getElementById('categoryBar').addEventListener('click', e => {
  const tab = e.target.closest('.cat-tab');
  if (tab) setCategory(tab.dataset.cat);
});

/* ── PROGRESS BAR ── */
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
  document.getElementById('progress-bar').style.width = (scrolled * 100) + '%';
  document.getElementById('backTop').classList.toggle('visible', doc.scrollTop > 400);
});

/* ── REVEAL OBSERVER ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }});
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── INIT ── */
buildTagCloud();
renderPosts();
