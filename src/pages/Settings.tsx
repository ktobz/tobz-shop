import React, { useState, useEffect } from 'react';
import { RefreshCw, Save } from 'lucide-react';
import { fetchSettings, updateSettings } from '../services/mockApi';

const Settings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await fetchSettings();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await updateSettings(settings);
            setSettings(updated);
            setEdited(false);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field, value) => {
        setSettings({ ...settings, [field]: value });
        setEdited(true);
    };

    if (loading) {
        return (
            <div className="settings fade-in">
                <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Settings</h1>
                <div className="loading">Loading settings...</div>
            </div>
        );
    }
    return (
        <div className="settings fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Settings</h1>
                <button
                    onClick={handleSave}
                    disabled={!edited || saving}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}
                >
                    <Save size={16} style={{ marginRight: '0.5rem' }} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Store Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Store Name</label>
                        <input
                            type="text"
                            value={settings.storeName}
                            onChange={(e) => handleChange('storeName', e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Currency</label>
                        <select
                            value={settings.currency}
                            onChange={(e) => handleChange('currency', e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Timezone</label>
                        <input
                            type="text"
                            value={settings.timezone}
                            onChange={(e) => handleChange('timezone', e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
                        />
                    </div>
                </div>

                <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>Notifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                        <span>Email Notifications</span>
                        <input
                            type="checkbox"
                            checked={settings.notifications.email}
                            onChange={(e) => handleChange('notifications', { ...settings.notifications, email: e.target.checked })}
                            style={{ accentColor: 'var(--primary)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                        <span>Push Notifications</span>
                        <input
                            type="checkbox"
                            checked={settings.notifications.push}
                            onChange={(e) => handleChange('notifications', { ...settings.notifications, push: e.target.checked })}
                            style={{ accentColor: 'var(--primary)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
