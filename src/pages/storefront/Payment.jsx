import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const PaymentContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 2rem;
  font-family: var(--font-sans);
`;

const FormSection = styled.div`
  background: var(--bg-card);
  padding: 3rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-xl);
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

const Payment = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            clearCart();
            navigate('/payment-success');
        }, 2000);
    };

    return (
        <PaymentContainer className="fade-in">
            <FormSection>
                <Title><CreditCard /> Secure Payment</Title>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Please enter your payment details below to complete your order.
                </p>
                <form onSubmit={handlePayment}>
                    <FormGroup>
                        <Label>Name on Card</Label>
                        <Input placeholder="John Doe" required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Card Number</Label>
                        <Input placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </FormGroup>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <FormGroup>
                            <Label>Expiry Date</Label>
                            <Input placeholder="MM/YY" maxLength="5" required />
                        </FormGroup>
                        <FormGroup>
                            <Label>CVV</Label>
                            <Input placeholder="123" maxLength="4" type="password" required />
                        </FormGroup>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(196, 165, 232, 0.05)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', fontWeight: '700' }}>
                            <ShieldCheck size={20} /> Buyer Protection
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Your transaction is secured with 256-bit SSL encryption. We never store your full card details.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ width: '100%', padding: '1.25rem', marginTop: '2.5rem', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Processing Payment...' : 'Confirm Payment'}
                    </button>
                </form>
            </FormSection>
        </PaymentContainer>
    );
};

export default Payment;
