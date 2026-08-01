import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter } from 'lucide-react';
import { productAPI } from '../../services/api';
import ProductCard from '../../components/storefront/ProductCard';

import './ProductCatalog.scss';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 12;

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await productAPI.getProducts({ search, category, page: currentPage, limit });
            setProducts(response.data);
            setTotal(response.total);
        } catch (err) {
            console.error('Failed to load products:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [search, category, currentPage]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await productAPI.getCategories();
                setCategories(cats);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        loadCategories();
    }, []);

    if (loading) {
        return (
            <div className="product-catalog">
                <div className="catalog-header">
                    <h1>Product Catalog</h1>
                    <p className="catalog-subtitle">Loading amazing products for you...</p>
                </div>
                <div className="loading-grid">
                    {[...Array(8)].map((_, i) => (
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
            <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'var(--danger)', fontSize: '1.2rem', fontWeight: '600' }}>Error: {error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="product-catalog fade-in">
            <div className="catalog-header">
                <h1>Product Catalog</h1>
                <p className="catalog-subtitle">Browse our complete collection of premium products</p>
            </div>

            <div className="filters-section" style={{ marginBottom: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="search-bar" style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    background: '#111827',
                    padding: '0.8rem 1.25rem',
                    borderRadius: '14px',
                    flex: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'box-shadow 0.25s ease',
                }}>
                    <Search size={18} color="#9ca3af" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            border: 'none', background: 'transparent', outline: 'none',
                            flex: 1, color: '#f9fafb', fontSize: '0.95rem',
                            fontWeight: 500,
                        }}
                    />
                </div>
                <div className="category-filter" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={18} color="#6b7280" />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            padding: '0.7rem 1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(209,213,219,0.5)',
                            background: 'rgba(255,255,255,0.7)',
                            color: '#374151',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            outline: 'none',
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {total > limit && (
                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                    <button
                        className="btn-secondary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(total / limit)}</span>
                    <button
                        className="btn-secondary"
                        disabled={currentPage === Math.ceil(total / limit)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;
