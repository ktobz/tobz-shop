import React from 'react';
import styled from '@emotion/styled';
import { Sparkles, ArrowRight, Laptop, Shirt, Home, Trophy, BookOpen, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SectionContainer = styled.section`
  margin: 4rem 0;
  padding: 3rem 0;

  @media (max-width: 768px) {
    margin: 2rem 0;
    padding: 2rem 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  svg {
    color: #374151;
  }
`;

const SectionSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InterestCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #111827, #374151, #6b7280, #374151, #111827);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.06),
      0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);

    &::before {
      transform: scaleX(1);
    }

    .card-arrow {
      transform: translateX(4px);
      color: #111827;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  ${InterestCard}:hover & {
    transform: scale(1.08);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  flex: 1;
  letter-spacing: -0.01em;
`;

const CardArrow = styled(ArrowRight)`
  color: #6b7280;
  transition: all 0.3s ease;
  flex-shrink: 0;
`;

const CardDescription = styled.p`
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  background: rgba(0, 0, 0, 0.06);
  color: #374151;
  border-radius: 9999px;
  font-weight: 600;
`;

const RelatedInterestsSection = () => {
  const navigate = useNavigate();

  const interests = [
    {
      id: 1,
      icon: Laptop,
      title: 'Electronics',
      description: 'Discover the latest gadgets and tech products to enhance your digital lifestyle.',
      tags: ['Gadgets', 'Tech', 'Innovation']
    },
    {
      id: 2,
      icon: Shirt,
      title: 'Fashion & Apparel',
      description: 'Explore trendy clothing and accessories to express your unique style.',
      tags: ['Clothing', 'Style', 'Trends']
    },
    {
      id: 3,
      icon: Home,
      title: 'Home & Garden',
      description: 'Find everything for your home and outdoor spaces, from decor to gardening tools.',
      tags: ['Home', 'Garden', 'Decor']
    },
    {
      id: 4,
      icon: Sparkles,
      title: 'Beauty & Personal Care',
      description: 'Shop for cosmetics and wellness products to pamper yourself and glow.',
      tags: ['Cosmetics', 'Care', 'Wellness']
    },
    {
      id: 5,
      icon: Trophy,
      title: 'Sports & Outdoors',
      description: 'Gear up for your favorite sports and activities with top-quality equipment.',
      tags: ['Sports', 'Fitness', 'Outdoor']
    },
    {
      id: 6,
      icon: BookOpen,
      title: 'Books & Media',
      description: 'Browse books, movies, and digital media for entertainment and learning.',
      tags: ['Books', 'Media', 'Entertainment']
    },
    {
      id: 7,
      icon: Car,
      title: 'Automotive & Tools',
      description: 'Parts and tools for your vehicle and DIY projects to keep things running smoothly.',
      tags: ['Auto', 'Tools', 'Parts']
    }
  ];

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <Sparkles size={28} />
          Related Interests
        </SectionTitle>
        <SectionSubtitle>
          Explore topics that might interest you
        </SectionSubtitle>
      </SectionHeader>
      <InterestsGrid>
        {interests.map((interest) => {
          const catSlug = interest.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <InterestCard key={interest.id} onClick={() => navigate(`/category/${catSlug}`)}>
              <CardHeader>
                <IconWrapper>
                  <interest.icon size={28} />
                </IconWrapper>
                <CardTitle>{interest.title}</CardTitle>
                <CardArrow className="card-arrow" size={20} />
              </CardHeader>
              <CardDescription>{interest.description}</CardDescription>
              <CardTags>
                {interest.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </CardTags>
            </InterestCard>
          );
        })}
      </InterestsGrid>
    </SectionContainer>
  );
};

export default RelatedInterestsSection;
