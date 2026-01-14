import React from 'react';

const Analytics = () => {
    return (
        <div className="analytics fade-in">
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Analytics</h1>

            <div className="dashboard-grid">
                <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Revenue Over Time</h3>
                    <div style={{ height: '300px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                        {/* Simple SVG Chart Representation */}
                        <svg viewBox="0 0 800 200" style={{ width: '100%', height: '100%' }}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0 150 Q 100 100, 200 130 T 400 60 T 600 90 T 800 40 L 800 200 L 0 200 Z"
                                fill="url(#chartGradient)"
                            />
                            <path
                                d="M0 150 Q 100 100, 200 130 T 400 60 T 600 90 T 800 40"
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="3"
                            />
                            {/* Data points */}
                            <circle cx="200" cy="130" r="5" fill="var(--primary)" />
                            <circle cx="400" cy="60" r="5" fill="var(--primary)" />
                            <circle cx="600" cy="90" r="5" fill="var(--primary)" />
                            <circle cx="800" cy="40" r="5" fill="var(--primary)" />
                        </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3>Top Products</h3>
                    <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Neon Hoodie</span>
                            <span style={{ fontWeight: '600' }}>$4,200</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Cyber Sneakers</span>
                            <span style={{ fontWeight: '600' }}>$3,150</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Glow Watch</span>
                            <span style={{ fontWeight: '600' }}>$2,800</span>
                        </li>
                    </ul>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3>Customer Segments</h3>
                    <div style={{ marginTop: '2rem', height: '150px', display: 'flex', justifyContent: 'center' }}>
                        {/* Simple Donut Chart Representation */}
                        <svg viewBox="0 0 100 100" style={{ height: '100%' }}>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="10" strokeDasharray="180 251" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--secondary)" strokeWidth="10" strokeDasharray="60 251" strokeDashoffset="-180" />
                        </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--primary)' }}>● Returning</span>
                        <span style={{ color: 'var(--secondary)' }}>● New</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
