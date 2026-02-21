import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Mail, Send, MapPin, MessageCircle, ChevronRight, Search, Book, CreditCard, User, Shield, Target, Zap } from 'lucide-react';
import FAQSection from './resources/FAQSection';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  font-family: var(--font-sans);
`;

const Hero = styled.section`
  padding: 8rem 2rem;
  background: var(--gradient-primary);
  color: white;
  text-align: center;
  border-bottom-left-radius: 4rem;
  border-bottom-right-radius: 4rem;
`;

const SearchBox = styled.div`
  max-width: 600px;
  margin: 3rem auto 0;
  position: relative;

  input {
    width: 100%;
    padding: 1.25rem 1.5rem 1.25rem 3.5rem;
    border-radius: var(--radius-full);
    border: none;
    background: white;
    box-shadow: var(--shadow-xl);
    font-size: 1.1rem;
    color: var(--text-primary);
    outline: none;

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  svg {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 6rem 2rem;
`;

const CategoryCard = styled.div`
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
  }
`;

const ContactSection = styled.section`
  padding: 6rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 6rem;
  background: var(--bg-card);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  .icon {
    width: 50px;
    height: 50px;
    background: rgba(196, 165, 232, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }
`;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { icon: Book, title: 'Documentation', desc: 'Detailed guides on how to use our platform and features.' },
    { icon: CreditCard, title: 'Billing & Plans', desc: 'Questions about invoices, payments, and subscription tiers.' },
    { icon: User, title: 'Account Settings', desc: 'Manage your profile, security, and team permissions.' },
    { icon: Shield, title: 'Security & Privacy', desc: 'Learn about how we protect your data and privacy.' },
    { icon: Target, title: 'Marketing Tools', desc: 'Tutorials on launching and tracking your campaigns.' },
    { icon: Zap, title: 'API & Integrations', desc: 'Technical docs for developers and third-party apps.' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageContainer className="fade-in">
      <Hero>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900' }}>How can we <span style={{ color: '#fff' }}>help?</span></h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginTop: '1rem' }}>Search our help center or speak with a specialist.</p>
        <SearchBox>
          <Search />
          <input type="text" placeholder="Search for answers..." />
        </SearchBox>
      </Hero>

      <CategoryGrid>
        {categories.map((cat, i) => (
          <CategoryCard key={i}>
            <cat.icon size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.75rem' }}>{cat.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{cat.desc}</p>
            <div style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Learn more <ChevronRight size={16} />
            </div>
          </CategoryCard>
        ))}
      </CategoryGrid>

      <ContactSection>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>Contact Us</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Prefer to talk? Reach out to our team directly. We're available 24/7 to assist you.
          </p>

          <InfoItem>
            <div className="icon"><Mail size={24} /></div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Email Us</h4>
              <p style={{ color: 'var(--text-secondary)' }}>support@1shopapp.com</p>
            </div>
          </InfoItem>

          <InfoItem>
            <div className="icon"><MessageCircle size={24} /></div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Live Chat</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Wait time: ~2 minutes</p>
            </div>
          </InfoItem>

          <InfoItem>
            <div className="icon"><MapPin size={24} /></div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Office</h4>
              <p style={{ color: 'var(--text-secondary)' }}>123 Commerce St, San Francisco, CA</p>
            </div>
          </InfoItem>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Send a Message</h3>

          {submitted ? (
            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(196, 165, 232, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>
              <h4 style={{ fontWeight: '700' }}>Message Sent!</h4>
              <p>We'll get back to you within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} required />
                <input type="email" placeholder="Email Address" style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }} required />
              </div>
              <input type="text" placeholder="Subject" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', marginBottom: '1.5rem' }} required />
              <textarea placeholder="How can we help?" rows="5" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', marginBottom: '2rem' }} required></textarea>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                <Send size={18} style={{ marginRight: '0.75rem' }} /> Send Message
              </button>
            </form>
          )}
        </div>
      </ContactSection>

      <FAQSection />
    </PageContainer>
  );
};

export default Contact;
