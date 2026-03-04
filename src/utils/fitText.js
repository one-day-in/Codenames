// src/utils/fitText.js

const DEFAULT_OPTIONS = {
    widthRatio: 0.85,
    heightRatio: 0.45,
    minSize: 6,
    step: 0.5,
    noWrap: true,
};

export function fitTextToBox(box, textEl, options = {}) {
    if (!box || !textEl) return;

    const {
        widthRatio,
        heightRatio,
        minSize,
        step,
        noWrap,
    } = { ...DEFAULT_OPTIONS, ...options };

    if (noWrap) textEl.style.whiteSpace = 'nowrap';

    const maxWidth = box.clientWidth * widthRatio;
    let size = box.clientHeight * heightRatio;
    textEl.style.fontSize = size + 'px';

    while (textEl.scrollWidth > maxWidth && size > minSize) {
        size -= step;
        textEl.style.fontSize = size + 'px';
    }
}

export function fitTextBySelector(container, selector, options = {}) {
    if (!container) return;
    container.querySelectorAll(selector).forEach(el => fitTextToBox(el, el, options));
}

export function fitTextToCell(cell, widthRatio = 0.85, heightRatio = 0.45) {
    const span = cell.querySelector('span');
    if (!span) return;
    fitTextToBox(cell, span, { widthRatio, heightRatio });
}

export function fitTextAll(container) {
    container.querySelectorAll('.cell').forEach(cell => fitTextToCell(cell));
}
