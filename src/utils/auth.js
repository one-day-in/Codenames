// src/utils/auth.js — Supabase auth helpers
import { supabase, isSupabaseConfigured } from '../supabaseClient.js';

export async function getUser() {
    if (!isSupabaseConfigured) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function signInWithGoogle() {
    if (!isSupabaseConfigured) {
        window.alert('Google auth is not configured for this deployment yet.');
        return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + window.location.pathname }
    });
    if (error) console.error('Auth error:', error);
}

export async function signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
}

// Знаходить або створює кімнату для хоста
// Повертає { id, guest_token, hasActiveGame }
export async function getOrCreateRoomForUser(userId) {
    if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured.');
    }
    const { data: existing } = await supabase
        .from('rooms')
        .select('id, guest_token, state')
        .eq('owner_id', userId)
        .maybeSingle();

    if (existing) {
        return {
            id:            existing.id,
            guest_token:   existing.guest_token,
            hasActiveGame: !!existing.state,
        };
    }

    const id = generateId();
    const { data } = await supabase
        .from('rooms')
        .insert({ id, owner_id: userId })
        .select('id, guest_token')
        .single();

    return { id: data.id, guest_token: data.guest_token, hasActiveGame: false };
}

function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID().slice(0, 8);
    }
    return Math.random().toString(36).slice(2, 10);
}
