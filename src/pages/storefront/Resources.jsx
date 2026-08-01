import React, { useState, useEffect, lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { BookOpen, FileText, Code, Heart, ChevronUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';
import { fetchProducts } from '../../services/mockApi';

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
  font-weight: 900;
  margin-bottom: 1rem;
  color: #111827;
  letter-spacing: -0.03em;
  line-height: 1.15;
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
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 6px 16px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.05),
      0 12px 36px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(0, 0, 0, 0.06);
    border-color: rgba(156, 163, 175, 0.5);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }
`;

const ResourceCardImage = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => props.bgImage ? `url(${props.bgImage}) center/cover no-repeat` : 'linear-gradient(135deg, #374151, #1f2937)'};
  z-index: 0;
  border-radius: 20px;
`;

const ResourceCardContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 1rem;
`;

const ResourceIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0 auto 0.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  transition: transform 0.3s ease;

  .card:hover & {
    transform: scale(1.06);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 2px rgba(255,255,255,0.5);
`;

const CardDescription = styled.p`
  color: #374151;
  line-height: 1.55;
  margin-bottom: 1rem;
  font-size: 0.92rem;
  font-weight: 500;
`;

const ResourceLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  align-items: center;
  padding: 0;
`;

const ResourceLink = styled(NavLink)`
  color: #374151;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.18s ease;
  display: inline-block;
  font-size: 0.875rem;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #111827;
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
    ? `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${props.bgImage}) center/cover no-repeat`
    : 'rgba(255,255,255,0.65)'};
  backdrop-filter: blur(22px) saturate(200%);
  -webkit-backdrop-filter: blur(22px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 24px;
  padding: 3rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }
`;

const HelpTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: #111827;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HelpText = styled.p`
  color: #6b7280;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const PrimaryButton = styled.button`
  background: #111827;
  color: white;
  padding: 0.85rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.02em;

  &:hover {
    background: #374151;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
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
  border-radius: 14px;
  background: #111827;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};

  &:hover {
    background: #374151;
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
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
  const { toggleWatchlist } = useWatchlist();
  const [resourceImages, setResourceImages] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetchProducts({ limit: 3 });
        setResourceImages(response.data.map(item => item.image));
      } catch (err) {
        console.error('Failed to fetch images', err);
      }
    };
    fetchImages();
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

  const toggleWatchlistHandler = (id) => {
    toggleWatchlist(id);
  };

  const resourceCategories = [
    {
      icon: BookOpen,
      title: 'Our Apps',
      description: 'Explore our ecosystem of powerful applications',
      links: [
        { label: 'Inventory App', path: '/inventory' },
        { label: 'Analytics Pro', path: '/dashboard/analytics' },
        { label: 'Marketing Suite', path: '/marketing' },
        { label: 'Support Tools', path: '/contact' }
      ],
      image: resourceImages[0]
    },
    {
      icon: FileText,
      title: 'Tutorials',
      description: 'Step-by-step tutorials for common tasks',
      links: [
        { label: 'Store Setup', path: '/contact' },
        { label: 'Product Management', path: '/inventory' },
        { label: 'Marketing Guide', path: '/marketing' },
        { label: 'Analytics', path: '/dashboard/analytics' }
      ],
      image: resourceImages[1]
    },
    {
      icon: Code,
      title: 'Developer Resources',
      description: 'Tools and resources for developers',
      links: [
        { label: 'API Docs', path: '/docs/api' },
        { label: 'SDKs', path: '/docs/sdk' },
        { label: 'Code Examples', path: '/docs/examples' },
        { label: 'Developer Community', path: '/contact' }
      ],
      image: resourceImages[2]
    },
  ];

  return (
    <ResourcesPage>
      <ResourcesHeader>
        <HeroTitle>Apps &amp; Resources</HeroTitle>
        <Subtitle>Discover powerful applications and helpful guides for 1shopapp</Subtitle>
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
                {category.links.map((linkObj, idx) => (
                  <li key={idx}>
                    <ResourceLink to={linkObj.path}>{linkObj.label}</ResourceLink>
                  </li>
                ))}
              </ResourceLinks>
            </ResourceCardContent>
          </ResourceCard>
        ))}
      </ResourcesGrid>

      <Suspense fallback={<LoadingFallback>Loading Top Picks...</LoadingFallback>}>
        <TopPicksSection
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
