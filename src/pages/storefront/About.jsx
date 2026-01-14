import React, { useState, useEffect } from 'react';
import { Award, Users, Zap, Globe } from 'lucide-react';

const About = () => {
    const [heroImage, setHeroImage] = useState('');
    const [teamImages, setTeamImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=5');
                const data = await response.json();
                setHeroImage(data[0]?.image);
                setTeamImages(data.slice(1).map(item => item.image));
            } catch (err) {
                console.error('Failed to fetch images', err);
            }
        };
        fetchImages();
    }, []);

    const stats = [
        { number: '10K+', label: 'Active Users' },
        { number: '50K+', label: 'Products Sold' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' },
    ];

    const values = [
        {
            icon: Award,
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of our service.'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a community of satisfied customers and partners.'
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'Continuously innovating to bring the best solutions.'
        },
        {
            icon: Globe,
            title: 'Global',
            description: 'Serving customers worldwide with local expertise.'
        },
    ];

    return (
        <div className="about-page fade-in">
            {/* Hero Section */}
            <section className="about-hero" style={{ background: heroImage ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage}) center/cover no-repeat` : 'var(--gradient-primary)' }}>
                <div className="about-hero-content">
                    <h1 className="hero-title">About <span className="text-gradient">1shopapp</span></h1>
                    <p>We're building the future of e-commerce with modern, powerful tools for merchants worldwide.</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats">
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-card glass-panel">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section glass-panel" style={{ margin: '4rem 2rem', padding: '4rem 2rem' }}>
                <div className="section-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2>Our Mission</h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            At 1shopapp, our mission is to empower merchants of all sizes with cutting-edge technology that makes
                            selling online easier, faster, and more profitable. We believe that every business deserves access to
                            world-class tools, regardless of their size or budget.
                        </p>
                    </div>
                    <div className="image-placeholder glass-panel" style={{ height: '300px', background: `url(${teamImages[0]}) center/cover no-repeat`, borderRadius: '20px' }}></div>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Values</h2>
                <div className="values-grid">
                    {values.map((value, i) => (
                        <div key={i} className="value-card glass-panel hvr-lift">
                            <div className="value-icon">
                                <value.icon size={32} />
                            </div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section className="about-section" style={{ padding: '6rem 2rem' }}>
                <div className="section-content">
                    <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <div className="team-member-img" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 1rem', background: `url(${teamImages[i]}) center/cover no-repeat` }}></div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Team Member {i + 1}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>E-commerce Specialist</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
