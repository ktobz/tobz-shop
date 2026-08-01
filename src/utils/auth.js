export const getAuthRedirectUrl = () => `${window.location.origin}/auth/callback`;

export const getUserDisplayName = (user) => {
    if (!user) return '';

    if (user.displayName) {
        return user.displayName;
    }

    const metadata = user.user_metadata ?? {};
    const name =
        metadata.full_name ||
        metadata.name ||
        metadata.display_name ||
        '';

    if (name) {
        return name;
    }

    if (user.email) {
        return user.email.split('@')[0];
    }

    return 'User';
};

export const isSupabaseConfigured = () =>
    Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

export const isMockAuthEnabled = () =>
    import.meta.env.VITE_USE_MOCK_AUTH === 'true';
