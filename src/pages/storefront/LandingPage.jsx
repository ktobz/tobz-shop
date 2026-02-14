import React, { useState, useEffect } from 'react';
import { Zap, Shield, Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Carousel from '../../components/Carousel';

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const clothingImages = [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop'
    ];

    const [heroProducts, setHeroProducts] = useState([]);
    const [loadingHero, setLoadingHero] = useState(true);

    const nextSlide = () => {
        if (heroProducts.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    };

    const prevSlide = () => {
        if (heroProducts.length === 0) return;
        setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
    };

    // Fetch hero products (first 4 items from jewelry or electronics for variety)
    useEffect(() => {
        const fetchHero = async () => {
            try {
                setLoadingHero(true);
                const response = await fetch('https://fakestoreapi.com/products?limit=4');
                if (!response.ok) throw new Error('API unstable');
                const data = await response.json();
                if (data && data.length > 0) {
                    setHeroProducts(data);
                } else {
                    throw new Error('Empty data');
                }
            } catch (err) {
                console.error('Failed to fetch hero products, using fallbacks:', err);
                // Fallback to high-quality unsplash images if API fails
                setHeroProducts(clothingImages.map((img, i) => ({
                    id: `fallback-${i}`,
                    image: img,
                    title: 'Premium Collections 2026',
                    category: 'New Arrivals'
                })));
            } finally {
                setLoadingHero(false);
            }
        };
        fetchHero();
    }, []);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [heroProducts]);

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
                const response = await fetch('https://fakestoreapi.com/products?limit=8');
                const data = await response.json();
                // Map API data to Carousel expected format
                const formattedProducts = data.map(product => ({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category
                }));
                setFeaturedProducts(formattedProducts);
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
                            backgroundImage: `url(${heroProducts.length > 0 ? heroProducts[currentSlide].image : clothingImages[currentSlide]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>
                )}
                <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.2))', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
                    <div className="hero-content" style={{ maxWidth: '600px', zIndex: 2 }}>
                        <h1 className="hero-title" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            {heroProducts.length > 0 ? (
                                <>Discover <span style={{ color: '#6d28d9' }}>{heroProducts[currentSlide].category}</span> Today</>
                            ) : (
                                <>Discover Amazing <span style={{ color: '#6d28d9' }}>Products</span> Today</>
                            )}
                        </h1>
                        <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            {heroProducts.length > 0 ? heroProducts[currentSlide].title : "Welcome to 1shopapp - your modern e-commerce destination where style meets functionality."}
                        </p>
                        <div className="hero-btns" style={{ display: 'flex', gap: '1rem' }}>
                            <NavLink to="/catalog" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                                Browse Products <ArrowRight size={20} />
                            </NavLink>
                            <NavLink to="/signup" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Join Now</NavLink>
                        </div>
                    </div>
                    {heroProducts.length > 1 && (
                        <div className="carousel-controls" style={{ position: 'absolute', bottom: '2rem', right: '4rem', display: 'flex', gap: '1rem' }}>
                            <button onClick={prevSlide} className="carousel-btn icon-btn" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextSlide} className="carousel-btn icon-btn" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
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
