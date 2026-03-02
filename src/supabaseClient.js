import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FALLBACK_SUPABASE_URL = 'https://example.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'public-anon-key-placeholder';

const hasSupabaseEnv = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!hasSupabaseEnv) {
    console.warn(
        'Missing Supabase env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
        'App runs in limited mode until env vars are configured.'
    );
}

export const supabase = createClient(
    hasSupabaseEnv ? SUPABASE_URL : FALLBACK_SUPABASE_URL,
    hasSupabaseEnv ? SUPABASE_ANON_KEY : FALLBACK_SUPABASE_ANON_KEY,
    {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
});
