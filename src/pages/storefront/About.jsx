import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Award, Users, Zap, Globe, Heart, Shield, Rocket, Target, Star, ChevronRight } from 'lucide-react';

const AboutContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  font-family: var(--font-sans);
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 2rem;
  background: ${props => props.bgImage ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.bgImage}) center/cover no-repeat` : 'var(--gradient-primary)'};
  border-bottom-left-radius: 4rem;
  border-bottom-right-radius: 4rem;
  margin-bottom: -4rem;
  z-index: 1;

  @media (max-width: 768px) {
    height: 60vh;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: var(--font-display);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  font-weight: 500;
`;

const GlassSection = styled.section`
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-3xl);
  padding: 5rem 4rem;
  margin: 2rem;
  position: relative;
  z-index: 2;
  box-shadow: var(--shadow-2xl);

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    margin: 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Badge = styled.span`
  background: rgba(196, 165, 232, 0.15);
  color: var(--primary);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: inline-block;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-family: var(--font-display);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
`;

const ValueCard = styled.div`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-10px);
    border-color: var(--primary);
    background: rgba(196, 165, 232, 0.05);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const CardText = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
`;

const StorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ImageComposition = styled.div`
  position: relative;
  height: 500px;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const MainImage = styled.div`
  width: 80%;
  height: 80%;
  background: ${props => `url(${props.src}) center/cover no-repeat`};
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-2xl);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const SubImage = styled.div`
  width: 60%;
  height: 60%;
  background: ${props => `url(${props.src}) center/cover no-repeat`};
  border-radius: var(--radius-3xl);
  box-shadow: var(--shadow-2xl);
  border: 8px solid var(--bg-page);
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem 2rem;
  background: var(--bg-card);
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;

const TeamCard = styled.div`
  text-align: center;
  padding-bottom: 2rem;
`;

const MemberPhoto = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: ${props => `url(${props.src}) center/cover no-repeat`};
  border: 4px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);

  &:hover {
    transform: scale(1.05);
    border-color: var(--primary);
  }
`;

const MemberName = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
`;

const About = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=10');
                const data = await response.json();
                setImages(data.map(item => item.image));
            } catch (err) {
                console.error('Failed to fetch images', err);
            }
        };
        fetchImages();
    }, []);

    const values = [
        { icon: Rocket, title: 'Innovation', desc: 'Pushing boundaries to create world-class e-commerce tools.' },
        { icon: Heart, title: 'Passion', desc: 'Driven by our love for technology and merchant success.' },
        { icon: Shield, title: 'Trust', desc: 'Reliability and security are at the core of everything we build.' },
        { icon: Globe, title: 'Impact', desc: 'Empowering businesses globally to reach their full potential.' }
    ];

    const stats = [
        { n: '10K+', l: 'Merchants' },
        { n: '50M+', l: 'Revenue' },
        { n: '200+', l: 'Countries' },
        { n: '24/7', l: 'Support' }
    ];

    return (
        <AboutContainer className="fade-in">
            <HeroSection bgImage={images[0]}>
                <HeroContent>
                    <HeroTitle>The Future of <span className="text-gradient">Commerce</span></HeroTitle>
                    <HeroSubtitle>We are on a mission to empower every merchant with the most advanced, beautiful, and functional tools on the planet.</HeroSubtitle>
                    <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Join Our Journey <ChevronRight size={20} />
                    </button>
                </HeroContent>
            </HeroSection>

            <GlassSection>
                <StorySection>
                    <ImageComposition>
                        <MainImage src={images[2] || '/api/placeholder/600/400'} />
                        <SubImage src={images[3] || '/api/placeholder/400/300'} />
                    </ImageComposition>
                    <div>
                        <Badge>Our Story</Badge>
                        <SectionTitle>Built by dreamers, for <span className="text-secondary">Doers</span>.</SectionTitle>
                        <CardText style={{ marginBottom: '2rem' }}>
                            Founded in 2024, 1shopapp started as a small project with a big vision:
                            to level the playing field for online merchants. We saw a gap in the market
                            between complex corporate systems and overly simple site builders.
                        </CardText>
                        <CardText>
                            Today, we provide a unified platform that combines powerful logistics,
                            stunning design, and advanced analytics. Our goal remains the same:
                            to make selling online as easy as clicking a button, while delivering
                            a premium experience that wows customers.
                        </CardText>
                    </div>
                </StorySection>
            </GlassSection>

            <StatGrid>
                {stats.map((s, i) => (
                    <StatItem key={i}>
                        <StatNumber>{s.n}</StatNumber>
                        <StatLabel>{s.l}</StatLabel>
                    </StatItem>
                ))}
            </StatGrid>

            <GlassSection>
                <SectionHeader>
                    <Badge>Our Values</Badge>
                    <SectionTitle>Guided by <span className="text-primary">Integrity</span></SectionTitle>
                    <CardText>We believe that success is only meaningful when it's built on a foundation of shared values and ethical practices.</CardText>
                </SectionHeader>
                <Grid>
                    {values.map((v, i) => (
                        <ValueCard key={i}>
                            <IconWrapper>
                                <v.icon size={32} />
                            </IconWrapper>
                            <CardTitle>{v.title}</CardTitle>
                            <CardText>{v.desc}</CardText>
                        </ValueCard>
                    ))}
                </Grid>
            </GlassSection>

            <GlassSection>
                <SectionHeader>
                    <Badge>The Team</Badge>
                    <SectionTitle>Meet the <span className="text-secondary">Visionaries</span></SectionTitle>
                    <CardText>Our diverse team of experts is dedicated to building the tools that will shape the future of digital trade.</CardText>
                </SectionHeader>
                <TeamGrid>
                    {[1, 2, 3, 4].map((n) => (
                        <TeamCard key={n}>
                            <MemberPhoto src={images[n + 4] || '/api/placeholder/200/200'} />
                            <MemberName>Core Member {n}</MemberName>
                            <MemberRole>{n % 2 === 0 ? 'Lead Architect' : 'Product Designer'}</MemberRole>
                        </TeamCard>
                    ))}
                </TeamGrid>
            </GlassSection>

            <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--gradient-primary)', color: 'white', borderTopLeftRadius: '4rem', borderTopRightRadius: '4rem' }}>
                <SectionTitle style={{ color: 'white' }}>Ready to elevate your business?</SectionTitle>
                <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>Join 10,000+ merchants who are already shaping their future with 1shopapp.</p>
                <button className="btn-secondary" style={{ padding: '1rem 3rem', background: 'white', color: 'var(--primary)', border: 'none' }}>
                    Get Started Now
                </button>
            </section>
        </AboutContainer>
    );
};

export default About;

