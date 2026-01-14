import React from 'react';
import { Award, Users, Zap, Globe } from 'lucide-react';

const About = () => {
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
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About 1shopapp</h1>
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
            <section className="about-section">
                <div className="section-content">
                    <h2>Our Mission</h2>
                    <p>
                        At 1shopapp, our mission is to empower merchants of all sizes with cutting-edge technology that makes 
                        selling online easier, faster, and more profitable. We believe that every business deserves access to 
                        world-class tools, regardless of their size or budget.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <h2>Our Values</h2>
                <div className="values-grid">
                    {values.map((value, i) => (
                        <div key={i} className="value-card glass-panel">
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
            <section className="about-section">
                <div className="section-content">
                    <h2>Our Team</h2>
                    <p>
                        Our team consists of experienced professionals from the e-commerce, technology, and customer service 
                        industries. We're passionate about solving problems and delivering exceptional value to our customers.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
