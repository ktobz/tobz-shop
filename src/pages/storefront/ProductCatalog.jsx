import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Star, Heart, ArrowRight, Search, Filter } from 'lucide-react';
import { fetchProducts, getCategories } from '../../services/mockApi';
import { useCart } from '../../hooks/useCart';
import { useWatchlist } from '../../hooks/useWatchlist';

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
    const { addToCart } = useCart();
    const { toggleWatchlist, isInWatchlist } = useWatchlist();

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchProducts({ search, category, page: currentPage, limit });
            setProducts(response.data);
            setTotal(response.total);
        } catch (err) {
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
                const cats = await getCategories();
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
                    <h1>Product <span className="text-gradient">Catalog</span></h1>
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
                <h1>Product <span className="text-gradient">Catalog</span></h1>
                <p className="catalog-subtitle">Browse our complete collection of premium products</p>
            </div>

            <div className="filters-section" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '8px', flex: 1 }}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, color: 'var(--text-color)' }}
                    />
                </div>
                <div className="category-filter" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={18} />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}
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
                    <div key={product.id} className="product-card">
                        {!product.inStock && <div className="product-badge" style={{ background: '#ef4444' }}>Out of Stock</div>}
                        <div className="product-image-container">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <div className="product-overlay" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button
                                    className={`wishlist-btn icon-btn ${isInWatchlist(product.id) ? 'active' : ''}`}
                                    title={isInWatchlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWatchlist(product.id);
                                    }}
                                    style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px' }}
                                >
                                    <Heart size={18} fill={isInWatchlist(product.id) ? '#ef4444' : 'none'} color={isInWatchlist(product.id) ? '#ef4444' : 'currentColor'} />
                                </button>
                            </div>
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name" title={product.name}>{product.name}</h3>
                            <div className="product-rating" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{product.rating}</span>
                            </div>
                            <div className="product-footer" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button
                                    className="btn-primary"
                                    disabled={!product.inStock}
                                    onClick={() => addToCart(product)}
                                    style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}
                                >
                                    <ShoppingCart size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
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
