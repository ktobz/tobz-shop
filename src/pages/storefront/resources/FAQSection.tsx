import React, { useState } from 'react';
import styled from '@emotion/styled';
import { HelpCircle, ChevronDown } from 'lucide-react';

const SectionContainer = styled.section`
  margin: 4rem 0;
  padding: 3rem 0;

  @media (max-width: 768px) {
    margin: 2rem 0;
    padding: 2rem 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  font-family: var(--font-display);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  svg {
    color: var(--primary);
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--primary-light);
    box-shadow: var(--shadow-md);
  }
`;

const FAQHeader = styled.button`
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(196, 165, 232, 0.05);
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
  }
`;

const QuestionText = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--text-primary);
  flex: 1;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ExpandIcon = styled.div`
  color: var(--primary);
  transition: transform var(--transition-base);
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
`;

const FAQAnswer = styled.div`
  max-height: ${props => props.expanded ? '500px' : '0'};
  overflow: hidden;
  transition: max-height var(--transition-slow), padding var(--transition-base);
  padding: ${props => props.expanded ? '0 2rem 1.5rem' : '0 2rem'};
  opacity: ${props => props.expanded ? '1' : '0'};

  @media (max-width: 768px) {
    padding: ${props => props.expanded ? '0 1.5rem 1.25rem' : '0 1.5rem'};
  }
`;

const AnswerText = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
  padding-top: ${props => props.expanded ? '1rem' : '0'};
  border-top: ${props => props.expanded ? '1px solid var(--border-light)' : 'none'};
`;

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const faqs = [
    {
      id: 1,
      question: 'How do I get started with 1shopapp?',
      answer: 'Getting started is easy! Simply sign up for an account, choose a plan that fits your needs, and follow our step-by-step setup wizard. You can have your store up and running in minutes. Our documentation and tutorials will guide you through every step.'
    },
    {
      id: 2,
      question: 'What payment methods do you support?',
      answer: 'We support all major payment gateways including Stripe, PayPal, Square, and more. You can also accept payments via credit cards, digital wallets, and bank transfers. All transactions are secured with industry-standard encryption.'
    },
    {
      id: 3,
      question: 'Can I customize my store design?',
      answer: 'Absolutely! We offer a wide range of customizable themes and templates. You can modify colors, fonts, layouts, and more to match your brand. For advanced customization, our developer resources provide full access to the codebase.'
    },
    {
      id: 4,
      question: 'Is there a mobile app?',
      answer: 'Yes! We offer native mobile apps for both iOS and Android. You can manage your store, view analytics, and process orders on the go. The apps are available for download in the App Store and Google Play Store.'
    },
    {
      id: 5,
      question: 'What kind of support do you offer?',
      answer: 'We provide comprehensive support through multiple channels: email support, live chat, video tutorials, documentation, and a community forum. Our support team is available 24/7 to help you with any questions or issues.'
    },
    {
      id: 6,
      question: 'Can I migrate from another platform?',
      answer: 'Yes, we offer migration tools and services to help you move from platforms like Shopify, WooCommerce, Magento, and others. Our team can assist with data migration, ensuring a smooth transition with minimal downtime.'
    },
    {
      id: 7,
      question: 'How does pricing work?',
      answer: 'We offer flexible pricing plans to suit businesses of all sizes. Plans start with a free tier for small stores, and scale up based on your needs. All plans include core features, with premium plans offering advanced analytics, priority support, and more customization options.'
    },
    {
      id: 8,
      question: 'Is my data secure?',
      answer: 'Security is our top priority. We use industry-leading encryption, regular security audits, and comply with GDPR, PCI DSS, and other international standards. Your data is backed up regularly and stored in secure, redundant data centers.'
    },
    {
      id: 9,
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with our service, contact our support team within 30 days of your purchase for a full refund. No questions asked.'
    },
    {
      id: 10,
      question: 'Can I integrate with third-party tools?',
      answer: 'Yes, we support integrations with popular tools like Zapier, Mailchimp, Google Analytics, and more. Our API allows for custom integrations with your existing workflow. Check our integrations page for a full list.'
    },
    {
      id: 11,
      question: 'How do I upgrade or downgrade my plan?',
      answer: 'You can upgrade or downgrade your plan at any time from your account dashboard. Changes take effect at the next billing cycle. If you upgrade mid-cycle, you\'ll be prorated for the difference.'
    }
  ];

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          <HelpCircle size={28} />
          Frequently Asked Questions
        </SectionTitle>
        <SectionSubtitle>Find answers to common questions</SectionSubtitle>
      </SectionHeader>
      <FAQList>
        {faqs.map((faq) => (
          <FAQItem key={faq.id}>
            <FAQHeader onClick={() => toggleItem(faq.id)}>
              <QuestionText>{faq.question}</QuestionText>
              <ExpandIcon expanded={expandedItems.has(faq.id)}>
                <ChevronDown size={20} />
              </ExpandIcon>
            </FAQHeader>
            <FAQAnswer expanded={expandedItems.has(faq.id)}>
              <AnswerText>{faq.answer}</AnswerText>
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQList>
    </SectionContainer>
  );
};

export default FAQSection;
