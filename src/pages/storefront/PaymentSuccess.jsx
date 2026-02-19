import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 8rem auto;
  padding: 4rem 2rem;
  background: var(--bg-card);
  border-radius: var(--radius-3xl);
  border: 1px solid var(--glass-border);
  text-align: center;
  box-shadow: var(--shadow-2xl);
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 2.5rem;
  box-shadow: 0 0 30px rgba(196, 165, 232, 0.4);
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes scaleIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: var(--font-display);
`;

const Text = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentSuccess = () => {
    return (
        <SuccessContainer className="fade-in">
            <IconWrapper>
                <CheckCircle size={60} />
            </IconWrapper>
            <Title>Order <span className="text-gradient">Placed!</span></Title>
            <Text>
                Thank you for your purchase. We've sent a confirmation email to your inbox.
                Your order #12345 is being processed and will ship soon.
            </Text>

            <ActionButtons>
                <Link to="/catalog" className="btn-primary" style={{ padding: '1rem', width: '100%' }}>
                    Continue Shopping <ShoppingBag size={18} style={{ marginLeft: '0.5rem' }} />
                </Link>
                <Link to="/dashboard" className="btn-outline" style={{ padding: '1rem', width: '100%' }}>
                    Track Order <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                </Link>
            </ActionButtons>
        </SuccessContainer>
    );
};

export default PaymentSuccess;
