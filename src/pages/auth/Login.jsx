import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
    return (
        <div className="auth-page flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel auth-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2.5rem' }}>Log in to your account to continue</p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                            <input type="email" placeholder="name@example.com" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
                            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                        </div>
                    </div>
                    <button className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }} type="button">Sign In</button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Don't have an account? <NavLink to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign Up</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
