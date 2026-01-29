import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { fetchProductById } from '../../services/mockApi';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useCart } from '../../hooks/useCart';

const Wishlist = () => {
    const { watchlist, toggleWatchlist } = useWatchlist();
    const { addToCart } = useCart();
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            setLoading(true);
            try {
                const items = [];
                // watchlist is likely a Set or Array
                for (const id of Array.from(watchlist)) {
                    const product = await fetchProductById(id);
                    if (product) {
                        items.push(product);
                    }
                }
                setWishlistItems(items);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
            } finally {
                setLoading(false);
            }
        };

        if (watchlist.size > 0 || (Array.isArray(watchlist) && watchlist.length > 0)) {
            fetchWishlistItems();
        } else {
            setWishlistItems([]);
            setLoading(false);
        }
    }, [watchlist]);

    const handleRemoveFromWishlist = (id: any) => {
        toggleWatchlist(id);
    };

    const handleAddToCart = (product: any) => {
        addToCart(product);
    };

    if (loading) {
        return (
            <div className="wishlist-page flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '2rem' }}>
                <div className="loading-spinner"></div>
                <p>Loading your wishlist...</p>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-page flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-panel flex-center" style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)', color: 'var(--primary)' }}>
                    <Heart size={48} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>Your wishlist is empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Save items for later and they'll appear here.</p>
                </div>
                <Link href="/catalog" className="btn-primary">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="hero-title" style={{ marginBottom: '3rem' }}>Your <span className="text-gradient">Wishlist</span></h1>

            <div className="wishlist-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {wishlistItems.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <button
                                className="wishlist-btn active"
                                title="Remove from wishlist"
                                onClick={() => handleRemoveFromWishlist(product.id)}
                            >
                                <Heart size={18} fill="currentColor" />
                            </button>
                        </div>
                        <div className="product-info">
                            <div className="product-header">
                                <h3 className="product-name">{product.name}</h3>
                                <span className="product-price">${product.price.toFixed(2)}</span>
                            </div>
                            <span className="product-category">{product.category}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0.5rem 0', fontSize: '0.875rem' }}>
                                ⭐<span>{product.rating}</span>
                            </div>
                            <p className="product-description" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                                {product.description}
                            </p>
                            <div className="product-stock" style={{ fontSize: '0.875rem', color: product.inStock ? 'var(--success)' : 'var(--danger)' }}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>
                            <div className="product-footer">
                                <button
                                    className="btn-primary add-to-cart-btn"
                                    disabled={!product.inStock}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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

export default Wishlist;