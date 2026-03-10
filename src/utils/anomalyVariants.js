// src/utils/anomalyVariants.js
// Shared mapping for anomaly image variants.

export const ANOMALY_VARIANT_KEYS = Object.freeze([
    'block',
    'block-2',
    'blur',
    'glitch',
    'hidenightmare',
    'reset',
    'speak',
]);

export function getAnomalyVariantKey(cell) {
    const raw = Number(cell?.imageVariant ?? cell?.anomalyVariant ?? 1);
    const safeIndex = Number.isFinite(raw) ? Math.max(1, raw) : 1;
    return ANOMALY_VARIANT_KEYS[(safeIndex - 1) % ANOMALY_VARIANT_KEYS.length];
}

