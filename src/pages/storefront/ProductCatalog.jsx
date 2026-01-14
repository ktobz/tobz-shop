import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
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

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <div className="product-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <button className="wishlist-btn" title="Add to wishlist">
                                <Heart size={18} />
                            </button>
                        </div>
                        <div className="product-info">
                            <div className="product-header">
                                <h3 className="product-name">{product.title}</h3>
                                <span className="product-price">${product.price.toFixed(2)}</span>
                            </div>
                            <span className="product-category">{product.category}</span>
                            <div className="product-rating">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < Math.floor(product.rating?.rate || 0) ? 'var(--warning)' : 'none'}
                                            color={i < Math.floor(product.rating?.rate || 0) ? 'var(--warning)' : 'var(--border-color)'}
                                        />
                                    ))}
                                </div>
                                <span className="rating-text">{product.rating?.rate || 'N/A'}</span>
                                <span className="rating-count">({product.rating?.count || 0})</span>
                            </div>
                            <div className="product-footer">
                                <button className="btn-primary add-to-cart-btn">
                                    Add to Cart
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

export default ProductCatalog;