import React from 'react';
import styled from '@emotion/styled';
import { useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  font-family: var(--font-sans);
`;

const Hero = styled.section`
  padding: 8rem 2rem;
  background: var(--gradient-primary);
  color: white;
  text-align: center;
  border-bottom-left-radius: 4rem;
  border-bottom-right-radius: 4rem;
`;

const ContentSection = styled.section`
  padding: 6rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: 40vh;
`;

const GenericPage = ({ title: propTitle, description: propDescription }) => {
    const { id, topic } = useParams();
    const location = useLocation();

    let finalTitle = propTitle || 'Page Not Found';
    let finalDescription = propDescription || 'The content you are looking for is currently under construction.';

    if (location.pathname.includes('/category/')) {
        finalTitle = `${id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Category'}`;
        finalDescription = `Explore our wide selection of ${finalTitle} products, featuring the latest trends and top brands.`;
    } else if (location.pathname.includes('/docs/')) {
        finalTitle = `${topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : 'Documentation'}`;
        finalDescription = `Comprehensive guides and reference material for ${finalTitle}.`;
    }

    return (
        <PageContainer className="fade-in">
            <Hero>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>{finalTitle}</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{finalDescription}</p>
            </Hero>
            <ContentSection>
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Coming Soon</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        We are working hard to bring you the best experience. This page is currently being updated.
                    </p>
                    <button className="btn-primary" onClick={() => window.history.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem' }}>
                        <ArrowLeft size={18} /> Go Back
                    </button>
                </div>
            </ContentSection>
        </PageContainer>
    );
};

export default GenericPage;
