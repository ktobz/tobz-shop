import React, { useState, useEffect } from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, RefreshCw, Download } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useCountUp } from '../hooks/useCountUp';
import { exportCSV } from '../utils/csvExport';
import { fetchAnalytics, getUsers, getOrders } from '../services/mockApi';
import styled from '@emotion/styled';

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.1);
    border-color: rgba(0,0,0,0.12);
  }
`;

const Sparkline = ({ data }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 100;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      <polyline
        points={points}
        fill="none"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill="url(#sgl)"
        opacity="0.08"
      />
      <defs>
        <linearGradient id="sgl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const mockSparkData = {
  sales: [12000, 15000, 18000, 22000, 20000, 28000, 32000, 35000, 31000, 38000, 42000, 45000],
  users: [120, 135, 140, 155, 160, 170, 180, 190, 195, 210, 220, 230],
  orders: [150, 180, 160, 200, 190, 220, 250, 280, 260, 300, 310, 330],
  avg: [42, 44, 46, 45, 48, 50, 49, 52, 51, 53, 55, 54],
};

const Dashboard = () => {
  const { addToast } = useToast();
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const salesCount = useCountUp(analytics?.totalSales || 0, 1000);
  const ordersCount = useCountUp(analytics?.totalOrders || 0, 900);
  const avgValue = useCountUp(analytics?.averageOrderValue || 0, 800);
  const usersCount = useCountUp(userCount, 900);

  const loadData = async () => {
    try {
      const [analyticsData, usersData, ordersData] = await Promise.all([
        fetchAnalytics(),
        getUsers(),
        getOrders(),
      ]);
      setAnalytics(analyticsData);
      setUserCount(usersData.length);
      setOrders(
        ordersData.map((order) => ({
          ...order,
          customer: usersData.find((u) => u.id === order.userId)?.name || 'Unknown',
        }))
      );
    } catch (err) {
      addToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
    addToast('Dashboard refreshed', 'success');
  };

  const handleExport = () => {
    try {
      exportCSV(
        orders,
        [
          { title: 'Order ID', dataIndex: 'id' },
          { title: 'Customer', dataIndex: 'customer' },
          { title: 'Date', dataIndex: 'date' },
          { title: 'Status', dataIndex: 'status' },
          { title: 'Amount', dataIndex: 'total', exportRenderer: (v) => `$${v}` },
        ],
        'orders.csv'
      );
      addToast('Orders exported to CSV', 'success');
    } catch {
      addToast('Failed to export CSV', 'error');
    }
  };

  const stats = analytics ? [
    {
      label: 'Total Sales', icon: DollarSign, trend: '+14%',
      displayValue: `$${salesCount.count.toLocaleString()}`,
      sparklineData: mockSparkData.sales,
    },
    {
      label: 'Active Users', icon: Users, trend: '+5%',
      displayValue: usersCount.count.toLocaleString(),
      sparklineData: mockSparkData.users,
    },
    {
      label: 'Total Orders', icon: ShoppingCart, trend: '+18%',
      displayValue: ordersCount.count.toLocaleString(),
      sparklineData: mockSparkData.orders,
    },
    {
      label: 'Avg Order Value', icon: TrendingUp, trend: '+1.2%',
      displayValue: `$${avgValue.count}`,
      sparklineData: mockSparkData.avg,
    },
  ] : [];

  if (loading) {
    return (
      <div style={{ padding: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '2rem', letterSpacing: '-0.03em' }}>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ height: '140px', background: 'rgba(255,255,255,0.5)', borderRadius: '20px', overflow: 'hidden' }}>
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.03em' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem', borderRadius: '12px',
              background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#374151', fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <RefreshCw size={15} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={handleExport}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem', borderRadius: '12px',
              background: '#111827', color: '#fff',
              border: 'none', fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <GlassCard key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {stat.displayValue}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>{stat.trend}</span>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>vs last month</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <div
                  style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <stat.icon size={18} color="#fff" />
                </div>
                <Sparkline data={stat.sparklineData} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>Recent Orders</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                {['Order ID', 'Customer', 'Date', 'Status', 'Amount'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#6b7280', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={{ transition: 'all 0.15s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  onClick={() => addToast(`Order #${order.id} — ${order.status}`, 'info')}
                >
                  <td style={{ padding: '12px 14px', color: '#111827', fontWeight: 700, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>#{order.id}</td>
                  <td style={{ padding: '12px 14px', color: '#374151', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{order.customer}</td>
                  <td style={{ padding: '12px 14px', color: '#6b7280', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{order.date}</td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                      background:
                        order.status === 'completed' ? '#ecfdf5' :
                        order.status === 'pending' ? '#fffbeb' :
                        order.status === 'shipped' ? '#eff6ff' : '#f3f4f6',
                      color:
                        order.status === 'completed' ? '#065f46' :
                        order.status === 'pending' ? '#92400e' :
                        order.status === 'shipped' ? '#1e40af' : '#374151',
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#111827', fontWeight: 700, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
