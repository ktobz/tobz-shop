import React from 'react';
import { Outlet } from 'react-router-dom';
import StorefrontNavbar from './StorefrontNavbar';

const StorefrontLayout = () => {
    return (
        <div className="storefront-container">
            <StorefrontNavbar />
            <main className="fade-in">
                <Outlet />
            </main>
            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--glass-border)', marginTop: '6rem', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'left' }}>
                    <div>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '800' }}>1shopapp</h4>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>The future of modern e-commerce. Empowering merchants globally with premium tools.</p>
                    </div>
                    <div>
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: '700' }}>Shop</h5>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/catalog" style={{ color: 'inherit', textDecoration: 'none' }}>All Products</a></li>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/latest-releases" style={{ color: 'inherit', textDecoration: 'none' }}>Latest Releases</a></li>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/marketing" style={{ color: 'inherit', textDecoration: 'none' }}>Marketing Tools</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: '700' }}>Company</h5>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/join-journey" style={{ color: 'inherit', textDecoration: 'none' }}>Join Our Journey</a></li>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact & Support</a></li>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/resources" style={{ color: 'inherit', textDecoration: 'none' }}>Resources</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: '700' }}>Legal</h5>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</a></li>
                            <li style={{ marginBottom: '0.75rem' }}><a href="/warranty" style={{ color: 'inherit', textDecoration: 'none' }}>Warranty & Returns</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center', fontSize: '0.85rem' }}>
                    <p>© 2026 <strong>1shopapp</strong>. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default StorefrontLayout;
