import React from 'react';
import styled from '@emotion/styled';
import { Sparkles, ArrowRight, Laptop, Shirt, Home, Trophy, BookOpen, Car } from 'lucide-react';

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
  font-family: var(--font-display);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  svg {
    color: var(--primary);
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-secondary);
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
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-base);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);

    &::before {
      transform: scaleX(1);
    }

    .card-arrow {
      transform: translateX(4px);
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
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(196, 165, 232, 0.2), rgba(255, 186, 210, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--text-primary);
  flex: 1;
`;

const CardArrow = styled(ArrowRight)`
  color: var(--primary);
  transition: transform var(--transition-base);
  flex-shrink: 0;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
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
  background: rgba(196, 165, 232, 0.15);
  color: var(--primary);
  border-radius: var(--radius-full);
  font-weight: 600;
`;

const RelatedInterestsSection = () => {
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
        {interests.map((interest) => (
          <InterestCard key={interest.id}>
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
        ))}
      </InterestsGrid>
    </SectionContainer>
  );
};

export default RelatedInterestsSection;
