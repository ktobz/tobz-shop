import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star, X, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './ProductCard.scss';

// ─── Toast notification (lightweight) ────────────────────────────────────────
const Toast = ({ msg }) => (
    <motion.div
        className="card-toast"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.9 }}
        transition={{ duration: 0.22 }}
    >
        <Check size={14} /> {msg}
    </motion.div>
);

// ─── Quick View Modal ─────────────────────────────────────────────────────────
const QuickView = ({ product, onClose }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const inWishlist = isInWishlist(product.id);
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <AnimatePresence>
            <motion.div
                className="qv-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="qv-panel"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 30 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close */}
                    <button className="qv-close" onClick={onClose} aria-label="Close">
                        <X size={18} />
                    </button>

                    <div className="qv-body">
                        {/* Image */}
                        <div className="qv-image">
                            <img src={product.image} alt={product.name} />
                            {discount > 0 && (
                                <span className="qv-discount-badge">-{discount}% OFF</span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="qv-info">
                            <span className="qv-category">{product.category}</span>
                            <h2 className="qv-name">{product.name}</h2>

                            {/* Stars */}
                            <div className="qv-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={15}
                                        fill={i < Math.floor(product.rating || 0) ? '#f59e0b' : 'none'}
                                        color={i < Math.floor(product.rating || 0) ? '#f59e0b' : '#d1d5db'}
                                    />
                                ))}
                                <span className="qv-rating-value">{product.rating?.toFixed(1)} / 5.0</span>
                            </div>

                            <p className="qv-description">{product.description || 'No description available.'}</p>

                            {/* Price */}
                            <div className="qv-price-row">
                                <span className="qv-price">${product.price?.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="qv-original-price">${product.originalPrice?.toFixed(2)}</span>
                                )}
                                {discount > 0 && (
                                    <span className="qv-save-tag">Save {discount}%</span>
                                )}
                            </div>

                            {/* Stock */}
                            <div className={`qv-stock ${product.inStock ? 'in' : 'out'}`}>
                                <span className="qv-stock-dot" />
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>

                            {/* Actions */}
                            <div className="qv-actions">
                                <button
                                    className={`qv-add-btn ${!product.inStock ? 'disabled' : ''}`}
                                    disabled={!product.inStock}
                                    onClick={() => { addToCart(product); onClose(); }}
                                >
                                    <ShoppingBag size={18} />
                                    {product.inStock ? 'Add to Cart' : 'Unavailable'}
                                </button>
                                <button
                                    className={`qv-wishlist-btn ${inWishlist ? 'active' : ''}`}
                                    onClick={() => toggleWishlist(product.id)}
                                    aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <Heart size={20} fill={inWishlist ? '#ef4444' : 'none'} color={inWishlist ? '#ef4444' : 'currentColor'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// ─── ProductCard ──────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const [hovered, setHovered] = useState(false);
    const [quickView, setQuickView] = useState(false);
    const [toast, setToast] = useState(null);

    const inWishlist = isInWishlist(product.id);

    const discountPct = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2000);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!product.inStock) return;
        addToCart(product);
        showToast('Added to cart!');
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
        showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuickView(true);
    };

    return (
        <>
            <motion.div
                className="product-card compact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
            >
                {/* ── Image ── */}
                <div className="product-card__image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-card__img"
                        loading="lazy"
                    />

                    {/* Hover overlay */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                className="product-card__overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Badges */}
                    <div className="product-card__badges">
                        {product.isNew && <span className="badge badge--new">New</span>}
                        {discountPct > 0 && <span className="badge badge--sale">-{discountPct}%</span>}
                        {!product.inStock && <span className="badge badge--oos">Sold Out</span>}
                    </div>

                    {/* Action buttons — always visible on mobile, hover on desktop */}
                    <div className="product-card__actions">
                        {/* Add to cart */}
                        <motion.button
                            className={`pca-btn pca-cart ${!product.inStock ? 'pca-disabled' : ''}`}
                            title="Add to cart"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingCart size={15} />
                        </motion.button>

                        {/* Wishlist */}
                        <motion.button
                            className={`pca-btn pca-wish ${inWishlist ? 'pca-wish--active' : ''}`}
                            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            onClick={handleToggleWishlist}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Heart
                                size={15}
                                fill={inWishlist ? '#ef4444' : 'none'}
                                color={inWishlist ? '#ef4444' : 'currentColor'}
                            />
                        </motion.button>

                        {/* Quick view */}
                        <motion.button
                            className="pca-btn pca-eye"
                            title="Quick view"
                            onClick={handleQuickView}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Eye size={15} />
                        </motion.button>
                    </div>

                    {/* Toast within card */}
                    <AnimatePresence>
                        {toast && <Toast msg={toast} />}
                    </AnimatePresence>
                </div>

                {/* ── Content ── */}
                <div className="product-card__content">
                    <span className="product-card__category">{product.category}</span>
                    <h3 className="product-card__name" title={product.name}>{product.name}</h3>

                    <div className="product-card__stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={11}
                                fill={i < Math.floor(product.rating || 0) ? '#f59e0b' : 'none'}
                                color={i < Math.floor(product.rating || 0) ? '#f59e0b' : '#d1d5db'}
                            />
                        ))}
                        {product.rating != null && (
                            <span className="product-card__rating-text">{product.rating.toFixed(1)}</span>
                        )}
                    </div>

                    <div className="product-card__footer">
                        <div className="product-card__price-row">
                            <span className="product-card__price">${product.price?.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="product-card__original-price">${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>
                        <button
                            className={`product-card__add-btn ${!product.inStock ? 'disabled' : ''}`}
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            title="Add to cart"
                        >
                            <ShoppingCart size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Quick View Modal */}
            {quickView && (
                <QuickView product={product} onClose={() => setQuickView(false)} />
            )}
        </>
    );
};

export default ProductCard;
