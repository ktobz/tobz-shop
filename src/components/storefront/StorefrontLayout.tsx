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
            <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border-light)', marginTop: '6rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}>
                <p>© 2026 <strong style={{ color: 'var(--primary)' }}>1shopapp</strong>. Your modern e-commerce destination.</p>
            </footer>
        </div>
    );
};

export default StorefrontLayout;
