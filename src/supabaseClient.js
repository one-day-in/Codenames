import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FALLBACK_SUPABASE_URL =
    (typeof window !== 'undefined' && window.location?.origin)
        ? window.location.origin
        : 'http://localhost';
const FALLBACK_SUPABASE_ANON_KEY = 'public-anon-key-placeholder';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!isSupabaseConfigured) {
    console.warn(
        'Missing Supabase env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
        'App runs in limited mode until env vars are configured.'
    );
}

export const supabase = createClient(
    isSupabaseConfigured ? SUPABASE_URL : FALLBACK_SUPABASE_URL,
    isSupabaseConfigured ? SUPABASE_ANON_KEY : FALLBACK_SUPABASE_ANON_KEY,
    {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});
