import React, { useState, useEffect } from 'react';
import { Package, Truck, AlertCircle } from 'lucide-react';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                setLoading(true);
                // Fetch 50 products from fake store API
                const response = await fetch('https://fakestoreapi.com/products?limit=50');

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }

                const data = await response.json();
                setInventory(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching inventory:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    const getStockStatus = (id) => {
        const stock = Math.floor(Math.random() * 100) + 1;
        return {
            stock,
            status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
        };
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'var(--success)';
            case 'Low Stock':
                return 'var(--warning)';
            case 'Out of Stock':
                return 'var(--danger)';
            default:
                return 'var(--text-secondary)';
        }
    };

    if (loading) {
        return (
            <div className="inventory-page">
                <h1>Inventory Management</h1>
                <div className="loading-grid">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="inventory-page">
                <h1>Inventory Management</h1>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <AlertCircle size={48} color="var(--danger)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
                    <p style={{ color: 'var(--danger)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                        Unable to load inventory
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="inventory-page fade-in">
            <div className="inventory-header">
                <h1>Inventory Management</h1>
                <p className="inventory-subtitle">Manage and monitor {inventory.length} items</p>
            </div>

            <div className="inventory-grid">
                {inventory.map((item) => {
                    const stockInfo = getStockStatus(item.id);
                    return (
                        <div key={item.id} className="inventory-card glass-panel">
                            <div className="inventory-image">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </div>

                            <div className="inventory-info">
                                <div className="inventory-category">{item.category}</div>
                                <h3 className="inventory-name">{item.title}</h3>

                                <div className="inventory-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Price:</span>
                                        <span className="detail-value">${item.price.toFixed(2)}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Stock:</span>
                                        <span className="detail-value stock-count">{stockInfo.stock} units</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Status:</span>
                                        <span
                                            className="detail-value status-badge"
                                            style={{
                                                color: getStatusColor(stockInfo.status),
                                                backgroundColor: `${getStatusColor(stockInfo.status)}20`,
                                            }}
                                        >
                                            {stockInfo.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="inventory-actions">
                                    <button className="btn-outline btn-sm">
                                        <Package size={16} />
                                        Edit
                                    </button>
                                    <button className="btn-outline btn-sm">
                                        <Truck size={16} />
                                        Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Inventory;
