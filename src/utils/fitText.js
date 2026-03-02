// src/utils/fitText.js

export function fitTextToCell(cell, widthRatio = 0.85, heightRatio = 0.45) {
    const span = cell.querySelector('span');
    if (!span) return;

    span.style.whiteSpace = 'nowrap';
    const maxWidth = cell.clientWidth * widthRatio;
    let size = cell.clientHeight * heightRatio;
    span.style.fontSize = size + 'px';

    while (span.scrollWidth > maxWidth && size > 6) {
        size -= 0.5;
        span.style.fontSize = size + 'px';
    }
}

export function fitTextAll(container) {
    container.querySelectorAll('.cell').forEach(cell => fitTextToCell(cell));
}