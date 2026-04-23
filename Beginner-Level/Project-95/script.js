// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
let draggedId   = null;   // which card is being dragged
let dragSource  = null;   // 'source' | zone id
let dropCount   = 0;
let trashCount  = 0;
let placedCount = 0;

// Card data registry — keyed by data-id
const cardRegistry = {};
document.querySelectorAll('.drag-card').forEach(card => {
  cardRegistry[card.dataset.id] = {
    id:   card.dataset.id,
    icon: card.dataset.icon,
    type: card.dataset.type,
    name: card.dataset.name,
  };
});

// ─────────────────────────────────────────
// DRAG START — fired on the draggable element
// ─────────────────────────────────────────
document.querySelectorAll('.drag-card').forEach(card => {
  card.addEventListener('dragstart', function(e) {
    draggedId  = this.dataset.id;
    dragSource = 'source';
    e.dataTransfer.setData('text/plain', draggedId); // store id in transfer
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('dragging');
    log('dragstart', `card #${draggedId}`, '→ grabbed');
  });

  card.addEventListener('dragend', function() {
    this.classList.remove('dragging');
    // Clear all drag-over highlights
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
    log('dragend', `card #${draggedId}`, '→ released');
  });
});

// ─────────────────────────────────────────
// DROP ZONES — setup dragover + drop
// ─────────────────────────────────────────
document.querySelectorAll('.drop-zone').forEach(zone => {

  // dragenter — when cursor enters a zone
  zone.addEventListener('dragenter', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
    log('dragenter', this.dataset.zone, '→ entered zone');
  });

  // dragover — fires continuously while hovering
  zone.addEventListener('dragover', function(e) {
    e.preventDefault(); // REQUIRED: without this, drop is blocked
    e.dataTransfer.dropEffect = 'move';
  });

  // dragleave — cursor left the zone
  zone.addEventListener('dragleave', function(e) {
    // Only remove if we truly left (not entering a child)
    if (!this.contains(e.relatedTarget)) {
      this.classList.remove('drag-over');
    }
  });

  // drop — the actual drop event
  zone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    const id   = e.dataTransfer.getData('text/plain');
    const data = cardRegistry[id];
    if (!data) return;

    const zoneName = this.dataset.zone;
    log('drop', zoneName, `→ received "${data.name}"`);

    if (this.id === 'zone-trash') {
      handleTrash(id);
    } else {
      handleZoneDrop(this, id, data);
    }

    dropCount++;
    document.querySelector('#drop-counter span').textContent = dropCount;
  });
});

// ─────────────────────────────────────────
// DROP INTO A KANBAN COLUMN
// ─────────────────────────────────────────
function handleZoneDrop(zone, id, data) {
  const zoneKey  = zone.id.replace('zone-', '');
  const body     = document.getElementById(`body-${zoneKey}`);
  const empty    = document.getElementById(`empty-${zoneKey}`);

  // Hide empty placeholder
  if (empty) empty.style.display = 'none';

  // Create dropped card element
  const el = document.createElement('div');
  el.className = 'dropped-card';
  el.dataset.type = data.type;
  el.dataset.id   = id;
  el.innerHTML = `
    <span class="dropped-icon">${data.icon}</span>
    <span>${data.name}</span>
    <button class="dropped-remove" onclick="removeDropped(this, '${id}', '${zoneKey}')" title="Remove">✕</button>
  `;
  body.appendChild(el);

  // Remove from source list if it's there
  const sourceCard = document.querySelector(`#source-list [data-id="${id}"]`);
  if (sourceCard) {
    sourceCard.remove();
    updateSourceCount(-1);
  }

  // Flash success
  zone.classList.add('drop-success');
  setTimeout(() => zone.classList.remove('drop-success'), 500);

  // Update badge
  placedCount++;
  updateBadge(zoneKey);
  updateCounters();
}

