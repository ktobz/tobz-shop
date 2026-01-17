import React, { useState, useEffect, lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { BookOpen, FileText, Code, Heart, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Lazy load components for code splitting
const TopPicksSection = lazy(() => import('./resources/TopPicksSection'));
const RelatedInterestsSection = lazy(() => import('./resources/RelatedInterestsSection'));
const StorylineSection = lazy(() => import('./resources/StorylineSection'));
const FAQSection = lazy(() => import('./resources/FAQSection'));

// Styled Components - Design System Tokens
const ResourcesPage = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  font-family: var(--font-sans);
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ResourcesHeader = styled.div`
  text-align: center;
  padding: 4rem 0 3rem;

  @media (max-width: 768px) {
    padding: 2rem 0 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  font-family: var(--font-display);
  margin-bottom: 1rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

const TextGradient = styled.span`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--text-secondary);
  font-weight: 500;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ResourceCard = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  padding: 2.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ResourceCardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: ${props => props.bgImage ? `url(${props.bgImage}) center/cover no-repeat` : 'linear-gradient(135deg, #362952, #453965)'};
  opacity: 0.4;
  z-index: 0;
`;

const ResourceCardContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 1rem;
`;

const ResourceIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(196, 165, 232, 0.2), rgba(255, 186, 210, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  position: relative;
  margin: 0 auto 1rem;

  &::after {
    content: '✦';
    position: absolute;
    top: -5px;
    left: -5px;
    font-size: 0.9rem;
    color: var(--secondary);
    animation: twinkle 3.2s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--text-primary);
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const ResourceLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
`;

const ResourceLink = styled.a`
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
  display: inline-block;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);

  &:hover {
    text-decoration: underline;
    background: rgba(196, 165, 232, 0.1);
  }
`;

const HelpSection = styled.section`
  padding: 4rem 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const HelpCard = styled.div`
  background: ${props => props.bgImage 
    ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${props.bgImage}) center/cover no-repeat`
    : 'var(--bg-card)'};
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const HelpTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--font-display);
  margin-bottom: 1rem;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HelpText = styled.p`
  color: var(--text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const PrimaryButton = styled.button`
  background: var(--gradient-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;

  &::before {
    content: '✦';
    position: absolute;
    right: -20px;
    opacity: 0;
    transition: all var(--transition-base);
    color: rgba(255, 255, 255, 0.8);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    padding-right: 2rem;
  }

  &:hover::before {
    right: 1rem;
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const LoadingFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  color: var(--text-secondary);
  font-size: 1rem;
`;

const Resources = () => {
    const { user } = useAuth();
    const [resourceImages, setResourceImages] = useState([]);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [watchlist, setWatchlist] = useState(new Set());

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=3');
                const data = await response.json();
                setResourceImages(data.map(item => item.image));
            } catch (err) {
                console.error('Failed to fetch images', err);
            }
        };
        fetchImages();

        // Load watchlist from localStorage
        const savedWatchlist = localStorage.getItem('resources_watchlist');
        if (savedWatchlist) {
            setWatchlist(new Set(JSON.parse(savedWatchlist)));
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleWatchlist = (id) => {
        setWatchlist(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            localStorage.setItem('resources_watchlist', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    const resourceCategories = [
        {
            icon: BookOpen,
            title: 'Documentation',
            description: 'Comprehensive guides and API documentation',
            links: ['Getting Started', 'API Reference', 'Best Practices', 'FAQ'],
            image: resourceImages[0]
        },
        {
            icon: FileText,
            title: 'Tutorials',
            description: 'Step-by-step tutorials for common tasks',
            links: ['Store Setup', 'Product Management', 'Marketing Guide', 'Analytics'],
            image: resourceImages[1]
        },
        {
            icon: Code,
            title: 'Developer Resources',
            description: 'Tools and resources for developers',
            links: ['API Docs', 'SDKs', 'Code Examples', 'Developer Community'],
            image: resourceImages[2]
        },
    ];

    return (
        <ResourcesPage>
            <ResourcesHeader>
                <HeroTitle>
                    Resources & <TextGradient>Support</TextGradient>
                </HeroTitle>
                <Subtitle>Everything you need to succeed with 1shopapp</Subtitle>
            </ResourcesHeader>

            <ResourcesGrid>
                {resourceCategories.map((category, i) => (
                    <ResourceCard key={i}>
                        <ResourceCardImage bgImage={category.image} />
                        <ResourceCardContent>
                            <ResourceIcon>
                                <category.icon size={40} />
                            </ResourceIcon>
                            <CardTitle>{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                            <ResourceLinks>
                                {category.links.map((link, idx) => (
                                    <li key={idx}>
                                        <ResourceLink href="#">{link}</ResourceLink>
                                    </li>
                                ))}
                            </ResourceLinks>
                        </ResourceCardContent>
                    </ResourceCard>
                ))}
            </ResourcesGrid>

            {/* Top Picks Section */}
            <Suspense fallback={<LoadingFallback>Loading Top Picks...</LoadingFallback>}>
                <TopPicksSection 
                    watchlist={watchlist} 
                    toggleWatchlist={toggleWatchlist}
                    user={user}
                />
            </Suspense>

            {/* Related Interests Section */}
            <Suspense fallback={<LoadingFallback>Loading Related Interests...</LoadingFallback>}>
                <RelatedInterestsSection user={user} />
            </Suspense>

            {/* Storyline Section */}
            <Suspense fallback={<LoadingFallback>Loading Storyline...</LoadingFallback>}>
                <StorylineSection />
            </Suspense>

            {/* FAQ Section */}
            <Suspense fallback={<LoadingFallback>Loading FAQ...</LoadingFallback>}>
                <FAQSection />
            </Suspense>

            <HelpSection>
                <HelpCard bgImage={resourceImages[1]}>
                    <HelpTitle>Can't find what you're looking for?</HelpTitle>
                    <HelpText>Our support team is here to help. Contact us anytime!</HelpText>
                    <PrimaryButton>Contact Support</PrimaryButton>
                </HelpCard>
            </HelpSection>

            <BackToTopButton visible={showBackToTop} onClick={scrollToTop} aria-label="Back to top">
                <ChevronUp size={24} />
            </BackToTopButton>
        </ResourcesPage>
    );
};

export default Resources;
