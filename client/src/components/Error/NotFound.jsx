import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="container">
        <div className="error-content">
          <div className="error-icon">🔍</div>
          <h1>Page Not Found</h1>
          <p>Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.</p>
          
          <div className="error-actions">
            <Link to="/" className="cta-button primary">
              🏠 Return Home
            </Link>
            <Link to="/courses" className="cta-button secondary">
              📚 Browse Courses
            </Link>
          </div>

          <div className="error-help">
            <h3>Quick Links</h3>
            <div className="help-links">
              <Link to="/courses">All Courses</Link>
              <Link to="/tools">Practical Tools</Link>
              <Link to="/case-studies">Case Studies</Link>
              <Link to="/contact">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;