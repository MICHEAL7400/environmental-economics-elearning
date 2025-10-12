// client/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-sections">
            {/* Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="logo">
                <span className="logo-icon">🌍</span>
                <h2>EcoLearn</h2>
              </Link>
              <p className="brand-description">
                Transforming environmental economics education through interactive learning, 
                real African case studies, and cutting-edge digital tools.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook" className="social-link">
                  <span>📘</span>
                </a>
                <a href="#" aria-label="Twitter" className="social-link">
                  <span>🐦</span>
                </a>
                <a href="#" aria-label="LinkedIn" className="social-link">
                  <span>💼</span>
                </a>
                <a href="#" aria-label="YouTube" className="social-link">
                  <span>📺</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/tools">Practical Tools</Link></li>
                <li><Link to="/statistics">Statistics</Link></li>
                <li><Link to="/quiz">Take a Quiz</Link></li>
              </ul>
            </div>

            {/* Learning Resources */}
            <div className="footer-links">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Study Guides</a></li>
                <li><a href="#">Research Papers</a></li>
                <li><a href="#">Data Sources</a></li>
                <li><a href="#">Policy Documents</a></li>
                <li><a href="#">Teaching Materials</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-links">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Community Forum</a></li>
                <li><a href="#">Technical Support</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h3>Stay Updated</h3>
              <p>Get the latest courses, case studies, and environmental economics insights.</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe <span className="arrow">→</span>
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>&copy; 2025 EcoLearn. All rights reserved. Empowering Africa through environmental economics education.</p>
              </div>
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;