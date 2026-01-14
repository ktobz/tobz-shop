import React from 'react';
import { BookOpen, FileText, Code } from 'lucide-react';

const Resources = () => {
    const resourceCategories = [
        {
            icon: BookOpen,
            title: 'Documentation',
            description: 'Comprehensive guides and API documentation',
            links: ['Getting Started', 'API Reference', 'Best Practices', 'FAQ']
        },
        {
            icon: FileText,
            title: 'Tutorials',
            description: 'Step-by-step tutorials for common tasks',
            links: ['Store Setup', 'Product Management', 'Marketing Guide', 'Analytics']
        },
        {
            icon: Code,
            title: 'Developer Resources',
            description: 'Tools and resources for developers',
            links: ['API Docs', 'SDKs', 'Code Examples', 'Developer Community']
        },
    ];

    return (
        <div className="resources-page fade-in">
            <div className="resources-header">
                <h1>Resources & Support</h1>
                <p>Everything you need to succeed with 1shopapp</p>
            </div>

            <div className="resources-grid">
                {resourceCategories.map((category, i) => (
                    <div key={i} className="resource-card glass-panel">
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
                ))}
            </div>

            <section className="help-section">
                <div className="glass-panel help-card">
                    <h2>Can't find what you're looking for?</h2>
                    <p>Our support team is here to help. Contact us anytime!</p>
                    <button className="btn-primary">Contact Support</button>
                </div>
            </section>
        </div>
    );
};

export default Resources;
