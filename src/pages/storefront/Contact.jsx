import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [heroImage, setHeroImage] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=10');
                const data = await response.json();
                setHeroImage(data[9]?.image); // Use a different image than about
            } catch (err) {
                console.error('Failed to fetch image', err);
            }
        };
        fetchImage();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            detail: 'support@1shopapp.com',
            description: 'We\'ll respond within 24 hours'
        },
        {
            icon: Phone,
            title: 'Phone',
            detail: '+1 (555) 123-4567',
            description: 'Available Monday-Friday, 9AM-6PM EST'
        },
        {
            icon: MapPin,
            title: 'Address',
            detail: '123 Commerce Street',
            description: 'San Francisco, CA 94105'
        },
    ];

    return (
        <div className="contact-page fade-in">
            {/* Hero Section */}
            <section className="contact-hero" style={{ background: heroImage ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroImage}) center/cover no-repeat` : 'var(--gradient-primary)', padding: '6rem 2rem' }}>
                <h1 className="hero-title white-text">Get in <span className="text-gradient">Touch</span></h1>
                <p className="white-text" style={{ maxWidth: '600px', margin: '0 auto' }}>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </section>

            <div className="contact-container">
                {/* Contact Info Cards */}
                <section className="contact-info">
                    <div className="info-grid">
                        {contactInfo.map((info, i) => (
                            <div key={i} className="info-card glass-panel">
                                <div className="info-icon">
                                    <info.icon size={32} />
                                </div>
                                <h3>{info.title}</h3>
                                <p className="info-detail">{info.detail}</p>
                                <p className="info-description">{info.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="contact-form-section">
                    <div className="glass-panel form-container">
                        <h2>Send us a Message</h2>
                        {submitted ? (
                            <div className="success-message">
                                <p>✓ Thanks for reaching out! We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more..."
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-primary submit-btn">
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
