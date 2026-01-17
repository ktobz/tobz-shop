import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

    const subtotal = getTotalPrice();
    const shipping = 5.99;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="cart-page flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-panel flex-center" style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)', color: 'var(--primary)' }}>
                    <ShoppingBag size={48} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>Your cart is empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Looks like you haven't added anything yet.</p>
                </div>
                <NavLink to="/catalog" className="btn-primary">Browse Products</NavLink>
            </div>
        );
    }

    return (
        <div className="cart-page fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="hero-title" style={{ marginBottom: '3rem' }}>Your <span className="text-gradient">Shopping Cart</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                <div className="cart-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cartItems.map(item => (
                        <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '2rem', alignItems: 'center' }}>
                            <div className="cart-img" style={{ height: '100px', width: '100px', background: `white url(${item.image}) center/contain no-repeat`, borderRadius: '12px' }}></div>
                            <div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.1rem' }}>${item.price.toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="icon-btn-sm"><Minus size={16} /></button>
                                    <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="icon-btn-sm"><Plus size={16} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Order Summary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                            <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                            <span style={{ fontWeight: '600' }}>${shipping.toFixed(2)}</span>
                        </div>
                        <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem' }}>
                            <span style={{ fontWeight: '700' }}>Total</span>
                            <span style={{ fontWeight: '800', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '2.5rem', justifyContent: 'center' }}
                        onClick={() => alert('Order Placed! Thank you for shopping with 1shopapp.')}
                    >
                        Checkout Now <ArrowRight size={20} />
                    </button>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'center', marginTop: '1.5rem' }}>
                        Secure Payment Powered by Stripe
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
