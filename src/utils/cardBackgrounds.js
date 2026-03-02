// Centralized cards image registry.
// Any file added under src/images/cards/** will be available by key.
// Example key: "resonant/card-01" -> src/images/cards/resonant/card-01.jpg

const modules = import.meta.glob('../images/cards/**/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    import: 'default',
});

function normalizeKey(path) {
    return path
        .replace('../images/cards/', '')
        .replace(/\.(png|jpe?g|webp|avif)$/i, '');
}

export const CARD_BACKGROUNDS = Object.freeze(
    Object.fromEntries(
        Object.entries(modules).map(([path, url]) => [normalizeKey(path), url])
    )
);

export function getCardBackground(key, fallbackKey = 'shared/card-hidden') {
    return CARD_BACKGROUNDS[key] || CARD_BACKGROUNDS[fallbackKey] || '';
}

export function listCardBackgroundKeys() {
    return Object.keys(CARD_BACKGROUNDS).sort();
}
