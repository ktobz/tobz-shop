import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { fetchSettings, updateSettings } from '../services/mockApi';
import styled from '@emotion/styled';

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05);
  max-width: 640px;
`;

const Settings = () => {
  const { addToast } = useToast();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch {
        addToast('Failed to load settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateSettings(settings);
      setSettings(updated);
      setEdited(false);
      addToast('Settings saved successfully', 'success');
    } catch {
      addToast('Failed to save settings', 'error');
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
      <div style={{ padding: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem', letterSpacing: '-0.03em' }}>Settings</h1>
        <div style={{ height: '300px', borderRadius: '20px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(110deg, #f3f4f6 0%, #e5e7eb 20%, #f3f4f6 40%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite linear' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.03em' }}>Settings</h1>
        <button
          onClick={handleSave}
          disabled={!edited || saving}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.65rem 1.4rem', borderRadius: '12px',
            background: edited ? '#111827' : '#d1d5db', color: '#fff',
            border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: edited ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s', boxShadow: edited ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
            opacity: edited ? 1 : 0.5,
          }}
          onMouseEnter={e => { if (edited) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'; } }}
          onMouseLeave={e => { if (edited) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; } }}
        >
          <Save size={15} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <GlassCard>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>Store Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              style={{
                padding: '0.7rem 1rem', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.6)',
                color: '#111827', fontWeight: 600, fontSize: '0.9rem', outline: 'none',
                backdropFilter: 'blur(8px)', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.25)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              style={{
                padding: '0.7rem 1rem', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.6)',
                color: '#111827', fontWeight: 600, fontSize: '0.9rem', outline: 'none',
                backdropFilter: 'blur(8px)', cursor: 'pointer', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.25)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Timezone</label>
            <input
              type="text"
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              style={{
                padding: '0.7rem 1rem', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.6)',
                color: '#111827', fontWeight: 600, fontSize: '0.9rem', outline: 'none',
                backdropFilter: 'blur(8px)', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.25)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '2rem 0 1rem', letterSpacing: '-0.01em' }}>Notifications</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about your store' },
            { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications in your browser' },
          ].map((item) => (
            <div
              key={item.key}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.02)',
                borderRadius: '12px', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>{item.desc}</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '46px', height: '26px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key]}
                  onChange={(e) => handleChange('notifications', { ...settings.notifications, [item.key]: e.target.checked })}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute', inset: 0,
                  background: settings.notifications[item.key] ? '#111827' : '#d1d5db',
                  borderRadius: '26px', transition: 'background 0.25s',
                }} />
                <span style={{
                  position: 'absolute', top: '3px',
                  left: settings.notifications[item.key] ? '23px' : '3px',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: '#fff', transition: 'left 0.25s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }} />
              </label>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Settings;
