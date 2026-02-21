import React from 'react';
import styled from '@emotion/styled';
import { Megaphone, BarChart, Globe, Zap, Target, Star } from 'lucide-react';

const MarketingContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  font-family: var(--font-sans);
`;

const Hero = styled.section`
  padding: 10rem 2rem;
  background: var(--gradient-primary);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: var(--bg-page);
    transform: skewY(-2deg);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 6rem 2rem;
`;

const Card = styled.div`
  background: var(--bg-card);
  padding: 3rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
  }
`;

const Marketing = () => {
    return (
        <MarketingContainer className="fade-in">
            <Hero>
                <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Grow Your <span style={{ color: '#fff' }}>Impact</span></h1>
                <p style={{ fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
                    Advanced marketing tools designed to help you reach the right audience at the right time.
                </p>
            </Hero>

            <FeatureGrid>
                <Card>
                    <Megaphone size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Omnichannel Reach</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.7' }}>
                        Launch campaigns across social media, email, and search engines from a single unified dashboard.
                    </p>
                </Card>

                <Card>
                    <BarChart size={40} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Real-time Analytics</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.7' }}>
                        Track Every conversion and understand your ROI with precision depth analytics and heatmaps.
                    </p>
                </Card>

                <Card>
                    <Globe size={40} color="var(--info)" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Global SEO</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.7' }}>
                        Optimize your store for international markets with automated localization and SEO tools.
                    </p>
                </Card>

                <Card>
                    <Zap size={40} color="#FFD700" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>AI Campaigns</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.7' }}>
                        Let our AI generate high-converting copy and target segments based on behavioral data.
                    </p>
                </Card>
            </FeatureGrid>

            <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem' }}>Ready to Scale?</h2>
                <button className="btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.2rem' }}>
                    Start Free Trial
                </button>
            </section>
        </MarketingContainer>
    );
};

export default Marketing;
