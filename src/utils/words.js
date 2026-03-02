// src/utils/words.js
import { supabase } from '../supabaseClient.js';

const CACHE_TTL_MS = 30 * 60 * 1000;
const MIN_WORDS = 25;
const WORDS_FETCH_LIMIT = 350;
const WORDS_TIMEOUT_MS = 10000;
const memoryCache = new Map();

function cacheKey(language) {
    return `nw_words_cache_${language}`;
}

function readWordsCache(language) {
    const cached = memoryCache.get(language);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
        return cached.words;
    }

    try {
        const raw = localStorage.getItem(cacheKey(language));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.ts || !Array.isArray(parsed?.words)) return null;
        if (Date.now() - parsed.ts >= CACHE_TTL_MS) return null;
        memoryCache.set(language, { ts: parsed.ts, words: parsed.words });
        return parsed.words;
    } catch {
        return null;
    }
}

function saveWordsCache(language, words) {
    const payload = { ts: Date.now(), words };
    memoryCache.set(language, payload);
    try {
        localStorage.setItem(cacheKey(language), JSON.stringify(payload));
    } catch {
        // Ignore storage quota/private mode errors.
    }
}

function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Words request timeout')), timeoutMs)
        ),
    ]);
}

export async function loadWords(language = 'uk', { force = false } = {}) {
    if (!force) {
        const cached = readWordsCache(language);
        if (cached && cached.length >= MIN_WORDS) return cached;
    }

    const request = supabase
        .from('words')
        .select('word')
        .eq('language', language)
        .eq('active', true)
        .limit(WORDS_FETCH_LIMIT);

    const { data, error } = await withTimeout(request, WORDS_TIMEOUT_MS);
    const words = (data || []).map(item => item.word).filter(Boolean);

    if (error || words.length < MIN_WORDS) {
        throw new Error(`Cannot load words (language: ${language})`);
    }

    saveWordsCache(language, words);
    return words;
}
