import { createClient } from '@supabase/supabase-js';
import { isMockAuthEnabled, isSupabaseConfigured } from '../utils/auth';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!isSupabaseConfigured() && !isMockAuthEnabled()) {
    console.warn(
        'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, ' +
        'or enable VITE_USE_MOCK_AUTH=true for local development.'
    );
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            flowType: 'implicit',
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true,
            storage: window.localStorage,
        },
    }
);
