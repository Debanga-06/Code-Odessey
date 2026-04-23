// ─────────────────────────────────────────
// LIVE DATE in topbar
// ─────────────────────────────────────────
function updateDate() {
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('live-date').textContent = new Date().toLocaleDateString('en-US', opts);
}
updateDate();

// ─────────────────────────────────────────
// SPARKLINES — generate mini bar charts for each stat card
// ─────────────────────────────────────────
function buildSparkline(containerId, values, color) {
  const max = Math.max(...values);
  const container = document.getElementById(containerId);
  if (!container) return;
  values.forEach((v, i) => {
    const bar = document.createElement('div');
    bar.className = 'spark-bar' + (i === values.length - 1 ? ' active' : '');
    bar.style.height = Math.max(4, (v / max) * 100) + '%';
    container.appendChild(bar);
  });
}

buildSparkline('spark-revenue', [40, 55, 48, 62, 58, 70, 65, 80, 72, 84]);
buildSparkline('spark-users',   [55, 60, 52, 65, 70, 68, 75, 80, 78, 85]);
buildSparkline('spark-orders',  [80, 72, 85, 78, 70, 65, 60, 68, 58, 62]);
buildSparkline('spark-conv',    [30, 35, 28, 40, 38, 42, 36, 45, 40, 48]);

// ─────────────────────────────────────────
// BAR CHART — Revenue Overview
// ─────────────────────────────────────────
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
const current  = [52, 68, 61, 74, 70, 84, 78, 90, 82, 84];
const previous = [44, 56, 50, 63, 58, 72, 65, 79, 70, 72];

function buildChart() {
  const container = document.getElementById('chart-bars');
  if (!container) return;
  container.innerHTML = '';
  const maxVal = Math.max(...current, ...previous);

  months.forEach((m, i) => {
    const col = document.createElement('div');
    col.className = 'chart-col';

    const wrap = document.createElement('div');
    wrap.className = 'chart-bar-wrap';
    wrap.style.display = 'flex'; wrap.style.gap = '2px';

    const b1 = document.createElement('div');
    b1.className = 'chart-bar bar-primary';
    b1.style.height = `${(current[i] / maxVal) * 100}%`;
    b1.style.flex   = '1';
    b1.setAttribute('data-val', `$${current[i]}k`);

    const b2 = document.createElement('div');
    b2.className = 'chart-bar bar-secondary';
    b2.style.height = `${(previous[i] / maxVal) * 100}%`;
    b2.style.flex   = '1';
    b2.setAttribute('data-val', `$${previous[i]}k`);

    wrap.appendChild(b1);
    wrap.appendChild(b2);

    const lbl = document.createElement('div');
    lbl.className   = 'chart-label';
    lbl.textContent = m;

    col.appendChild(wrap);
    col.appendChild(lbl);
    container.appendChild(col);
  });
}
buildChart();

// ─────────────────────────────────────────
// PERIOD SELECTOR — updates stats with new mock data
// ─────────────────────────────────────────
const periodData = {
  '7':  { revenue: '$18,420', users: '840',   orders: '96',  conv: '3.1%' },
  '30': { revenue: '$84,240', users: '2,841', orders: '438', conv: '3.6%' },
  '90': { revenue: '$241,080', users: '7,200', orders: '1,240', conv: '4.1%' },
};

function updatePeriod(val) {
  const d = periodData[val] || periodData['30'];
  // Animate the number change
  animateValue('stat-revenue', d.revenue);
  animateValue('stat-users',   d.users);
  animateValue('stat-orders',  d.orders);
  animateValue('stat-conv',    d.conv);
}

function animateValue(id, newVal) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transition = 'opacity 0.2s, transform 0.2s';
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(4px)';
  setTimeout(() => {
    el.textContent = newVal;
    el.style.opacity   = '1';
    el.style.transform = 'translateY(0)';
  }, 200);
}

// ─────────────────────────────────────────
// SIDEBAR NAVIGATION — highlight active link
// ─────────────────────────────────────────
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ─────────────────────────────────────────
// NOTIFICATION BUTTON — simple toggle
// ─────────────────────────────────────────
document.querySelector('.notif-btn').addEventListener('click', function() {
  const dot = this.querySelector('.notif-dot');
  if (dot) { dot.style.display = dot.style.display === 'none' ? 'block' : 'none'; }
});