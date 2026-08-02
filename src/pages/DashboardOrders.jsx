import React, { useState, useEffect } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { exportCSV } from '../utils/csvExport';
import { getOrders, getUsers } from '../services/mockApi';
import styled from '@emotion/styled';

const GlassCard = styled.div`
  background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0,0,0,0.06); border-radius: 20px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05);
`;

const DashboardOrders = () => {
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const [o, u] = await Promise.all([getOrders(), getUsers()]);
      setOrders(o.map(ord => ({ ...ord, customer: u.find(usr => usr.id === ord.userId)?.name || 'Unknown' })));
    } catch {
      addToast('Failed to load orders', 'error');
    } finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { load(); }, []);

  const handleExport = () => {
    try {
      exportCSV(orders, [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Customer', dataIndex: 'customer' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Amount', dataIndex: 'total', exportRenderer: v => `$${v}` },
      ], 'orders.csv');
      addToast('Orders exported', 'success');
    } catch { addToast('Export failed', 'error'); }
  };

  if (loading) {
    return <div style={{ padding: '1rem' }}><h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem' }}>Orders</h1><div style={{ height: '300px', borderRadius: '20px', overflow: 'hidden' }}><div style={{ width: '100%', height: '100%', background: 'linear-gradient(110deg, #f3f4f6 0%, #e5e7eb 20%, #f3f4f6 40%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite linear' }} /></div></div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.03em' }}>Orders</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => { setRefreshing(true); load(); }} disabled={refreshing} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.08)', color: '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}><RefreshCw size={15} /> {refreshing ? 'Loading...' : 'Refresh'}</button>
          <button onClick={handleExport} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '12px', background: '#111827', color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}><Download size={15} /> Export CSV</button>
        </div>
      </div>
      <GlassCard>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                {['Order ID', 'Customer', 'Date', 'Status', 'Amount'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#6b7280', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const sc = o.status === 'completed' ? ['#ecfdf5', '#065f46'] : o.status === 'pending' ? ['#fffbeb', '#92400e'] : ['#eff6ff', '#1e40af'];
                return (
                  <tr key={o.id} style={{ transition: 'background 0.15s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 14px', color: '#111827', fontWeight: 700, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>#{o.id}</td>
                    <td style={{ padding: '12px 14px', color: '#374151', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{o.customer}</td>
                    <td style={{ padding: '12px 14px', color: '#6b7280', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{o.date}</td>
                    <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}><span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, background: sc[0], color: sc[1] }}>{o.status}</span></td>
                    <td style={{ padding: '12px 14px', color: '#111827', fontWeight: 700, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>${o.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default DashboardOrders;
