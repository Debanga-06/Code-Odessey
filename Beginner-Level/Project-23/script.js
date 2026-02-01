let palette = [];
let lockedColors = new Set();
let allLocked = false;

const schemeDescriptions = {
    monochromatic: {
        title: "Monochromatic",
        desc: "Uses variations in lightness and saturation of a single color. Perfect for creating elegant and cohesive designs."
    },
    analogous: {
        title: "Analogous",
        desc: "Uses colors that are adjacent to each other on the color wheel. Creates harmonious and serene color schemes."
    },
    complementary: {
        title: "Complementary",
        desc: "Uses colors opposite each other on the color wheel. Creates high contrast and vibrant designs."
    },
    triadic: {
        title: "Triadic",
        desc: "Uses three colors equally spaced on the color wheel. Creates vibrant yet balanced color schemes."
    },
    tetradic: {
        title: "Tetradic (Square)",
        desc: "Uses four colors equally spaced on the color wheel. Offers plenty of color variation while maintaining harmony."
    },
    "split-complementary": {
        title: "Split Complementary",
        desc: "Uses a base color and the two colors adjacent to its complement. Offers high contrast with more nuance."
    }
};

document.getElementById('colorScheme').addEventListener('change', updateSchemeInfo);

function updateSchemeInfo() {
    const scheme = document.getElementById('colorScheme').value;
    const info = schemeDescriptions[scheme];
    document.getElementById('schemeInfo').innerHTML = `
        <h3>${info.title}</h3>
        <p>${info.desc}</p>
    `;
}

function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return [h * 360, s * 100, l * 100];
}

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r, g, b;

    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function hexToRGB(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function generatePalette() {
    const baseColor = document.getElementById('baseColor').value;
    const scheme = document.getElementById('colorScheme').value;
    const [h, s, l] = hexToHSL(baseColor);

    let colors = [];

    switch (scheme) {
        case 'monochromatic':
            colors = [
                HSLToHex(h, s, Math.max(10, l - 30)),
                HSLToHex(h, s, Math.max(20, l - 15)),
                baseColor,
                HSLToHex(h, s, Math.min(80, l + 15)),
                HSLToHex(h, s, Math.min(90, l + 30))
            ];
            break;
        case 'analogous':
            colors = [
                HSLToHex((h - 60 + 360) % 360, s, l),
                HSLToHex((h - 30 + 360) % 360, s, l),
                baseColor,
                HSLToHex((h + 30) % 360, s, l),
                HSLToHex((h + 60) % 360, s, l)
            ];
            break;
        case 'complementary':
            colors = [
                HSLToHex(h, s, Math.max(20, l - 20)),
                HSLToHex(h, s, l),
                HSLToHex(h, s, Math.min(80, l + 20)),
                HSLToHex((h + 180) % 360, s, l),
                HSLToHex((h + 180) % 360, s, Math.min(80, l + 20))
            ];
            break;
        case 'triadic':
            colors = [
                HSLToHex(h, s, l),
                HSLToHex((h + 120) % 360, s, l),
                HSLToHex((h + 240) % 360, s, l),
                HSLToHex(h, s, Math.min(80, l + 20)),
                HSLToHex((h + 120) % 360, s, Math.min(80, l + 20))
            ];
            break;
        case 'tetradic':
            colors = [
                baseColor,
                HSLToHex((h + 90) % 360, s, l),
                HSLToHex((h + 180) % 360, s, l),
                HSLToHex((h + 270) % 360, s, l),
                HSLToHex(h, s, Math.min(80, l + 20))
            ];
            break;
        case 'split-complementary':
            colors = [
                HSLToHex(h, s, Math.max(20, l - 20)),
                baseColor,
                HSLToHex(h, s, Math.min(80, l + 20)),
                HSLToHex((h + 150) % 360, s, l),
                HSLToHex((h + 210) % 360, s, l)
            ];
            break;
    }

    palette = colors.map((color, index) => {
        if (lockedColors.has(index) && palette[index]) {
            return palette[index];
        }
        return color;
    });

    displayPalette();
    updateExportCode();
}

function displayPalette() {
    const container = document.getElementById('paletteContainer');
    container.innerHTML = '';

    palette.forEach((color, index) => {
        const card = document.createElement('div');
        card.className = 'color-card';
        
        const [h, s, l] = hexToHSL(color);
        const rgb = hexToRGB(color);
        
        card.innerHTML = `
            <div class="color-display" style="background-color: ${color};" onclick="copyToClipboard('${color}', 'Color ${color}')">
                <button class="lock-icon ${lockedColors.has(index) ? 'locked' : ''}" onclick="event.stopPropagation(); toggleLock(${index})">
                    ${lockedColors.has(index) ? '🔒' : '🔓'}
                </button>
            </div>
            <div class="color-info">
                <div class="color-name">Color ${index + 1}</div>
                <div class="color-values">
                    <div class="color-value" onclick="copyToClipboard('${color}', 'HEX')">
                        <span>HEX: ${color}</span>
                        <span class="copy-icon">📋</span>
                    </div>
                    <div class="color-value" onclick="copyToClipboard('${rgb}', 'RGB')">
                        <span>RGB: ${rgb}</span>
                        <span class="copy-icon">📋</span>
                    </div>
                    <div class="color-value" onclick="copyToClipboard('hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)', 'HSL')">
                        <span>HSL: ${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%</span>
                        <span class="copy-icon">📋</span>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function toggleLock(index) {
    if (lockedColors.has(index)) {
        lockedColors.delete(index);
    } else {
        lockedColors.add(index);
    }
    displayPalette();
}

function toggleLockAll() {
    allLocked = !allLocked;
    if (allLocked) {
        palette.forEach((_, index) => lockedColors.add(index));
    } else {
        lockedColors.clear();
    }
    displayPalette();
}

function copyToClipboard(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied!`);
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

function toggleExport() {
    const panel = document.getElementById('exportPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function updateExportCode() {
    const cssCode = `:root {\n${palette.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')}\n}`;
    const jsCode = `const colorPalette = ${JSON.stringify(palette, null, 2)};`;
    const jsonCode = JSON.stringify({ palette: palette, scheme: document.getElementById('colorScheme').value }, null, 2);

    document.getElementById('cssCode').textContent = cssCode;
    document.getElementById('jsCode').textContent = jsCode;
    document.getElementById('jsonCode').textContent = jsonCode;
}

function copyCode(elementId) {
    const code = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!');
    });
}

generatePalette();