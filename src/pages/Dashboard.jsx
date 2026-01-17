import React, { useState, useEffect } from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp, MoreHorizontal, RefreshCw } from 'lucide-react';
import { fetchAnalytics, getUsers, getOrders } from '../services/mockApi';
import { Card, Statistic, Table, Button, Space, Row, Col } from 'antd';

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

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: `${getStatusColor(status)}20`,
                    color: getStatusColor(status),
                    fontSize: '0.75rem',
                    fontWeight: '700'
                }}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    return (
        <div className="dashboard fade-in">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Row justify="space-between" align="middle">
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
                    <Button
                        type="primary"
                        icon={<RefreshCw size={16} />}
                        loading={refreshing}
                        onClick={handleRefresh}
                    >
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </Row>

                <Row gutter={16}>
                    {stats.map((stat, index) => (
                        <Col span={6} key={index}>
                            <Card>
                                <Statistic
                                    title={stat.label}
                                    value={stat.value}
                                    prefix={<stat.icon size={24} />}
                                    suffix={<span style={{ color: 'green', fontWeight: '600' }}>{stat.trend}</span>}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Card
                    title="Recent Orders"
                    extra={
                        <Button type="text" icon={<MoreHorizontal size={20} />} />
                    }
                >
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey="id"
                        onRow={(record) => ({
                            onClick: () => alert(`Viewing details for order ${record.id}`),
                        })}
                        pagination={false}
                    />
                </Card>
            </Space>
        </div>
    );
};

export default Dashboard;
