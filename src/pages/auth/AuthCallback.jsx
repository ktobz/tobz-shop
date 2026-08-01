import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
            navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
            return;
        }

        if (token) {
            authAPI.setToken(token);
            navigate('/', { replace: true });
            return;
        }

        navigate('/', { replace: true });
    }, [navigate]);

    return (
        <div className="auth-page flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel auth-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#111827', animation: 'spin 0.8s linear infinite', margin: '0 auto 1.5rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827' }}>Signing you in</h2>
                <p style={{ color: '#6b7280' }}>Completing authentication...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
};

export default AuthCallback;
