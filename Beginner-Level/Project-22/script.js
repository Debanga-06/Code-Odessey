const preview = document.getElementById('preview');
const codeOutput = document.getElementById('codeOutput');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color1Text = document.getElementById('color1Text');
const color2Text = document.getElementById('color2Text');
const angleSlider = document.getElementById('angle');
const angleValue = document.getElementById('angleValue');
const typeRadios = document.querySelectorAll('input[name="type"]');

function updateGradient() {
    const c1 = color1.value;
    const c2 = color2.value;
    const angle = angleSlider.value;
    const type = document.querySelector('input[name="type"]:checked').value;

    let gradient;
    if (type === 'linear') {
        gradient = `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`;
    } else if (type === 'radial') {
        gradient = `radial-gradient(circle, ${c1} 0%, ${c2} 100%)`;
    } else {
        gradient = `conic-gradient(from ${angle}deg, ${c1} 0%, ${c2} 100%)`;
    }

    preview.style.background = gradient;
    codeOutput.textContent = `background: ${gradient};`;
}

color1.addEventListener('input', (e) => {
    color1Text.value = e.target.value;
    updateGradient();
});

color2.addEventListener('input', (e) => {
    color2Text.value = e.target.value;
    updateGradient();
});

color1Text.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        color1.value = e.target.value;
        updateGradient();
    }
});

color2Text.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        color2.value = e.target.value;
        updateGradient();
    }
});

angleSlider.addEventListener('input', (e) => {
    angleValue.textContent = e.target.value + '°';
    updateGradient();
});

typeRadios.forEach(radio => {
    radio.addEventListener('change', updateGradient);
});

function copyCode() {
    const code = codeOutput.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function randomGradient() {
    const newColor1 = randomColor();
    const newColor2 = randomColor();
    const newAngle = Math.floor(Math.random() * 361);

    color1.value = newColor1;
    color2.value = newColor2;
    color1Text.value = newColor1;
    color2Text.value = newColor2;
    angleSlider.value = newAngle;
    angleValue.textContent = newAngle + '°';

    updateGradient();
}

function resetGradient() {
    color1.value = '#667eea';
    color2.value = '#764ba2';
    color1Text.value = '#667eea';
    color2Text.value = '#764ba2';
    angleSlider.value = 135;
    angleValue.textContent = '135°';
    document.querySelector('input[name="type"][value="linear"]').checked = true;
    updateGradient();
}

updateGradient();