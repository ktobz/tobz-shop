import React, { useState, useEffect } from 'react';
import { Zap, Shield, Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const clothingImages = [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop'
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % clothingImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + clothingImages.length) % clothingImages.length);
    };

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

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

    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-bg" style={{ backgroundImage: `url(${clothingImages[currentSlide]})` }}></div>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">Discover Amazing <span className="text-gradient">Products</span> Today</h1>
                        <p className="hero-subtitle">Welcome to 1shopapp - your modern e-commerce destination where style meets functionality. Explore curated collections with seamless shopping experience.</p>
                        <div className="hero-btns">
                            <NavLink to="/catalog" className="btn-primary">
                                Browse Products <ArrowRight size={20} />
                            </NavLink>
                            <NavLink to="/signup" className="btn-outline">Join Now</NavLink>
                        </div>
                    </div>
                    <div className="carousel-controls">
                        <button onClick={prevSlide} className="carousel-btn">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="carousel-btn">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
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
