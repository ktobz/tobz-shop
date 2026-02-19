import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { CreditCard, Truck, ShieldCheck, ChevronRight, Lock } from 'lucide-react';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: var(--bg-card);
  padding: 3rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
`;

const OrderSummary = styled.div`
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  outline: none;

  &:focus {
    border-color: var(--primary);
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: ${props => props.bold ? '700' : '400'};
  font-size: ${props => props.large ? '1.25rem' : '1rem'};
  border-top: ${props => props.divider ? '1px solid var(--border-light)' : 'none'};
  padding-top: ${props => props.divider ? '1rem' : '0'};
`;

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            clearCart();
            navigate('/payment-success');
        }, 2000);
    };

    return (
        <CheckoutContainer className="fade-in">
            <FormSection>
                <Title><Truck /> Shipping Information</Title>
                <form onSubmit={handlePlaceOrder}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input placeholder="John" required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input placeholder="Doe" required />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label>Email Address</Label>
                        <Input type="email" placeholder="john@example.com" required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Street Address</Label>
                        <Input placeholder="123 Commerce St" required />
                    </FormGroup>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <FormGroup>
                            <Label>City</Label>
                            <Input placeholder="San Francisco" required />
                        </FormGroup>
                        <FormGroup>
                            <Label>State</Label>
                            <Input placeholder="CA" required />
                        </FormGroup>
                        <FormGroup>
                            <Label>ZIP Code</Label>
                            <Input placeholder="94105" required />
                        </FormGroup>
                    </div>

                    <Title style={{ marginTop: '3rem' }}><CreditCard /> Payment Details</Title>
                    <FormGroup>
                        <Label>Card Number</Label>
                        <Input placeholder="0000 0000 0000 0000" required />
                    </FormGroup>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FormGroup>
                            <Label>Expiry Date</Label>
                            <Input placeholder="MM/YY" required />
                        </FormGroup>
                        <FormGroup>
                            <Label>CVV</Label>
                            <Input placeholder="123" required />
                        </FormGroup>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Lock size={14} /> Your transaction is secured with 256-bit SSL encryption.
                    </p>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading || cartItems.length === 0}
                        style={{ width: '100%', padding: '1.25rem', marginTop: '2rem', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                </form>
            </FormSection>

            <OrderSummary>
                <h3 style={{ marginBottom: '2rem', fontWeight: '800' }}>Order Summary</h3>
                {cartItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                            <div style={{ fontWeight: '600' }}>{item.name}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity || 1}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontWeight: '700' }}>${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                    </div>
                ))}

                <SummaryRow divider style={{ marginTop: '2rem' }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow bold large divider style={{ marginTop: '1rem' }}>
                    <span>Total</span>
                    <span className="text-gradient">${total.toFixed(2)}</span>
                </SummaryRow>

                <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(196, 165, 232, 0.05)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', fontWeight: '700' }}>
                        <ShieldCheck size={20} /> Buyer Protection
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Get full refund if the item is not as described or if is not delivered.
                    </p>
                </div>
            </OrderSummary>
        </CheckoutContainer>
    );
};

export default Checkout;
