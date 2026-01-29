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
            <footer className="footer footer-center p-10 bg-base-200 text-base-content border-t border-base-300 mt-24">
                <aside>
                    <p>© 2026 <strong className="text-primary">1shopapp</strong>. Your modern e-commerce destination.</p>
                </aside>
            </footer>
        </div>
    );
}
