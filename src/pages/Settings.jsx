import React from 'react';

const Settings = () => {
    return (
        <div className="settings fade-in">
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Settings</h1>

            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>General Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                        <span>Dark Mode</span>
                        <input type="checkbox" checked readOnly style={{ accentColor: 'var(--primary)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                        <span>Notifications</span>
                        <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
