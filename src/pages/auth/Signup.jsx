import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const signupSchema = yup.object().shape({
    name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await signupSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });
            setLoading(true);
            await signup(name, email, password);
            navigate('/');
        } catch (error) {
            if (error.inner) {
                const formErrors = {};
                error.inner.forEach(err => {
                    formErrors[err.path] = err.message;
                });
                setErrors(formErrors);
            } else {
                console.error('Signup failed', error);
                setErrors({ general: error.message || 'Signup failed' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
            console.error('Google signup failed', error);
            setErrors({ general: error.message || 'Google signup failed' });
        }
    };

    return (
        <div className="auth-page flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel auth-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>Create Account</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>Start your e-commerce journey today</p>

                {errors.general && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>{errors.general}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}
                                required
                            />
                        </div>
                        {errors.name && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</p>}
                    </div>
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
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}
                                required
                            />
                        </div>
                        {errors.confirmPassword && <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.confirmPassword}</p>}
                    </div>
                    <button className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }} type="submit" disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    </div>

                    <button
                        className="btn-outline"
                        style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        type="button"
                        onClick={handleGoogleSignup}
                        disabled={loading}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
                        Sign up with Google
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Already have an account? <NavLink to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;
