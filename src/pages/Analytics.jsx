import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { exportCSV } from '../utils/csvExport';
import { fetchAnalytics } from '../services/mockApi';
import styled from '@emotion/styled';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.1);
  }
`;

const DatePill = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.08);
  background: ${p => p.active ? '#111827' : 'rgba(255,255,255,0.6)'};
  color: ${p => p.active ? '#fff' : '#6b7280'};
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
  &:hover { transform: translateY(-1px); }
`;

const COLORS = ['#111827', '#374151', '#6b7280', '#9ca3af'];

const Analytics = () => {
  const { addToast } = useToast();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('6M');

  const loadData = async () => {
    try {
      const data = await fetchAnalytics();
      setAnalytics(data);
    } catch {
      addToast('Failed to load analytics', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
    addToast('Analytics refreshed', 'success');
  };

  const handleExport = () => {
    try {
      exportCSV(
        analytics?.salesOverTime || [],
        [
          { title: 'Month', dataIndex: 'month' },
          { title: 'Sales', dataIndex: 'sales', exportRenderer: (v) => `$${v}` },
        ],
        'revenue.csv'
      );
      addToast('Revenue data exported', 'success');
    } catch {
      addToast('Failed to export', 'error');
    }
  };

  const filteredData = useMemo(() => {
    if (!analytics) return [];
    const data = analytics.salesOverTime;
    const ranges = { '3M': 3, '6M': 6, '1Y': 12 };
    return ranges[dateRange] ? data.slice(-ranges[dateRange]) : data;
  }, [analytics, dateRange]);

  const productData = useMemo(() =>
    analytics?.topProducts?.map((p, i) => ({ name: p.name, sales: p.sales, fill: COLORS[i % COLORS.length] })) || [],
    [analytics]);

  const segmentData = useMemo(() => [
    { name: 'Returning', value: 72 },
    { name: 'New', value: 28 },
  ], []);

  if (loading) {
    return (
      <div style={{ padding: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem', letterSpacing: '-0.03em' }}>Analytics</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ height: '280px', background: 'rgba(255,255,255,0.5)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(110deg, #f3f4f6 0%, #e5e7eb 20%, #f3f4f6 40%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite linear' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.03em' }}>Analytics</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem', borderRadius: '12px',
              background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <RefreshCw size={15} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={handleExport}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem', borderRadius: '12px',
              background: '#111827', color: '#fff', border: 'none',
              fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      <GlassCard style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>Revenue Over Time</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['3M', '6M', '1Y'].map(r => (
              <DatePill key={r} active={dateRange === r} onClick={() => setDateRange(r)}>{r}</DatePill>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#111827" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#111827" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.95)', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                fontSize: '0.8rem', fontWeight: 600,
              }}
              formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="sales" stroke="#111827" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ r: 4, fill: '#111827', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#111827' }} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        <GlassCard>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Top Products</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productData} layout="vertical" margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)', borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  fontSize: '0.8rem',
                }}
              />
              <Bar dataKey="sales" radius={[0, 6, 6, 0]} barSize={20}>
                {productData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Customer Segments</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                <Cell fill="#111827" />
                <Cell fill="#d1d5db" />
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)', borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  fontSize: '0.8rem',
                }}
                formatter={(v, name) => [`${v}%`, name]}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};

export default Analytics;
