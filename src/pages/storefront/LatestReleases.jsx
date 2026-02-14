import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWatchlist } from '../../hooks/useWatchlist';
import { fetchProducts } from '../../services/mockApi';

import './LatestReleases.scss';

const LatestReleases = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { addToCart } = useCart();
    const { toggleWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                setLoading(true);
                // Fetch more products to test pagination
                const response = await fetchProducts({ limit: 40 });
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
                console.error('LatestReleases fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClothing();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        // ... (loading state preserved with minor adjustments for new layout if needed, but keeping it simple for now)
        return (
            <div className="latest-releases-page catalog-container">
                <div className="section-header">
                    <h1 className="hero-title">Latest <span className="text-gradient">Clothing</span> Releases</h1>
                    <p>Curating the finest fashion just for you...</p>
                </div>
                <div className="product-grid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="product-card skeleton-shimmer" style={{ height: '400px' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="latest-releases-page flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
                <p style={{ color: 'var(--danger)', fontSize: '1.2rem' }}>Oops! {error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem' }}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="latest-releases-page catalog-container fade-in">
            <div className="section-header">
                <h1 className="hero-title">Latest <span className="text-gradient">Clothing</span> Releases</h1>
                <p>Explore our newest arrivals in men's and women's fashion.</p>
            </div>

            <div className="product-grid">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-overlay" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button
                                    className={`wishlist-btn ${isInWatchlist(product.id) ? 'active' : ''}`}
                                    onClick={() => toggleWatchlist(product.id)}
                                    style={{ background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                >
                                    <Heart size={18} fill={isInWatchlist(product.id) ? "#ef4444" : "none"} color={isInWatchlist(product.id) ? "#ef4444" : "#718096"} />
                                </button>
                            </div>
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name">{product.title}</h3>
                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button
                                    className="btn-primary"
                                    onClick={() => addToCart(product)}
                                    style={{ padding: '0.5rem', borderRadius: '8px' }}
                                >
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="btn-outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn-outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default LatestReleases;
