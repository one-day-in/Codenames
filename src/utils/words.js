// utils/words.js
export function normalizeWords(words) {
  return words
    .map(word => String(word || '').trim())
    .filter(word => word.length > 0);
}

export function uniqueWords(words) {
  return [...new Set(words)];
}

export function ensureEnoughWords(words, minCount) {
  if (words.length < minCount) {
    throw new Error(`Not enough words: need ${minCount}, have ${words.length}`);
  }
  return words;
}