"use client";

import React from 'react';
import StorefrontNavbar from '@/components/storefront/StorefrontNavbar';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="storefront-container">
            <StorefrontNavbar />
            <main className="fade-in">
                {children}
            </main>
            <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border-light)', marginTop: '6rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)' }}>
                <p>© 2026 <strong style={{ color: 'var(--primary)' }}>1shopapp</strong>. Your modern e-commerce destination.</p>
            </footer>
        </div>
    );
}
