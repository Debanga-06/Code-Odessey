/* Dataset */

const ORIGINAL = [
  { name: "Quantum",  value: 74 },
  { name: "Nebula",   value: 12 },
  { name: "Prism",    value: 91 },
  { name: "Vortex",   value: 38 },
  { name: "Aurora",   value: 55 },
  { name: "Cascade",  value: 7  },
  { name: "Zenith",   value: 83 },
  { name: "Drift",    value: 46 },
  { name: "Lumen",    value: 67 },
  { name: "Apex",     value: 29 },
];

let currentData = [...ORIGINAL];
let activeSort = "original";

const SORT_STRATEGIES = {
  asc: {
    fn: (a, b) => a.value - b.value,
    label: "Sorted by value — ascending (low → high)",
  },
  desc: {
    fn: (a, b) => b.value - a.value,
    label: "Sorted by value — descending (high → low)",
  },
  "name-asc": {
    fn: (a, b) => a.name.localeCompare(b.name),
    label: "Sorted by name — A to Z",
  },
  "name-desc": {
    fn: (a, b) => b.name.localeCompare(a.name),
    label: "Sorted by name — Z to A",
  },
  original: {
    fn: null,
    label: "Showing original order",
  },
};

const BAR_COLORS = [
  "#7F77DD", "#1D9E75", "#378ADD", "#D85A30", "#639922",
  "#BA7517", "#D4537E", "#888780", "#E24B4A", "#5DCAA5",
];

function tierClass(value) {
  if (value >= 70) return "tier-high";
  if (value >= 35) return "tier-mid";
  return "tier-low";
}
function tierLabel(value) {
  if (value >= 70) return "High";
  if (value >= 35) return "Mid";
  return "Low";
}

function render() {
  const values = currentData.map(d => d.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const avgVal = Math.round(values.reduce((s, v) => s + v, 0) / values.length);

  document.getElementById("stat-count").textContent = currentData.length;
  document.getElementById("stat-min").textContent   = minVal;
  document.getElementById("stat-max").textContent   = maxVal;
  document.getElementById("stat-avg").textContent   = avgVal;

  const list = document.getElementById("item-list");

  list.innerHTML = currentData
    .map((item, index) => {
      const pct = Math.round((item.value / maxVal) * 100);
      const originalIndex = ORIGINAL.findIndex(o => o.name === item.name);
      const color = BAR_COLORS[originalIndex % BAR_COLORS.length];

      return `
        <li>
          <div class="rank">${index + 1}</div>
          <div class="item-name">${item.name}</div>
          <div class="item-value">${item.value}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%; background: ${color};"></div>
          </div>
          <span class="tier ${tierClass(item.value)}">${tierLabel(item.value)}</span>
        </li>
      `;
    })
    .join("");
}

function sortList(type) {
  activeSort = type;

  const strategy = SORT_STRATEGIES[type];

  if (type === "original") {
    /* Restore to insertion order using a fresh copy of ORIGINAL */
    currentData = [...ORIGINAL];
  } else {
    currentData = [...currentData].sort(strategy.fn);
  }
  document.getElementById("sort-status").textContent = strategy.label;

  const buttonIds = {
    asc:          "btn-asc",
    desc:         "btn-desc",
    "name-asc":   "btn-name-asc",
    "name-desc":  "btn-name-desc",
  };

  document.querySelectorAll(".controls .btn").forEach(btn =>
    btn.classList.remove("active")
  );

  if (buttonIds[type]) {
    document.getElementById(buttonIds[type]).classList.add("active");
  }
  render();
}
render();
