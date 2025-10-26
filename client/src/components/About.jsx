import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Dr. Joseph Mbayo',
      role: 'Founder & Director',
      expertise: 'Environmental Economics, African Development',
      bio: '15+ years experience in environmental policy across Africa',
      avatar: '👩‍⚖️',
      country: 'Lusaka, Zambia'
    },
    {
      name: 'Prof. Lawrence Machumi',
      role: 'Head of Education',
      expertise: 'Economics Education, Curriculum Development',
      bio: 'Former university professor with passion for accessible education',
      avatar: '👨‍🏫',
      country: 'Livingstone, Zambia'
    },
    {
      name: 'Nestony  Biamungu',
      role: 'Content Lead',
      expertise: 'Environmental Science, Case Study Development',
      bio: 'Specialist in African environmental case studies and research',
      avatar: '👩‍🔬',
      country: 'Ndola, Zambia'
    },
    {
      name: 'Michael Matanda',
      role: 'Technology Director',
      expertise: 'EdTech, Software Development',
      bio: 'Building digital learning platforms for African contexts',
      avatar: '👨‍💻',
      country: 'Kitwe, Zambia'
    }
  ];

  const partners = [
    { name: 'African Development Bank', logo: '🏦', type: 'Funding Partner' },
    { name: 'UN Environment Programme', logo: '🌐', type: 'Knowledge Partner' },
    { name: 'University of Cape Town', logo: '🎓', type: 'Academic Partner' },
    { name: 'Green Growth Africa', logo: '🌱', type: 'Implementation Partner' }
  ];

  const milestones = [
    { year: '2023', event: 'EcoLearn Founded', description: 'Initial concept and research' },
    { year: '2024', event: 'Platform Launch', description: 'First courses and tools released' },
    { year: '2024', event: '10,000 Learners', description: 'Milestone user base reached' },
    { year: '2025', event: 'African Expansion', description: 'Coverage across 15+ countries' }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>Transforming Environmental Economics Education in Africa</h1>
            <p className="hero-subtitle">
              Empowering the next generation of African leaders with the knowledge and tools 
              to drive sustainable economic development while protecting our precious environment.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>15,000+</h3>
                <p>Active Learners</p>
              </div>
              <div className="hero-stat">
                <h3>25+</h3>
                <p>African Countries</p>
              </div>
              <div className="hero-stat">
                <h3>50+</h3>
                <p>Expert Contributors</p>
              </div>
              <div className="hero-stat">
                <h3>100+</h3>
                <p>Learning Resources</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-section">
          <div className="mission-cards">
            <div className="mission-card">
              <span className="mission-icon">🎯</span>
              <h2>Our Mission</h2>
              <p>
                To make environmental economics education accessible, practical, and relevant 
                for African learners, enabling them to address the unique environmental and 
                economic challenges facing the continent.
              </p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">🔭</span>
              <h2>Our Vision</h2>
              <p>
                A future where every African decision-maker has the knowledge and tools to 
                integrate environmental sustainability into economic planning and development.
              </p>
            </div>
            <div className="mission-card">
              <span className="mission-icon">💡</span>
              <h2>Our Approach</h2>
              <p>
                Contextual learning with real African case studies, practical tools for 
                immediate application, and community-driven knowledge sharing.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>Passionate experts dedicated to advancing environmental economics in Africa</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-expertise">{member.expertise}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-country">
                    <span className="country-flag">{member.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
          <div className="section-header">
            <h2>Our Partners</h2>
            <p>Collaborating with leading organizations across Africa and beyond</p>
          </div>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-card">
                <div className="partner-logo">{partner.logo}</div>
                <h3>{partner.name}</h3>
                <p>{partner.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="milestones-section">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our mission to transform environmental economics education</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.event}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Whether you're a learner, educator, researcher, or organization, 
              there's a place for you in the EcoLearn community.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary">
                Start Learning Today
              </Link>
              <Link to="/contact" className="cta-button secondary">
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;