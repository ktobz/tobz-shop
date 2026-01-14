import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Star, Sparkles } from 'lucide-react';

const WhatsNew = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const slides = [
        {
            id: 1,
            title: 'New Analytics Dashboard',
            description: 'Get deeper insights into your business with our completely redesigned analytics dashboard. Track metrics in real-time and make data-driven decisions.',
            icon: Zap,
            color: '#4F46E5',
            image: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
        },
        {
            id: 2,
            title: 'AI-Powered Recommendations',
            description: 'Our new AI engine learns from customer behavior to provide personalized product recommendations, increasing conversion rates by up to 40%.',
            icon: Star,
            color: '#F59E0B',
            image: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        },
        {
            id: 3,
            title: 'Mobile App Launch',
            description: 'Shop on the go with our brand new mobile app. Available on iOS and Android with exclusive mobile-only deals and features.',
            icon: Sparkles,
            color: '#10B981',
            image: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        },
    ];

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoPlay, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setAutoPlay(false);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setAutoPlay(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setAutoPlay(false);
    };

    const slide = slides[currentSlide];
    const Icon = slide.icon;

    return (
        <div className="whats-new-page fade-in">
            <div className="whats-new-header">
                <h1>What's New at 1shopapp</h1>
                <p>Discover the latest features and improvements</p>
            </div>

            <div className="carousel-container">
                <div className="carousel-wrapper">
                    {slides.map((item, index) => (
                        <div
                            key={item.id}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ opacity: index === currentSlide ? 1 : 0 }}
                        >
                            <div className="slide-content">
                                <div
                                    className="slide-visual"
                                    style={{ background: item.image }}
                                >
                                    <Icon size={120} color="white" />
                                </div>

                                <div className="slide-info">
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    <button className="btn-primary">Learn More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    className="carousel-nav carousel-nav-prev"
                    onClick={prevSlide}
                    title="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    className="carousel-nav carousel-nav-next"
                    onClick={nextSlide}
                    title="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dots Navigation */}
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            title={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Featured Updates Grid */}
            <section className="featured-updates">
                <h2>Featured Updates</h2>
                <div className="updates-grid">
                    {slides.map((item) => (
                        <div key={item.id} className="update-card glass-panel">
                            <div
                                className="update-icon"
                                style={{ background: `${item.color}20`, color: item.color }}
                            >
                                <item.icon size={32} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WhatsNew;
