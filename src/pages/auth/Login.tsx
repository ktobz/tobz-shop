import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            await loginSchema.validate({ email, password }, { abortEarly: false });
            setLoading(true);
            await login(email, password);
            router.push('/');
        } catch (error: any) {
            if (error.inner) {
                const formErrors: any = {};
                error.inner.forEach((err: any) => {
                    formErrors[err.path] = err.message;
                });
                setErrors(formErrors);
            } else {
                console.error('Login failed', error);
                setErrors({ general: error.message || 'Login failed' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            router.push('/');
        } catch (error: any) {
            console.error('Google login failed', error);
            setErrors({ general: error.message || 'Google login failed' });
        }
    };

    return (
        <div className="auth-page flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel auth-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>Log in to your account to continue</p>

                {errors.general && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>{errors.general}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}
                                required
                            />
                        </div>
                        {errors.email && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}
                                required
                            />
                        </div>
                        {errors.password && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password}</p>}
                    </div>
                    <button className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }} type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    </div>

                    <button
                        className="btn-outline"
                        style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
                        Sign in with Google
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
