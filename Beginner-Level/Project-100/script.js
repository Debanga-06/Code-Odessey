const CAT_COLOR = {
    'Layout & UI':    { accent: '#00ff88', badge: 'rgba(0,255,136,0.15)',    border: 'rgba(0,255,136,0.5)' },
    'CSS & Animations':{ accent: '#a78bfa', badge: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.5)' },
    'Forms':          { accent: '#ff6b35', badge: 'rgba(255,107,53,0.15)',   border: 'rgba(255,107,53,0.5)' },
    'JavaScript':     { accent: '#00d4ff', badge: 'rgba(0,212,255,0.15)',    border: 'rgba(0,212,255,0.5)' },
  };
  
  const projects = [
    { id:'001', name:'Personal Portfolio Website', desc:'HTML structure, CSS styling, responsive design fundamentals', cat:'Layout & UI', tags:['HTML','CSS','Responsive'], icon:'🌐', done:false },
    { id:'002', name:'Resume Builder (Static)', desc:'Forms, layout design, print CSS for clean printouts', cat:'Forms', tags:['HTML','CSS','Print CSS'], icon:'📄', done:false },
    { id:'003', name:'Landing Page', desc:'Hero sections, CTA buttons, modern design principles', cat:'Layout & UI', tags:['HTML','CSS','Design'], icon:'🚀', done:false },
    { id:'004', name:'Restaurant Website', desc:'Multi-page layout, image optimization, navigation', cat:'Layout & UI', tags:['HTML','CSS','Multi-page'], icon:'🍽️', done:false },
    { id:'005', name:'Coffee Shop Website', desc:'CSS Grid, menu layouts, strong typography choices', cat:'Layout & UI', tags:['CSS Grid','Typography','Layout'], icon:'☕', done:false },
    { id:'006', name:'Product Showcase Page', desc:'Product cards, hover effects, CSS transitions', cat:'CSS & Animations', tags:['CSS','Hover','Cards'], icon:'🛍️', done:false },
    { id:'007', name:'Blog Homepage', desc:'Article cards, sidebar layout, readability design', cat:'Layout & UI', tags:['CSS','Grid','Sidebar'], icon:'✍️', done:false },
    { id:'008', name:'Pricing Table', desc:'Table design, comparison layouts, call-to-action buttons', cat:'Layout & UI', tags:['HTML','CSS','UI'], icon:'💰', done:false },
    { id:'009', name:'Image Gallery', desc:'CSS Grid layout, lightbox effect, thumbnail previews', cat:'CSS & Animations', tags:['CSS Grid','JS','Lightbox'], icon:'🖼️', done:false },
    { id:'010', name:'Login Page UI', desc:'Form design, input styling, basic validation UX', cat:'Forms', tags:['HTML','CSS','Forms'], icon:'🔐', done:false },
    { id:'011', name:'Signup Page UI', desc:'Multi-field forms, password fields, user experience flow', cat:'Forms', tags:['HTML','CSS','UX'], icon:'📝', done:false },
    { id:'012', name:'Contact Form', desc:'Form elements, textarea, submit handling, validation', cat:'Forms', tags:['HTML','JS','Validation'], icon:'📬', done:false },
    { id:'013', name:'About Us Page', desc:'Team sections, company storytelling, image+text layouts', cat:'Layout & UI', tags:['HTML','CSS','Grid'], icon:'👥', done:false },
    { id:'014', name:'FAQ Page', desc:'Accordion-style layout, JS toggling, content structure', cat:'JavaScript', tags:['JS','DOM','Accordion'], icon:'❓', done:false },
    { id:'015', name:'Testimonials Section', desc:'Card layout, blockquotes, customer review design', cat:'Layout & UI', tags:['HTML','CSS','Cards'], icon:'💬', done:false },
    { id:'016', name:'Navbar Variations', desc:'Navigation design, dropdown menus, hamburger mobile nav', cat:'CSS & Animations', tags:['CSS','JS','Mobile Nav'], icon:'🧭', done:false },
    { id:'017', name:'Footer Designs', desc:'Footer layouts, link columns, social icon rows', cat:'Layout & UI', tags:['HTML','CSS','Flexbox'], icon:'🔗', done:false },
    { id:'018', name:'Card Layout Gallery', desc:'Various card designs, shadows, border styles', cat:'Layout & UI', tags:['CSS','Cards','Shadows'], icon:'🃏', done:false },
    { id:'019', name:'Hero Section Designs', desc:'Full-width headers, background images, overlay CTAs', cat:'CSS & Animations', tags:['CSS','Design','Animation'], icon:'🦸', done:false },
    { id:'020', name:'Button Hover Effects', desc:'CSS transitions, keyframe animations, micro-interactions', cat:'CSS & Animations', tags:['CSS','Transitions','Keyframes'], icon:'🖱️', done:false },
    { id:'021', name:'CSS Loader Collection', desc:'Spinners, progress bars, keyframe loading animations', cat:'CSS & Animations', tags:['CSS','Keyframes','Animation'], icon:'⏳', done:false },
    { id:'022', name:'Gradient Generator', desc:'Color theory, CSS gradients, copy-to-clipboard tool', cat:'JavaScript', tags:['JS','CSS','Color Tool'], icon:'🎨', done:false },
    { id:'023', name:'Color Palette Generator', desc:'Color schemes, palette UI, design system basics', cat:'JavaScript', tags:['JS','Color','DOM'], icon:'🌈', done:false },
    { id:'024', name:'Typography Showcase', desc:'Font pairing, text hierarchy, readability design', cat:'CSS & Animations', tags:['CSS','Typography','Design'], icon:'🅰️', done:false },
    { id:'025', name:'CSS Grid Playground', desc:'Grid template areas, alignment, gap, responsive columns', cat:'CSS & Animations', tags:['CSS Grid','Layout','Interactive'], icon:'📐', done:false },
    { id:'026', name:'Flexbox Layout Builder', desc:'Flexbox alignment, distribution, direction properties', cat:'CSS & Animations', tags:['Flexbox','CSS','Layout'], icon:'📦', done:false },
    { id:'027', name:'Mobile Responsive Page', desc:'Media queries, breakpoints, mobile-first workflow', cat:'Layout & UI', tags:['CSS','Responsive','Media Queries'], icon:'📱', done:false },
    { id:'028', name:'Dark Mode Toggle', desc:'CSS variables, theme switching, localStorage persistence', cat:'JavaScript', tags:['JS','CSS Vars','LocalStorage'], icon:'🌙', done:false },
    { id:'029', name:'404 Error Page', desc:'Creative error UI, redirect handling, fun design', cat:'Layout & UI', tags:['HTML','CSS','Creative'], icon:'🚧', done:false },
    { id:'030', name:'Coming Soon Page', desc:'Countdown timer, email capture, launch hype design', cat:'JavaScript', tags:['JS','Timer','Forms'], icon:'⏰', done:false },
  ];
  
  let activeFilter = 'all';
  let activeView   = 'grid';
  
  function setFilter(cat, el) {
    activeFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    render();
  }
  
  function setView(v) {
    activeView = v;
    const grid = document.getElementById('grid');
    grid.classList.toggle('list-view', v === 'list');
    document.getElementById('vgrid').classList.toggle('active', v === 'grid');
    document.getElementById('vlist').classList.toggle('active', v === 'list');
  }
  
  function render() {
    const q = document.getElementById('search').value.toLowerCase().trim();
    const visible = projects.filter(p => {
      const matchCat = activeFilter === 'all' || p.cat === activeFilter;
      const matchQ   = !q || p.name.toLowerCase().includes(q)
                         || p.desc.toLowerCase().includes(q)
                         || p.tags.some(t => t.toLowerCase().includes(q))
                         || p.cat.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  
    const countTxt = visible.length === projects.length
      ? `${projects.length} items found`
      : `${visible.length} of ${projects.length} items`;
    document.getElementById('count-txt').textContent = countTxt;
  
    const grid = document.getElementById('grid');
    const noRes = document.getElementById('no-results');
  
    if (visible.length === 0) {
      grid.innerHTML = '';
      noRes.style.display = 'block';
      return;
    }
    noRes.style.display = 'none';
  
    grid.innerHTML = visible.map((p, i) => cardHTML(p, i)).join('');
  }
  
  function cardHTML(p, i) {
    const c = CAT_COLOR[p.cat];
    const ghUrl = `https://github.com/Debanga-06/Code-Odessey`;
    const delay = Math.min(i * 30, 300);
  
    if (activeView === 'list') {
      return `
      <div class="card" style="--card-accent:${c.accent}; animation-delay:${delay}ms;">
        <div class="card-side">
          <div class="card-num">#${p.id}</div>
          <div style="font-size:18px">${p.icon}</div>
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        </div>
        <div class="card-actions">
          <span class="cat-badge" style="background:${c.badge};border-color:${c.border};color:${c.accent};">${p.cat.split(' ')[0].toUpperCase()}</span>
          <a class="gh-btn" href="${ghUrl}" target="_blank">↗ VIEW</a>
        </div>
      </div>`;
    }
  
    return `
    <div class="card" style="--card-accent:${c.accent}; animation-delay:${delay}ms;">
      <div class="card-num">[ ${p.id} ]</div>
      <div class="card-top">
        <span class="card-icon">${p.icon}</span>
        <span class="cat-badge" style="background:${c.badge};border-color:${c.border};color:${c.accent};">${p.cat.split(' ')[0].toUpperCase()}</span>
      </div>
      <h3>${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="card-footer">
        <div class="status">
          <span class="status-led ${p.done ? 'active' : ''}"></span>
          ${p.done ? 'COMPLETE' : 'PENDING'}
        </div>
        <a class="gh-btn" href="${ghUrl}" target="_blank">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GITHUB
        </a>
      </div>
    </div>`;
  }
  
  render();