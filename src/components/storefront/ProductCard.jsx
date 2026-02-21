import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, RefreshCw, Eye, Star, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './ProductCard.scss';

// ─── Quick View Modal ─────────────────────────────────────────────────────────
const QuickView = ({ product, onClose }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const inWishlist = isInWishlist(product.id);

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
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="qv-close" onClick={onClose}><X size={20} /></button>
                    <div className="qv-body">
                        <div className="qv-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="qv-info">
                            <span className="qv-category">{product.category}</span>
                            <h2 className="qv-name">{product.name}</h2>

                            {/* Star rating */}
                            <div className="qv-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < Math.floor(product.rating || 0) ? '#ffc107' : 'none'}
                                        color={i < Math.floor(product.rating || 0) ? '#ffc107' : '#cbd5e1'}
                                    />
                                ))}
                                <span className="qv-rating-value">{product.rating?.toFixed(1)}</span>
                            </div>

                            <p className="qv-description">{product.description || 'No description available.'}</p>

                            <div className="qv-price-row">
                                <span className="qv-price">${product.price?.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="qv-original-price">${product.originalPrice?.toFixed(2)}</span>
                                )}
                            </div>

                            <div className="qv-actions">
                                <button
                                    className="btn-primary qv-add-btn"
                                    disabled={!product.inStock}
                                    onClick={() => { addToCart(product); onClose(); }}
                                >
                                    <ShoppingBag size={18} />
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                                <button
                                    className={`qv-wishlist-btn ${inWishlist ? 'active' : ''}`}
                                    onClick={() => toggleWishlist(product.id)}
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
    const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useStore();
    const [hovered, setHovered] = useState(false);
    const [quickView, setQuickView] = useState(false);

    const inWishlist = isInWishlist(product.id);
    const inCompare = isInCompare(product.id);

    // Badge computation
    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Action buttons config
    const actions = [
        {
            icon: <ShoppingBag size={16} />,
            label: 'Add to cart',
            onClick: () => addToCart(product),
            disabled: !product.inStock,
            className: '',
        },
        {
            icon: <Heart size={16} fill={inWishlist ? '#ef4444' : 'none'} color={inWishlist ? '#ef4444' : 'currentColor'} />,
            label: inWishlist ? 'Remove from wishlist' : 'Add to wishlist',
            onClick: () => toggleWishlist(product.id),
            className: inWishlist ? 'active-wish' : '',
        },
        {
            icon: <RefreshCw size={16} color={inCompare ? '#6366f1' : 'currentColor'} />,
            label: inCompare ? 'Remove from compare' : 'Add to compare',
            onClick: () => toggleCompare(product.id),
            className: inCompare ? 'active-compare' : '',
        },
        {
            icon: <Eye size={16} />,
            label: 'Quick view',
            onClick: () => setQuickView(true),
            className: '',
        },
    ];

    return (
        <>
            <motion.div
                className="product-card compact"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
            >
                {/* ── Image Container ── */}
                <div className="product-card__image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-card__img"
                        loading="lazy"
                    />

                    {/* Hover overlay: blurred preview */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                className="product-card__preview-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Eye size={32} color="#fff" strokeWidth={1.5} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Badges */}
                    <div className="product-card__badges">
                        {product.isNew && <span className="badge badge--new">New</span>}
                        {discountPercentage > 0 && (
                            <span className="badge badge--sale">-{discountPercentage}%</span>
                        )}
                        {!product.inStock && (
                            <span className="badge badge--oos">Sold Out</span>
                        )}
                    </div>

                    {/* Action buttons — slide up on hover */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                className="product-card__image-actions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.22, ease: 'easeOut' }}
                            >
                                {actions.map((action, i) => (
                                    <motion.button
                                        key={i}
                                        className={`card-action-btn ${action.className}`}
                                        title={action.label}
                                        onClick={(e) => { e.stopPropagation(); action.onClick(); }}
                                        disabled={action.disabled}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.045 }}
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.92 }}
                                    >
                                        {action.icon}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Content ── */}
                <div className="product-card__content">
                    <span className="product-card__category">{product.category}</span>
                    <h3 className="product-card__name" title={product.name}>{product.name}</h3>

                    {/* Star rating */}
                    <div className="product-card__stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                fill={i < Math.floor(product.rating || 0) ? '#ffc107' : 'none'}
                                color={i < Math.floor(product.rating || 0) ? '#ffc107' : '#cbd5e1'}
                            />
                        ))}
                        {product.rating != null && (
                            <span className="product-card__rating-text">{product.rating.toFixed(1)}</span>
                        )}
                    </div>

                    {/* Price row */}
                    <div className="product-card__price-row">
                        <span className="product-card__price">${product.price?.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="product-card__original-price">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
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
