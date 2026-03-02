// src/utils/renderCell.js

/* ─── Внутрішній генератор модифікатора ролі ────────
   Повертає клас виду:
     cell--nightmare
     cell--anomaly-3
     cell--resonant-2
     cell--dissonant-7
──────────────────────────────────────────────────── */
function getRoleVariantClass(cell) {
    if (cell.role === 'nightmare') {
        return 'cell--nightmare';
    }
    if (cell.role === 'anomaly') {
        const v = cell.imageVariant ?? cell.anomalyVariant ?? 1;
        return `cell--anomaly-${v}`;
    }
    // resonant | dissonant
    const v = cell.imageVariant ?? 1;
    return `cell--${cell.role}-${v}`;
}

/* ─── GAME + WALKER ──────────────────────────────────
   Однаковий вигляд на всіх трьох екранах: game, walker-R, walker-D
   Картки: прихована (cell--hidden) → відкрита (cell--revealed + роль)
──────────────────────────────────────────────────── */
export function getGameCellClass(cell) {
    const classes = ['cell'];

    if (!cell.revealed) {
        classes.push('cell--hidden');
        return classes.join(' ');
    }

    classes.push('cell--revealed');
    classes.push(getRoleVariantClass(cell));

    return classes.join(' ');
}

/* ─── GUIDE ──────────────────────────────────────────
   Інший вигляд: роль завжди видима у «guide-стилі» (своє зображення).
   cell--guide → хук для CSS/зображень, відмінних від game/walker.
   Відгадана картка додатково отримує cell--revealed → dimmed у CSS.
──────────────────────────────────────────────────── */
export function getGuideCellClass(cell) {
    const classes = ['cell', 'cell--guide'];

    if (cell.revealed) {
        classes.push('cell--revealed');
    }

    classes.push(getRoleVariantClass(cell));

    return classes.join(' ');
}
