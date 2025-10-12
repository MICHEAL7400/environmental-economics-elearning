// client/src/components/Home.js - ADD LINKS TO NEW SECTIONS
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Transform Your Understanding of Environmental Economics</h1>
          <p>Master the economic dimensions of climate change through interactive learning, real African case studies, and cutting-edge digital tools</p>
          <div className="hero-buttons">
            <Link to="/courses" className="cta-button">
              🚀 Start Learning Now
              <span className="arrow">→</span>
            </Link>
            <Link to="/case-studies" className="cta-button secondary">
              📖 Explore Case Studies
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className="hero-stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Active Learners</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Interactive Lessons</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>African Case Studies</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Practical Tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose EcoLearn?</h2>
          <div className="feature-grid">
            <div className="feature-card floating">
              <span className="feature-icon">🌱</span>
              <h3>Sustainable Knowledge</h3>
              <p>Learn how economic policies drive sustainable development while protecting our precious environment for future generations.</p>
              <Link to="/courses" className="feature-link">Explore Courses →</Link>
            </div>
            <div className="feature-card floating" style={{animationDelay: '0.2s'}}>
              <span className="feature-icon">📖</span>
              <h3>Real Case Studies</h3>
              <p>Dive deep into actual African environmental challenges and economic solutions with our comprehensive case study library.</p>
              <Link to="/case-studies" className="feature-link">View Cases →</Link>
            </div>
            <div className="feature-card floating" style={{animationDelay: '0.4s'}}>
              <span className="feature-icon">🛠️</span>
              <h3>Practical Tools</h3>
              <p>Use our interactive calculators and analysis tools to apply environmental economics in real-world scenarios.</p>
              <Link to="/tools" className="feature-link">Try Tools →</Link>
            </div>
            <div className="feature-card floating" style={{animationDelay: '0.6s'}}>
              <span className="feature-icon">📊</span>
              <h3>Data-Driven Insights</h3>
              <p>Access comprehensive statistics and trends on Africa's green economic transformation and environmental challenges.</p>
              <Link to="/statistics" className="feature-link">View Data →</Link>
            </div>
            <div className="feature-card floating" style={{animationDelay: '0.8s'}}>
              <span className="feature-icon">🎮</span>
              <h3>Gamified Progress</h3>
              <p>Earn badges, track your progress, and compete with friends while learning about environmental economics.</p>
              <Link to="/courses" className="feature-link">Start Learning →</Link>
            </div>
            <div className="feature-card floating" style={{animationDelay: '1s'}}>
              <span className="feature-icon">🌍</span>
              <h3>Global Impact</h3>
              <p>Join a community of learners committed to creating positive environmental change across Africa and beyond.</p>
              <Link to="/courses" className="feature-link">Join Community →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access">
        <div className="container">
          <h2>Quick Access to Key Resources</h2>
          <div className="access-grid">
            <Link to="/tools" className="access-card">
              <span className="access-icon">🛠️</span>
              <h3>Practical Tools</h3>
              <p>Carbon calculators, ROI analysis, and policy simulators</p>
              <span className="access-arrow">→</span>
            </Link>
            <Link to="/case-studies" className="access-card">
              <span className="access-icon">📖</span>
              <h3>Case Studies</h3>
              <p>Real African environmental economics examples</p>
              <span className="access-arrow">→</span>
            </Link>
            <Link to="/statistics" className="access-card">
              <span className="access-icon">📊</span>
              <h3>Statistics</h3>
              <p>Data and trends on Africa's green economy</p>
              <span className="access-arrow">→</span>
            </Link>
            <Link to="/courses" className="access-card">
              <span className="access-icon">📚</span>
              <h3>All Courses</h3>
              <p>Complete learning journey on environmental economics</p>
              <span className="access-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Learners Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"The case studies on Zambian mining disasters helped me understand real economic impacts. This platform is exactly what Africa needs!"</p>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>University Student, Lusaka</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Finally, environmental economics explained in a way that makes sense for African contexts. The tools are incredibly practical!"</p>
              <div className="testimonial-author">
                <strong>David K.</strong>
                <span>Policy Maker, Nairobi</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"The carbon calculator and investment tools helped our organization make better environmental decisions. Game-changing platform!"</p>
              <div className="testimonial-author">
                <strong>Grace L.</strong>
                <span>NGO Director, Accra</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;