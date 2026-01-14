import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';

const LatestReleases = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                setLoading(true);
                // Fetch all products and filter for clothing categories
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();

                // Filter for men's and women's clothing
                const clothing = data.filter(item =>
                    item.category === "men's clothing" || item.category === "women's clothing"
                );

                setProducts(clothing);
            } catch (err) {
                setError(err.message);
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
                    <div key={product.id} className="product-card glass-panel hvr-lift">
                        <div className="product-image">
                            <img src={product.image} alt={product.title} />
                            <div className="product-overlay">
                                <button className="overlay-btn icon-btn" title="Add to Wishlist">
                                    <Heart size={18} />
                                </button>
                                <button className="overlay-btn icon-btn" title="Quick View">
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                            <div className="product-badge">New Arrival</div>
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>
                            <h3 className="product-name" title={product.title}>{product.title}</h3>
                            <div className="product-rating">
                                <Star className="star-icon fill-star" size={14} />
                                <span>{product.rating?.rate}</span>
                                <span className="rating-count">({product.rating?.count})</span>
                            </div>
                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button className="add-to-cart-btn">
                                    <span>Add to Cart</span>
                                    <ArrowRight size={16} />
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
