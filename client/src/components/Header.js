// client/src/components/Header.js - UPDATED NAVIGATION
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <h1>EcoLearn</h1>
        </Link>
        <nav>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            🏠 Home
          </Link>
          <Link 
            to="/courses" 
            className={location.pathname === '/courses' ? 'active' : ''}
          >
            📚 Courses
          </Link>
          <Link 
            to="/case-studies" 
            className={location.pathname === '/case-studies' ? 'active' : ''}
          >
            📖 Case Studies
          </Link>
          <Link 
            to="/tools" 
            className={location.pathname === '/tools' ? 'active' : ''}
          >
            🛠️ Tools
          </Link>
          <Link 
            to="/statistics" 
            className={location.pathname === '/statistics' ? 'active' : ''}
          >
            📊 Statistics
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;