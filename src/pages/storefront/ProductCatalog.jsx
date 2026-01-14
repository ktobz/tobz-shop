import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products?limit=20');

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const toggleWishlist = (productId) => {
        const newWishlist = new Set(wishlist);
        if (newWishlist.has(productId)) {
            newWishlist.delete(productId);
        } else {
            newWishlist.add(productId);
        }
        setWishlist(newWishlist);
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="product-catalog">
                <h1>Browse <span className="text-gradient">Collections</span></h1>
                <div className="loading-grid">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                                <div className="skeleton-line"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="product-catalog">
                <h1>Browse <span className="text-gradient">Collections</span></h1>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <p style={{ color: 'var(--danger)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                        Oops! Unable to load products.
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-catalog">
            <div className="catalog-header">
                <h1>Browse <span className="text-gradient">Collections</span></h1>
                <p className="catalog-subtitle">Discover our curated selection of {products.length} premium products</p>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card glass-panel">
                        <div className="product-image-container">
                            <div className="product-image">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                />
                            </div>
                            <button
                                className={`wishlist-btn ${wishlist.has(product.id) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product.id)}
                                title="Add to wishlist"
                            >
                                <Heart size={18} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        <div className="product-info">
                            <span className="product-category">{product.category}</span>

                            <h3 className="product-name">{product.title}</h3>

                            <div className="product-rating">
                                <div className="stars">
                                    <Star size={14} fill="var(--warning)" color="var(--warning)" />
                                </div>
                                <span className="rating-text">
                                    {product.rating?.rate || '4.5'}
                                    <span className="rating-count">({product.rating?.count || '0'} reviews)</span>
                                </span>
                            </div>

                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button className="btn-primary add-to-cart-btn">
                                    <ShoppingCart size={16} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;
