const gridWrapper = document.getElementById('gridWrapper');
const codeOutput = document.getElementById('codeOutput');

const presets = {
    'basic': {
        columns: '1fr 1fr',
        rows: 'auto auto',
        gap: 20,
        items: 4,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'normal',
        alignContent: 'normal'
    },
    'blog': {
        columns: '2fr 1fr',
        rows: 'auto 1fr auto',
        gap: 20,
        items: 5,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'normal',
        alignContent: 'normal'
    },
    'dashboard': {
        columns: 'repeat(4, 1fr)',
        rows: 'auto 1fr 1fr',
        gap: 15,
        items: 9,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'normal',
        alignContent: 'normal'
    },
    'holy-grail': {
        columns: '200px 1fr 200px',
        rows: 'auto 1fr auto',
        gap: 20,
        items: 5,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'normal',
        alignContent: 'normal'
    },
    'masonry': {
        columns: 'repeat(3, 1fr)',
        rows: 'auto auto auto',
        gap: 15,
        items: 9,
        justifyItems: 'stretch',
        alignItems: 'start',
        justifyContent: 'normal',
        alignContent: 'start'
    },
    'sidebar': {
        columns: '250px 1fr',
        rows: '100%',
        gap: 0,
        items: 2,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'normal',
        alignContent: 'normal'
    }
};

function updateGrid() {
    const columns = document.getElementById('columns').value;
    const rows = document.getElementById('rows').value;
    const gap = document.getElementById('gap').value;
    const justifyItems = document.getElementById('justifyItems').value;
    const alignItems = document.getElementById('alignItems').value;
    const justifyContent = document.getElementById('justifyContent').value;
    const alignContent = document.getElementById('alignContent').value;
    const itemCount = parseInt(document.getElementById('itemCount').value);

    gridWrapper.style.gridTemplateColumns = columns;
    gridWrapper.style.gridTemplateRows = rows;
    gridWrapper.style.gap = gap + 'px';
    gridWrapper.style.justifyItems = justifyItems;
    gridWrapper.style.alignItems = alignItems;
    gridWrapper.style.justifyContent = justifyContent;
    gridWrapper.style.alignContent = alignContent;

    const currentItems = gridWrapper.children.length;
    if (itemCount > currentItems) {
        for (let i = currentItems; i < itemCount; i++) {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.textContent = i + 1;
            gridWrapper.appendChild(item);
        }
    } else if (itemCount < currentItems) {
        while (gridWrapper.children.length > itemCount) {
            gridWrapper.removeChild(gridWrapper.lastChild);
        }
    }

    updateCode();
}

function updateCode() {
    const columns = document.getElementById('columns').value;
    const rows = document.getElementById('rows').value;
    const gap = document.getElementById('gap').value;
    const justifyItems = document.getElementById('justifyItems').value;
    const alignItems = document.getElementById('alignItems').value;
    const justifyContent = document.getElementById('justifyContent').value;
    const alignContent = document.getElementById('alignContent').value;

    let code = `.grid-container {
display: grid;
grid-template-columns: ${columns};
grid-template-rows: ${rows};
gap: ${gap}px;`;

    if (justifyItems !== 'stretch') {
        code += `\n  justify-items: ${justifyItems};`;
    }
    if (alignItems !== 'stretch') {
        code += `\n  align-items: ${alignItems};`;
    }
    if (justifyContent !== 'normal') {
        code += `\n  justify-content: ${justifyContent};`;
    }
    if (alignContent !== 'normal') {
        code += `\n  align-content: ${alignContent};`;
    }

    code += '\n}';
    codeOutput.textContent = code;
}

function applyPreset(presetName) {
    const preset = presets[presetName];
    document.getElementById('columns').value = preset.columns;
    document.getElementById('rows').value = preset.rows;
    document.getElementById('gap').value = preset.gap;
    document.getElementById('itemCount').value = preset.items;
    document.getElementById('justifyItems').value = preset.justifyItems;
    document.getElementById('alignItems').value = preset.alignItems;
    document.getElementById('justifyContent').value = preset.justifyContent;
    document.getElementById('alignContent').value = preset.alignContent;
    updateGrid();
}

function resetGrid() {
    document.getElementById('columns').value = '1fr 1fr 1fr';
    document.getElementById('rows').value = 'auto auto';
    document.getElementById('gap').value = 15;
    document.getElementById('itemCount').value = 6;
    document.getElementById('justifyItems').value = 'stretch';
    document.getElementById('alignItems').value = 'stretch';
    document.getElementById('justifyContent').value = 'normal';
    document.getElementById('alignContent').value = 'normal';
    updateGrid();
}

function copyCode() {
    const code = codeOutput.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard! ✓');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function toggleGridLines() {
    const container = document.getElementById('gridContainer');
    const btn = document.getElementById('gridLinesBtn');
    container.classList.toggle('grid-lines');
    container.classList.toggle('active');
    btn.classList.toggle('active');
}

updateGrid();