// ─────────────────────────────────────────
// DROP INTO TRASH
// ─────────────────────────────────────────
function handleTrash(id) {
  // Remove from source
  const sourceCard = document.querySelector(`#source-list [data-id="${id}"]`);
  if (sourceCard) {
    sourceCard.style.transition = 'opacity 0.2s, transform 0.2s';
    sourceCard.style.opacity = '0';
    sourceCard.style.transform = 'scale(0.8)';
    setTimeout(() => { sourceCard.remove(); updateSourceCount(-1); }, 200);
  }

  // Remove from any zone
  document.querySelectorAll(`.dropped-card[data-id="${id}"]`).forEach(card => {
    const zoneKey = card.closest('.drop-zone').id.replace('zone-', '');
    card.remove();
    placedCount = Math.max(0, placedCount - 1);
    updateBadge(zoneKey);
    checkEmpty(zoneKey);
  });

  trashCount++;
  const trashNum = document.getElementById('trash-num');
  trashNum.style.display = 'block';
  trashNum.textContent   = `${trashCount} removed`;
  document.getElementById('trash-badge').textContent = trashCount;

  updateCounters();
  log('trash', `card #${id}`, '→ deleted');
}

// ─────────────────────────────────────────
// REMOVE BUTTON INSIDE DROPPED CARD
// ─────────────────────────────────────────
function removeDropped(btn, id, zoneKey) {
  const card = btn.closest('.dropped-card');
  card.style.transition = 'opacity 0.2s, transform 0.2s';
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9)';
  setTimeout(() => {
    card.remove();
    placedCount = Math.max(0, placedCount - 1);
    updateBadge(zoneKey);
    checkEmpty(zoneKey);

    // Restore to source list
    restoreToSource(id);
    updateCounters();
    log('restore', `card #${id}`, '→ returned to source');
  }, 200);
}

// ─────────────────────────────────────────
// RESTORE CARD TO SOURCE LIST
// ─────────────────────────────────────────
function restoreToSource(id) {
  const data = cardRegistry[id];
  if (!data) return;
  const el = document.createElement('div');
  el.className = 'drag-card';
  el.draggable = true;
  el.dataset.id   = id;
  el.dataset.icon = data.icon;
  el.dataset.type = data.type;
  el.dataset.name = data.name;
  el.innerHTML = `
    <span class="card-icon">${data.icon}</span>
    <div class="card-info">
      <div class="card-name">${data.name}</div>
      <div class="card-type">${data.type}</div>
    </div>
    <span class="drag-handle">⠿</span>
  `;
  attachDragEvents(el);
  document.getElementById('source-list').appendChild(el);
  updateSourceCount(+1);
}

// ─────────────────────────────────────────
// ATTACH DRAG EVENTS TO DYNAMICALLY CREATED CARDS
// ─────────────────────────────────────────
function attachDragEvents(card) {
  card.addEventListener('dragstart', function(e) {
    draggedId  = this.dataset.id;
    dragSource = 'source';
    e.dataTransfer.setData('text/plain', draggedId);
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('dragging');
    log('dragstart', `card #${draggedId}`, '→ grabbed');
  });
  card.addEventListener('dragend', function() {
    this.classList.remove('dragging');
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
  });
}

// ─────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────
function updateBadge(zoneKey) {
  const body  = document.getElementById(`body-${zoneKey}`);
  const count = body ? body.querySelectorAll('.dropped-card').length : 0;
  const badge = document.getElementById(`badge-${zoneKey}`);
  if (badge) badge.textContent = count;
}

function checkEmpty(zoneKey) {
  const body  = document.getElementById(`body-${zoneKey}`);
  const empty = document.getElementById(`empty-${zoneKey}`);
  if (!body || !empty) return;
  empty.style.display = body.querySelectorAll('.dropped-card').length === 0 ? 'flex' : 'none';
}

let sourceCount = 8;
function updateSourceCount(delta) {
  sourceCount = Math.max(0, sourceCount + delta);
  document.getElementById('avail-count').textContent  = sourceCount;
  document.getElementById('source-badge').textContent = sourceCount;
}

function updateCounters() {
  document.getElementById('placed-count').textContent = placedCount;
  document.getElementById('trash-count').textContent  = trashCount;
}

// ─────────────────────────────────────────
// EVENT LOG
// ─────────────────────────────────────────
function log(event, target, detail) {
  const container = document.getElementById('log-entries');
  // Remove placeholder
  const placeholder = container.querySelector('.log-placeholder');
  if (placeholder) placeholder.remove();

  const now  = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = `
    <span class="log-time">${time}</span>
    <span class="log-event">${event}</span>
    <span class="log-detail">${target} ${detail}</span>
  `;
  container.prepend(entry); // newest at top

  // Keep max 20 entries
  const all = container.querySelectorAll('.log-entry');
  if (all.length > 20) all[all.length - 1].remove();
}

function clearLog() {
  const container = document.getElementById('log-entries');
  container.innerHTML = '<div class="log-placeholder">// log cleared...</div>';
}