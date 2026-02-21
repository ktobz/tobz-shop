import React, { useState, useEffect } from 'react';
import { Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import { fetchProducts } from '../../services/mockApi';

const LandingPage = () => {
    const heroImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop&q=80';

    const [heroProduct, setHeroProduct] = useState(null);
    const [loadingHero, setLoadingHero] = useState(true);

    // Fetch hero products using mockApi
    useEffect(() => {
        const fetchHero = async () => {
            try {
                setLoadingHero(true);
                const response = await fetchProducts({ limit: 1 });
                if (response.data && response.data.length > 0) {
                    setHeroProduct(response.data[0]);
                } else {
                    throw new Error('No products found');
                }
            } catch (err) {
                console.error('Failed to fetch hero product, using fallback:', err);
                setHeroProduct({
                    id: 'fallback-0',
                    image: heroImage,
                    title: 'Stunning Collections 2026',
                    category: 'Featured'
                });
            } finally {
                setLoadingHero(false);
            }
        };
        fetchHero();
    }, []);

    const valueProps = [
        {
            icon: Zap,
            title: 'Lightning Fast',
            desc: 'Optimized for speed and high conversion rates.'
        },
        {
            icon: Shield,
            title: 'Secure by Design',
            desc: 'Top-tier security for your customer data.'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            desc: 'Sell to anyone, anywhere in the world.'
        }
    ];

    const [featuredProducts, setFeaturedProducts] = useState([]);

    // Fetch featured products
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetchProducts({ limit: 8 });
                setFeaturedProducts(response.data);
            } catch (err) {
                console.error('Failed to fetch featured products:', err);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="landing-page">
            <section className="hero-section">
                {loadingHero ? (
                    <div className="hero-bg skeleton-shimmer"></div>
                ) : (
                    <div
                        className="hero-bg"
                        style={{
                            backgroundImage: `url(${heroProduct?.image || heroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>
                )}
                <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(20, 20, 20, 0.4), rgba(20, 20, 20, 0.1))', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
                    <div className="hero-content" style={{ maxWidth: '650px', zIndex: 3 }}>
                        <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                            {heroProduct ? (
                                <>Discover <span style={{ color: '#a78bfa' }}>Amazing {heroProduct.category || heroProduct.name}</span> Products</>
                            ) : (
                                <>Discover <span style={{ color: '#a78bfa' }}>Amazing Things</span> Today</>
                            )}
                        </h1>
                        <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: '#f1f5f9', marginBottom: '2.5rem', lineHeight: 1.6, textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
                            {heroProduct ? (heroProduct.title || heroProduct.description) : "Explore our premium hand-picked collections and discover unique products just for you."}
                        </p>
                        <div className="hero-btns" style={{ display: 'flex', gap: '1rem' }}>
                            <NavLink to="/catalog" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                                Browse Products <ArrowRight size={20} />
                            </NavLink>
                            <NavLink to="/signup" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Join Now</NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured-section" style={{ padding: '4rem 2rem' }}>
                <div className="section-header">
                    <h2>Featured <span className="text-gradient">Collections</span></h2>
                    <p>Hand-picked favorites just for you</p>
                </div>
                {featuredProducts.length > 0 ? (
                    <Carousel items={featuredProducts} itemsPerView={4} autoPlay={true} />
                ) : (
                    <div className="loading-spinner">Loading featured products...</div>
                )}
            </section>

            <section className="value-props">
                <div className="section-header">
                    <h2>Why Choose 1shopapp?</h2>
                    <p>Experience shopping like never before with our premium features.</p>
                </div>
                <div className="props-grid">
                    {valueProps.map((prop, i) => (
                        <div key={i} className="prop-card glass-panel">
                            <div className="prop-icon">
                                <prop.icon size={32} />
                            </div>
                            <h3>{prop.title}</h3>
                            <p>{prop.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <div className="glass-panel cta-card">
                    <h2>Ready to start shopping?</h2>
                    <p>Join thousands of happy customers who trust 1shopapp for their shopping needs.</p>
                    <NavLink to="/signup" className="btn-primary">Get Started Now</NavLink>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
