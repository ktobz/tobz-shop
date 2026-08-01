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

            <div className="filters-section">
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="category-filter">
                    <Filter size={18} className="filter-icon" />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
