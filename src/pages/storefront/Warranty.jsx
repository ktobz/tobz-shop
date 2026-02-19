import React from 'react';
import styled from '@emotion/styled';
import { ShieldCheck, RotateCcw, Truck, HelpCircle } from 'lucide-react';

const Container = styled.div`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 2rem;
  font-family: var(--font-sans);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  font-family: var(--font-display);
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const PolicyCard = styled.div`
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
`;

const IconWrapper = styled.div`
  color: var(--primary);
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
`;

const Warranty = () => {
    return (
        <Container className="fade-in">
            <Title>Warranty & <span className="text-primary">Returns</span></Title>

            <Grid>
                <PolicyCard>
                    <IconWrapper><ShieldCheck size={40} /></IconWrapper>
                    <CardTitle>Limited Warranty</CardTitle>
                    <CardText>
                        All hardware products purchased from 1shopapp come with a 1-year limited warranty
                        covering manufacturing defects. This warranty does not cover accidental damage
                        or normal wear and tear.
                    </CardText>
                </PolicyCard>

                <PolicyCard>
                    <IconWrapper><RotateCcw size={40} /></IconWrapper>
                    <CardTitle>30-Day Returns</CardTitle>
                    <CardText>
                        Not satisfied? We offer a 30-day money-back guarantee. Items must be in their
                        original packaging and unused condition to be eligible for a full refund.
                    </CardText>
                </PolicyCard>

                <PolicyCard>
                    <IconWrapper><Truck size={40} /></IconWrapper>
                    <CardTitle>Global Shipping</CardTitle>
                    <CardText>
                        We ship to over 200 countries. Delivery times vary between 3-10 business days
                        depending on your location and selected shipping method.
                    </CardText>
                </PolicyCard>

                <PolicyCard>
                    <IconWrapper><HelpCircle size={40} /></IconWrapper>
                    <CardTitle>24/7 Support</CardTitle>
                    <CardText>
                        Our support team is always here to help with your warranty claims or return requests.
                        Contact us anytime through our support portal.
                    </CardText>
                </PolicyCard>
            </Grid>
        </Container>
    );
};

export default Warranty;
