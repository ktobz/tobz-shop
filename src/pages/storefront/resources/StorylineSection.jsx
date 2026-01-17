import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BookOpen, ChevronDown } from 'lucide-react';

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

const StorylineCard = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
`;

const StorylineHeader = styled.button`
  width: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(196, 165, 232, 0.05);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(196, 165, 232, 0.2), rgba(255, 186, 210, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const HeaderSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ExpandIcon = styled.div`
  color: var(--primary);
  transition: transform var(--transition-base);
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
`;

const StorylineContent = styled.div`
  max-height: ${props => props.expanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height var(--transition-slow), padding var(--transition-base);
  padding: ${props => props.expanded ? '0 2rem 2rem' : '0 2rem'};
  opacity: ${props => props.expanded ? '1' : '0'};

  @media (max-width: 768px) {
    padding: ${props => props.expanded ? '0 1.5rem 1.5rem' : '0 1.5rem'};
  }
`;

const ContentText = styled.div`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
    list-style: disc;

    li {
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
    }
  }
`;

const StorylineSection = () => {
    const [expanded, setExpanded] = useState(false);

    const storyline = {
        title: 'Our Story',
        subtitle: 'Building the future of e-commerce',
        content: `
            <p>
                <strong>1shopapp</strong> was born from a simple vision: to make e-commerce accessible, powerful, and beautiful for everyone. 
                Whether you're a small business owner or a large enterprise, we believe you deserve tools that work seamlessly and look stunning.
            </p>
            <p>
                Our journey began in 2023 when we noticed a gap in the market. Existing e-commerce platforms were either too complex, 
                too expensive, or lacked the modern design that today's businesses need. We set out to change that.
            </p>
            <p><strong>What makes us different:</strong></p>
            <ul>
                <li>Modern, intuitive interface designed for the 2020s</li>
                <li>Powerful features without the complexity</li>
                <li>Affordable pricing that scales with your business</li>
                <li>Dedicated support team that actually cares</li>
                <li>Continuous innovation based on user feedback</li>
            </ul>
            <p>
                Today, thousands of businesses trust 1shopapp to power their online stores. We're constantly evolving, 
                adding new features, and improving based on what our community tells us they need.
            </p>
            <p>
                Join us on this journey. Whether you're just starting out or looking to scale, we're here to help you succeed.
            </p>
        `
    };

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>
                    <BookOpen size={28} />
                    Storyline
                </SectionTitle>
                <SectionSubtitle>Learn about our mission and values</SectionSubtitle>
            </SectionHeader>
            <StorylineCard>
                <StorylineHeader onClick={() => setExpanded(!expanded)}>
                    <HeaderContent>
                        <IconWrapper>
                            <BookOpen size={24} />
                        </IconWrapper>
                        <HeaderText>
                            <HeaderTitle>{storyline.title}</HeaderTitle>
                            <HeaderSubtitle>{storyline.subtitle}</HeaderSubtitle>
                        </HeaderText>
                    </HeaderContent>
                    <ExpandIcon expanded={expanded}>
                        <ChevronDown size={24} />
                    </ExpandIcon>
                </StorylineHeader>
                <StorylineContent expanded={expanded}>
                    <ContentText dangerouslySetInnerHTML={{ __html: storyline.content }} />
                </StorylineContent>
            </StorylineCard>
        </SectionContainer>
    );
};

export default StorylineSection;
