import React from 'react';
import styled from '@emotion/styled';
import { Rocket, Target, Users, ArrowRight, Heart, Zap } from 'lucide-react';

const JourneyContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  font-family: var(--font-sans);
`;

const Hero = styled.section`
  padding: 8rem 2rem;
  text-align: center;
  background: var(--gradient-primary);
  color: white;
  border-bottom-left-radius: 4rem;
  border-bottom-right-radius: 4rem;
`;

const ContentSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const StepCard = styled.div`
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const StepNumber = styled.span`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: var(--secondary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  box-shadow: var(--shadow-md);
`;

const JoinJourney = () => {
    return (
        <JourneyContainer className="fade-in">
            <Hero>
                <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem' }}>Join Our Journey</h1>
                <p style={{ fontSize: '1.5rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
                    Be a part of the most ambitious project in digital trade. Together, we can build the tools of tomorrow.
                </p>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-secondary" style={{ padding: '1rem 2.5rem', background: 'white', color: 'var(--primary)', border: 'none' }}>
                        Partner with Us
                    </button>
                    <button className="btn-outline" style={{ padding: '1rem 2.5rem', borderColor: 'white', color: 'white' }}>
                        View Careers
                    </button>
                </div>
            </Hero>

            <ContentSection>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Why Join <span className="text-gradient">1shopapp?</span></h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>We're not just building a product; we're building a movement.</p>
                </div>

                <Grid>
                    <StepCard>
                        <StepNumber>1</StepNumber>
                        <Zap size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                        <h3>Shared Vision</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>We believe in a world where every merchant has the power to succeed without technical barriers.</p>
                    </StepCard>

                    <StepCard>
                        <StepNumber>2</StepNumber>
                        <Heart size={32} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                        <h3>Community First</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Our journey is fueled by our merchants' feedback and our community's passion.</p>
                    </StepCard>

                    <StepCard>
                        <StepNumber>3</StepNumber>
                        <Users size={32} color="var(--info)" style={{ marginBottom: '1.5rem' }} />
                        <h3>Growth Mindset</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>We provide the resources and environment for you to reach your full potential alongside us.</p>
                    </StepCard>
                </Grid>

                <div style={{
                    marginTop: '8rem',
                    background: 'var(--bg-card)',
                    padding: '4rem',
                    borderRadius: '2rem',
                    border: '1px solid var(--glass-border)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Get Weekly Updates</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Follow our roadmap and get early access to new features.</p>
                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            style={{
                                flex: 1,
                                padding: '0.8rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white'
                            }}
                        />
                        <button className="btn-primary" style={{ padding: '0.8rem 2rem' }}>
                            Subscribe <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </div>
                </div>
            </ContentSection>
        </JourneyContainer>
    );
};

export default JoinJourney;
