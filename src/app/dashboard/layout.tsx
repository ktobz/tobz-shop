"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import '@/index.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <div className="content-wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
}
