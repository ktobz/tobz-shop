import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Code } from 'lucide-react';

const Resources = () => {
    const [resourceImages, setResourceImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=3');
                const data = await response.json();
                setResourceImages(data.map(item => item.image));
            } catch (err) {
                console.error('Failed to fetch images', err);
            }
        };
        fetchImages();
    }, []);

    const resourceCategories = [
        {
            icon: BookOpen,
            title: 'Documentation',
            description: 'Comprehensive guides and API documentation',
            links: ['Getting Started', 'API Reference', 'Best Practices', 'FAQ'],
            image: resourceImages[0]
        },
        {
            icon: FileText,
            title: 'Tutorials',
            description: 'Step-by-step tutorials for common tasks',
            links: ['Store Setup', 'Product Management', 'Marketing Guide', 'Analytics'],
            image: resourceImages[1]
        },
        {
            icon: Code,
            title: 'Developer Resources',
            description: 'Tools and resources for developers',
            links: ['API Docs', 'SDKs', 'Code Examples', 'Developer Community'],
            image: resourceImages[2]
        },
    ];

    return (
        <div className="resources-page fade-in">
            <div className="resources-header">
                <h1 className="hero-title white-text">Resources & <span className="text-gradient">Support</span></h1>
                <p className="white-text">Everything you need to succeed with 1shopapp</p>
            </div>

            <div className="resources-grid">
                {resourceCategories.map((category, i) => (
                    <div key={i} className="resource-card glass-panel hvr-lift" style={{ overflow: 'hidden' }}>
                        <div className="resource-card-image" style={{ height: '150px', background: `url(${category.image}) center/cover no-repeat`, opacity: '0.4' }}></div>
                        <div style={{ padding: '2rem' }}>
                            <div className="resource-icon">
                                <category.icon size={40} />
                            </div>
                            <h3>{category.title}</h3>
                            <p className="resource-description">{category.description}</p>
                            <ul className="resource-links">
                                {category.links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href="#" className="resource-link">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <section className="help-section">
                <div className="glass-panel help-card" style={{ background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${resourceImages[1]}) center/cover no-repeat` }}>
                    <h2 className="white-text">Can't find what you're looking for?</h2>
                    <p className="white-text">Our support team is here to help. Contact us anytime!</p>
                    <button className="btn-primary">Contact Support</button>
                </div>
            </section>
        </div>
    );
};

export default Resources;
