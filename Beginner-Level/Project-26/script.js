const flexWrapper = document.getElementById('flexWrapper');
const codeOutput = document.getElementById('codeOutput');
let itemCounter = 4;

const presets = {
    'navbar': {
        direction: 'row',
        wrap: 'nowrap',
        justify: 'space-between',
        alignItems: 'center',
        alignContent: 'normal',
        gap: '20',
        items: 3
    },
    'centered': {
        direction: 'row',
        wrap: 'nowrap',
        justify: 'center',
        alignItems: 'center',
        alignContent: 'normal',
        gap: '15',
        items: 1
    },
    'cards': {
        direction: 'row',
        wrap: 'wrap',
        justify: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        gap: '20',
        items: 6
    },
    'sidebar': {
        direction: 'row',
        wrap: 'nowrap',
        justify: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'normal',
        gap: '0',
        items: 2
    },
    'footer': {
        direction: 'row',
        wrap: 'wrap',
        justify: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'normal',
        gap: '30',
        items: 4
    },
    'gallery': {
        direction: 'row',
        wrap: 'wrap',
        justify: 'space-evenly',
        alignItems: 'center',
        alignContent: 'space-around',
        gap: '15',
        items: 6
    }
};

function updateFlex() {
    const direction = document.getElementById('flexDirection').value;
    const wrap = document.getElementById('flexWrap').value;
    const justify = document.getElementById('justifyContent').value;
    const alignItems = document.getElementById('alignItems').value;
    const alignContent = document.getElementById('alignContent').value;
    const gap = document.getElementById('gap').value;

    flexWrapper.style.flexDirection = direction;
    flexWrapper.style.flexWrap = wrap;
    flexWrapper.style.justifyContent = justify;
    flexWrapper.style.alignItems = alignItems;
    flexWrapper.style.alignContent = alignContent;
    flexWrapper.style.gap = gap + 'px';

    updateCode();
}

function updateCode() {
    const direction = document.getElementById('flexDirection').value;
    const wrap = document.getElementById('flexWrap').value;
    const justify = document.getElementById('justifyContent').value;
    const alignItems = document.getElementById('alignItems').value;
    const alignContent = document.getElementById('alignContent').value;
    const gap = document.getElementById('gap').value;

    let code = `.flex-container {
display: flex;`;

    if (direction !== 'row') code += `\n  flex-direction: ${direction};`;
    if (wrap !== 'nowrap') code += `\n  flex-wrap: ${wrap};`;
    if (justify !== 'flex-start') code += `\n  justify-content: ${justify};`;
    if (alignItems !== 'stretch') code += `\n  align-items: ${alignItems};`;
    if (alignContent !== 'normal') code += `\n  align-content: ${alignContent};`;
    if (gap !== '0') code += `\n  gap: ${gap}px;`;

    code += '\n}';
    codeOutput.textContent = code;
}

function applyPreset(presetName) {
    const preset = presets[presetName];
    document.getElementById('flexDirection').value = preset.direction;
    document.getElementById('flexWrap').value = preset.wrap;
    document.getElementById('justifyContent').value = preset.justify;
    document.getElementById('alignItems').value = preset.alignItems;
    document.getElementById('alignContent').value = preset.alignContent;
    document.getElementById('gap').value = preset.gap;

    // Adjust item count
    const currentItems = flexWrapper.children.length;
    if (preset.items > currentItems) {
        for (let i = currentItems; i < preset.items; i++) {
            itemCounter++;
            addItemElement(itemCounter);
        }
    } else if (preset.items < currentItems) {
        while (flexWrapper.children.length > preset.items) {
            flexWrapper.removeChild(flexWrapper.lastChild);
        }
    }

    updateFlex();
}

function resetFlex() {
    document.getElementById('flexDirection').value = 'row';
    document.getElementById('flexWrap').value = 'nowrap';
    document.getElementById('justifyContent').value = 'flex-start';
    document.getElementById('alignItems').value = 'stretch';
    document.getElementById('alignContent').value = 'normal';
    document.getElementById('gap').value = '15';

    flexWrapper.innerHTML = '';
    itemCounter = 0;
    for (let i = 1; i <= 4; i++) {
        itemCounter++;
        addItemElement(i);
    }

    updateFlex();
}

function addItem() {
    itemCounter++;
    addItemElement(itemCounter);
    updateFlex();
}

function addItemElement(number) {
    const item = document.createElement('div');
    item.className = 'flex-item';
    item.innerHTML = `
        <div class="item-number">${number}</div>
        <div class="item-size">flex: 1</div>
        <button class="remove-item" onclick="removeItem(this)">×</button>
    `;
    flexWrapper.appendChild(item);
}

function removeItem(btn) {
    if (flexWrapper.children.length > 1) {
        btn.parentElement.remove();
        updateFlex();
    } else {
        showToast('At least one item is required!');
    }
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

function toggleAxis() {
    const container = document.getElementById('flexContainer');
    const btn = document.getElementById('axisBtn');
    container.classList.toggle('axis-indicator');
    btn.classList.toggle('active');
}

updateFlex();
