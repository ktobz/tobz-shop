import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const savedUser = localStorage.getItem('1shopapp_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login
        const mockUser = { email, name: email.split('@')[0], id: '123' };
        setUser(mockUser);
        localStorage.setItem('1shopapp_user', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
    };

    const signup = (name, email, password) => {
        // Mock signup
        const mockUser = { name, email, id: Date.now().toString() };
        setUser(mockUser);
        localStorage.setItem('1shopapp_user', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
    };

    const loginWithGoogle = () => {
        // Mock Google login
        const mockUser = { name: 'Google User', email: 'google@example.com', id: 'google_123' };
        setUser(mockUser);
        localStorage.setItem('1shopapp_user', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('1shopapp_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
