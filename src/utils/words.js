// src/utils/words.js
import { supabase } from '../supabaseClient.js';

export async function loadWords(language = 'uk') {
    const { data, error } = await supabase
        .from('words')
        .select('word')
        .eq('language', language)
        .eq('active', true);

    if (error || !data || data.length < 25) {
        throw new Error(`Cannot load words (language: ${language})`);
    }

    return data.map(d => d.word);
}
