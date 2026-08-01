import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Heart, Star, TrendingUp, ShoppingCart } from 'lucide-react';
import { useWatchlist } from '../../../hooks/useWatchlist';
import { useCart } from '../../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

import { fetchProducts } from '../../../services/mockApi';

// Section Container
const SectionContainer = styled.section`
  margin: 4rem 0;
  padding: 3rem 0;

  @media (max-width: 768px) {
    margin: 2rem 0;
    padding: 2rem 0;
  }
`;

// Section Header Component
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.02em;

  svg {
    color: #374151;
  }
`;

const SectionSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

// Scrollable Content Container
const ScrollableContent = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: var(--radius-full);

    &:hover {
      background: var(--primary-hover);
    }
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem 0;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
`;

const PickCard = styled.div`
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.06),
      0 12px 36px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.bgImage
    ? `url(${props.bgImage}) center/cover no-repeat`
    : 'linear-gradient(135deg, #374151, #1f2937)'};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
  }
`;

const WatchlistButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#ef4444' : '#6b7280'};
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  z-index: 2;

  &:hover {
    transform: scale(1.1);
    background: white;
    color: #ef4444;
  }

  svg {
    fill: ${props => props.active ? 'currentColor' : 'none'};
  }
`;

const CardContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDescription = styled.p`
  color: #374151;
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-light);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--warning);
  font-weight: 600;
  font-size: 0.9rem;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;
  color: #374151;
  background: rgba(0, 0, 0, 0.06);
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  letter-spacing: 0.5px;
`;

const TopPicksSection = ({ user }) => {
  const [topPicks, setTopPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await fetchProducts({ limit: 12 });
        setTopPicks(response.data);
      } catch (err) {
        console.error('Failed to fetch top picks', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopPicks();
  }, []);

  if (loading) {
    return (
      <SectionContainer>
        <SectionHeader>
          <div>
            <SectionTitle>
              <TrendingUp size={28} />
              Top Picks
            </SectionTitle>
            <SectionSubtitle>Loading curated picks for you...</SectionSubtitle>
          </div>
        </SectionHeader>
        <CardsGrid>
          {[...Array(4)].map((_, i) => (
            <PickCard key={i}>
              <CardImage />
              <CardContent>
                <div style={{ height: '16px', width: '60%', background: '#e5e7eb', borderRadius: '8px', marginBottom: '8px' }} />
                <div style={{ height: '14px', width: '90%', background: '#e5e7eb', borderRadius: '8px' }} />
                <div style={{ height: '14px', width: '40%', background: '#e5e7eb', borderRadius: '8px' }} />
              </CardContent>
            </PickCard>
          ))}
        </CardsGrid>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionHeader>
        <div>
          <SectionTitle>
            <TrendingUp size={28} />
            Top Picks
          </SectionTitle>
          <SectionSubtitle>
            {user ? `Personalized recommendations for ${user.displayName}` : 'Curated resources just for you'}
          </SectionSubtitle>
        </div>
      </SectionHeader>
      <ScrollableContent>
        <CardsGrid>
          {topPicks.map((pick) => (
            <PickCard key={pick.id}>
              <CardImage bgImage={pick.image}>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <WatchlistButton
                    active={isInWatchlist(pick.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(pick.id);
                    }}
                    aria-label={isInWatchlist(pick.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                    style={{ position: 'static' }}
                  >
                    <Heart size={20} />
                  </WatchlistButton>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: pick.id,
                        name: pick.name,
                        price: pick.price,
                        image: pick.image,
                        category: pick.category
                      });
                    }}
                    title="Add to Cart"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#374151',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      zIndex: 2
                    }}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </CardImage>
              <CardContent>
                <CategoryBadge>{pick.category}</CategoryBadge>
                <CardTitle>{pick.name}</CardTitle>
                <CardDescription>{pick.description}</CardDescription>
                <CardFooter>
                  <Rating>
                    <Star size={16} fill="currentColor" />
                    <span>{(pick.rating || 4.5).toFixed(1)}</span>
                  </Rating>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 700 }}>
                      ${pick.price}
                    </span>
                    <button
                      className="btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pick);
                        navigate('/checkout');
                      }}
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </CardFooter>
              </CardContent>
            </PickCard>
          ))}
        </CardsGrid>
      </ScrollableContent>
    </SectionContainer >
  );
};

export default TopPicksSection;
