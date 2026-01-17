import React, { useState, useEffect } from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, MoreHorizontal, RefreshCw } from 'lucide-react';
import { fetchAnalytics, getUsers, getOrders } from '../services/mockApi';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [analyticsData, usersData, ordersData] = await Promise.all([
                fetchAnalytics(),
                getUsers(),
                getOrders()
            ]);
            setAnalytics(analyticsData);
            setUsers(usersData);
            setOrders(ordersData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const stats = analytics && users ? [
        { label: 'Total Sales', value: `${analytics.totalSales.toLocaleString()}`, icon: DollarSign, trend: '+14%' },
        { label: 'Active Users', value: users.length.toString(), icon: Users, trend: '+5%' },
        { label: 'Total Orders', value: analytics.totalOrders.toString(), icon: ShoppingCart, trend: '+18%' },
        { label: 'Avg Order Value', value: `${analytics.averageOrderValue}`, icon: TrendingUp, trend: '+1.2%' },
    ] : [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'var(--success)';
            case 'Processing': return 'var(--warning)';
            case 'Shipped': return 'var(--primary)';
            default: return 'var(--text-secondary)';
        }
    };

    if (loading) {
        return (
            <div className="dashboard fade-in">
                <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
                <div className="loading">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="dashboard fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}
                >
                    <RefreshCw size={16} style={{ marginRight: '0.5rem' }} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            <div className="dashboard-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                                <stat.icon size={24} />
                            </div>
                            <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.875rem' }}>{stat.trend}</span>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</p>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem' }}>{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>Recent Orders</h3>
                    <button className="flex-center" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem' }}>Order ID</th>
                                <th style={{ padding: '1rem' }}>Customer</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', cursor: 'pointer' }}
                                    onClick={() => alert(`Viewing details for order ${order.id}`)}
                                >
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{order.id}</td>
                                    <td style={{ padding: '1rem' }}>{order.customer}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{order.date}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '12px',
                                            background: `${getStatusColor(order.status)}20`,
                                            color: getStatusColor(order.status),
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
