import React, { useState, useEffect } from 'react';
import { Package, Truck, AlertCircle, RefreshCw, Edit3 } from 'lucide-react';
import { fetchInventory, updateInventory } from '../../services/mockApi';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(null);
    const [editStock, setEditStock] = useState('');

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            setLoading(true);
            const data = await fetchInventory();
            setInventory(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditStock = (item) => {
        setEditing(item.id);
        setEditStock(item.stock.toString());
    };

    const handleSaveStock = async (item) => {
        try {
            const updated = await updateInventory(item.id, { stock: parseInt(editStock) });
            setInventory(prev => prev.map(inv => inv.id === item.id ? updated : inv));
            setEditing(null);
        } catch {
            alert('Failed to update stock');
        }
    };

    const getStockStatus = (stock) => {
        return stock > 50 ? 'In Stock' : stock > 10 ? 'Low Stock' : stock > 0 ? 'Very Low' : 'Out of Stock';
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1>Inventory Management</h1>
                    <p className="inventory-subtitle">Manage and monitor {inventory.length} items</p>
                </div>
                <button
                    onClick={loadInventory}
                    disabled={loading}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}
                >
                    <RefreshCw size={16} style={{ marginRight: '0.5rem' }} />
                    Refresh
                </button>
            </div>

            <div className="inventory-grid">
                {inventory.map((item) => {
                    const status = getStockStatus(item.stock);
                    return (
                        <div key={item.id} className="inventory-card glass-panel">
                            <div className="inventory-image">
                                <img
                                    src="/api/placeholder/150/150"
                                    alt={item.name}
                                    loading="lazy"
                                />
                            </div>

                            <div className="inventory-info">
                                <div className="inventory-category">{item.supplier}</div>
                                <h3 className="inventory-name">{item.name}</h3>

                                <div className="inventory-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Reorder Point:</span>
                                        <span className="detail-value">{item.reorderPoint} units</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Stock:</span>
                                        {editing === item.id ? (
                                            <input
                                                type="number"
                                                value={editStock}
                                                onChange={(e) => setEditStock(e.target.value)}
                                                style={{ width: '60px', padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                                            />
                                        ) : (
                                            <span className="detail-value stock-count">{item.stock} units</span>
                                        )}
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Status:</span>
                                        <span
                                            className="detail-value status-badge"
                                            style={{
                                                color: getStatusColor(status),
                                                backgroundColor: `${getStatusColor(status)}20`,
                                            }}
                                        >
                                            {status}
                                        </span>
                                    </div>
                                </div>

                                <div className="inventory-actions">
                                    {editing === item.id ? (
                                        <>
                                            <button
                                                className="btn-primary btn-sm"
                                                onClick={() => handleSaveStock(item)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn-outline btn-sm"
                                                onClick={() => setEditing(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn-outline btn-sm"
                                                onClick={() => handleEditStock(item)}
                                            >
                                                <Edit3 size={16} />
                                                Edit Stock
                                            </button>
                                            <button
                                                className="btn-outline btn-sm"
                                                onClick={() => alert(`Ordering more: ${item.name}`)}
                                                disabled={item.stock >= item.reorderPoint}
                                            >
                                                <Truck size={16} />
                                                Order
                                            </button>
                                        </>
                                    )}
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
