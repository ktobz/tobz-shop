import { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import { supabase } from '../config/supabase';

export const AuthContext = createContext();

const enrichUser = (apiUser) => {
    if (!apiUser) {
        return null;
    }

    return {
        ...apiUser,
        displayName: apiUser.username || apiUser.email.split('@')[0],
        user_metadata: {
            full_name: apiUser.username,
            name: apiUser.username,
            avatar_url: null,
        },
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setSessionUser = useCallback((nextUser) => {
        setUser(enrichUser(nextUser));
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (authAPI.isAuthenticated()) {
                    const profile = await authAPI.getProfile();
                    setSessionUser(profile.user);
                }
            } catch (error) {
                console.error('Failed to restore auth session', error);
                authAPI.logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [setSessionUser]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.access_token) {
                try {
                    const data = await authAPI.googleLogin(session.access_token);
                    setSessionUser(data.user);
                } catch (err) {
                    console.error('Failed to exchange Supabase session:', err);
                }
            }
        });

        return () => { subscription?.unsubscribe(); };
    }, [setSessionUser]);

    const login = async (email, password) => {
        const data = await authAPI.login(email, password);
        setSessionUser(data.user);
        return enrichUser(data.user);
    };

    const signup = async (username, email, password) => {
        const data = await authAPI.register(username, email, password);
        setSessionUser(data.user);
        return enrichUser(data.user);
    };

    const loginWithGoogle = async (accessToken) => {
        const data = await authAPI.googleLogin(accessToken);
        setSessionUser(data.user);
        return enrichUser(data.user);
    };

    const logout = async () => {
        authAPI.logout();
        setSessionUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            loginWithGoogle,
            loading,
            isMockAuth: false,
            isConfigured: true,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
