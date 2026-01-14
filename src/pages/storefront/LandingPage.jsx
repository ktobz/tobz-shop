import React from 'react';
import { Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
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
                <div className="hero-content">
                    <h1 className="hero-title">Discover Amazing <span className="text-gradient">Products</span> Today</h1>
                    <p className="hero-subtitle">Welcome to 1shopapp - your modern e-commerce destination where style meets functionality. Explore curated collections with seamless shopping experience.</p>
                    <div className="hero-btns">
                        <NavLink to="/catalog" className="btn-primary">
                            Start Shopping <ArrowRight size={20} />
                        </NavLink>
                        <NavLink to="/signup" className="btn-outline">Join Now</NavLink>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glass-card mockup-card">
                        <div className="mockup-header"></div>
                        <div className="mockup-body">
                            <div className="mockup-line long"></div>
                            <div className="mockup-line short"></div>
                            <div className="mockup-grid">
                                <div className="mockup-item"></div>
                                <div className="mockup-item"></div>
                            </div>
                        </div>
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
