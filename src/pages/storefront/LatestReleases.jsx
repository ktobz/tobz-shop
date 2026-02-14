import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWatchlist } from '../../hooks/useWatchlist';
import { fetchProducts } from '../../services/mockApi';

const LatestReleases = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { toggleWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                setLoading(true);
                // Use fetchProducts from mockApi for consistency and better error handling
                const response = await fetchProducts({ limit: 20 });
                const clothing = response.data.filter(item =>
                    item.category === "men's clothing" || item.category === "women's clothing"
                );

                setProducts(clothing.length > 0 ? clothing : response.data.slice(0, 8));
            } catch (err) {
                setError(err.message);
                console.error('LatestReleases fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClothing();
    }, []);

    if (loading) {
        return (
            <div className="catalog-container">
                <div className="section-header">
                    <h1 className="hero-title">Latest <span className="text-gradient">Clothing</span> Releases</h1>
                    <p>Curating the finest fashion just for you...</p>
                </div>
                <div className="product-grid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="product-card glass-panel skeleton-shimmer" style={{ height: '400px' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column' }}>
                <p style={{ color: 'var(--danger)', fontSize: '1.2rem' }}>Oops! {error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem' }}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="catalog-container fade-in">
            <div className="section-header">
                <h1 className="hero-title">Latest <span className="text-gradient">Clothing</span> Releases</h1>
                <p>Explore our newest arrivals in men's and women's fashion.</p>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-badge">New Arrival</div>
                        <div className="product-image-container">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-overlay" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button
                                    className={`wishlist-btn icon-btn ${isInWatchlist(product.id) ? 'active' : ''}`}
                                    title={isInWatchlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                                    onClick={() => toggleWatchlist(product.id)}
                                    style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px' }}
                                >
                                    <Heart size={18} fill={isInWatchlist(product.id) ? "#ef4444" : "none"} color={isInWatchlist(product.id) ? "#ef4444" : "currentColor"} />
                                </button>
                                <button
                                    className="overlay-btn icon-btn"
                                    title="Add to Cart"
                                    onClick={() => addToCart(product)}
                                    style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '50%', width: '36px', height: '36px' }}
                                >
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name" title={product.title}>{product.title}</h3>
                            <div className="product-footer" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button
                                    className="btn-primary"
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
        </div>
    );
};

export default LatestReleases;
