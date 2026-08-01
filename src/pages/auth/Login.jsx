import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome } from 'lucide-react';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../config/supabase';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await loginSchema.validate({ email, password }, { abortEarly: false });
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (error) {
            if (error.inner) {
                const formErrors = {};
                error.inner.forEach(err => { formErrors[err.path] = err.message; });
                setErrors(formErrors);
            } else {
                setErrors({ general: error.message || 'Login failed' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setErrors({});
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) throw error;
        } catch (error) {
            setErrors({ general: error.message || 'Google sign-in failed' });
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="auth-page flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel auth-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center', color: '#111827' }}>Welcome Back</h2>
                <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '2.5rem' }}>Log in to your account to continue</p>

                {errors.general && (
                    <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={17} />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(209,213,219,0.5)', borderRadius: '12px', color: '#111827', fontSize: '0.93rem', outline: 'none', boxSizing: 'border-box' }}
                                required
                            />
                        </div>
                        {errors.email && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>}
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={17} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(209,213,219,0.5)', borderRadius: '12px', color: '#111827', fontSize: '0.93rem', outline: 'none', boxSizing: 'border-box' }}
                                required
                            />
                        </div>
                        {errors.password && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '0.5rem', justifyContent: 'center',
                            background: '#111827', border: 'none', padding: '0.95rem',
                            borderRadius: '12px', color: '#fff', fontWeight: 800,
                            fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s, box-shadow 0.3s', letterSpacing: '0.02em',
                        }}
                        onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)'; }}
                        onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                        <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                        <span style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>or</span>
                        <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                    </div>
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '0.6rem', padding: '0.85rem', borderRadius: '12px',
                            border: '1px solid #e5e7eb', background: 'white', color: '#374151',
                            fontWeight: 700, fontSize: '0.93rem', cursor: 'pointer',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onMouseOver={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                        onMouseOut={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                    >
                        <Chrome size={20} /> {googleLoading ? 'Signing in...' : 'Continue with Google'}
                    </button>
                </div>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.88rem' }}>
                    Don&apos;t have an account? <NavLink to="/signup" style={{ color: '#111827', fontWeight: '700' }}>Sign Up</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
