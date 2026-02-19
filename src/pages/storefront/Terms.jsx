import React from 'react';
import styled from '@emotion/styled';

const LegalContainer = styled.div`
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 2rem;
  font-family: var(--font-sans);
  color: var(--text-primary);
  line-height: 1.8;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  font-family: var(--font-display);
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary);
`;

const Terms = () => {
    return (
        <LegalContainer className="fade-in">
            <Title>Terms & <span className="text-secondary">Conditions</span></Title>

            <Section>
                <SectionTitle>1. Introduction</SectionTitle>
                <p>Welcome to 1shopapp. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 1shopapp's website if you do not accept all of the terms and conditions stated on this page.</p>
            </Section>

            <Section>
                <SectionTitle>2. License</SectionTitle>
                <p>Unless otherwise stated, 1shopapp and/or its licensors own the intellectual property rights for all material on 1shopapp. All intellectual property rights are reserved.</p>
            </Section>

            <Section>
                <SectionTitle>3. User Comments</SectionTitle>
                <p>This Agreement shall begin on the date hereof. Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data ('Comments'). 1shopapp does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of 1shopapp, its agents or affiliates.</p>
            </Section>

            <Section>
                <SectionTitle>4. Hyperlinking to our Content</SectionTitle>
                <p>The following organizations may link to our website without prior written approval: Government agencies, search engines, news organizations, and online directory distributors.</p>
            </Section>

            <Section>
                <SectionTitle>5. Governing Law</SectionTitle>
                <p>Any claim related to 1shopapp's website shall be governed by the laws of our operating jurisdiction without regard to its conflict of law provisions.</p>
            </Section>
        </LegalContainer>
    );
};

export default Terms;
