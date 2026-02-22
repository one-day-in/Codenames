// src/utils/fitText.js

/**
 * Підбирає розмір шрифту для span всередині cell
 * так щоб текст завжди влазив в одну стрічку без переносу і обрізання
 */
export function fitTextToCell(cell, widthRatio = 0.85, heightRatio = 0.45) {
    const span = cell.querySelector('span');
    if (!span) return;

    // Забороняємо перенос рядка
    span.style.whiteSpace = 'nowrap';

    const maxWidth = cell.clientWidth * widthRatio;
    let size = cell.clientHeight * heightRatio;

    span.style.fontSize = size + 'px';

    while (span.scrollWidth > maxWidth && size > 6) {
        size -= 0.5;
        span.style.fontSize = size + 'px';
    }
}

/**
 * Підбирає шрифт для всіх клітинок в контейнері
 */
export function fitTextAll(container) {
    container.querySelectorAll('.cell, .grid__cell').forEach(cell => fitTextToCell(cell));
}