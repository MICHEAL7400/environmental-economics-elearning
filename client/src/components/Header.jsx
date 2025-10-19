import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowUserDropdown(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;
  const isActiveStartsWith = (path) => location.pathname.startsWith(path);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <h1>EcoLearn</h1>
        </Link>
        
        {/* Desktop Navigation - Only 4 Items */}
        <nav className="main-nav">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            🏠 Home
          </Link>

          {/* Learn Dropdown */}
          <div className="nav-dropdown">
            <button 
              className={`nav-dropdown-btn ${isActiveStartsWith('/courses') || isActiveStartsWith('/case-studies') || isActive('/statistics') ? 'active' : ''}`}
              onMouseEnter={() => setShowLearnDropdown(true)}
              onMouseLeave={() => setShowLearnDropdown(false)}
            >
              📚 Learn
            </button>
            {showLearnDropdown && (
              <div 
                className="nav-dropdown-menu"
                onMouseEnter={() => setShowLearnDropdown(true)}
                onMouseLeave={() => setShowLearnDropdown(false)}
              >
                <Link to="/courses" className="dropdown-item">
                  🎓 Courses
                </Link>
                <Link to="/case-studies" className="dropdown-item">
                  📖 Case Studies
                </Link>
                <Link to="/statistics" className="dropdown-item">
                  📊 Statistics
                </Link>
              </div>
            )}
          </div>

          <Link to="/tools" className={isActiveStartsWith('/tools') ? 'active' : ''}>
            🛠️ Tools
          </Link>

          <Link to="/about" className={isActive('/about') ? 'active' : ''}>
            ℹ️ About
          </Link>
        </nav>

        {/* User Section */}
        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <button 
                className="user-avatar-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
              >
                <span className="avatar">{user.avatar || '👤'}</span>
                <span className={`dropdown-arrow ${showUserDropdown ? 'open' : ''}`}>▼</span>
              </button>
              
              {showUserDropdown && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <strong>{user.firstName} {user.lastName}</strong>
                    <span>{user.userType}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/dashboard" className="dropdown-item">
                    📊 Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    👤 Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/contact" className="dropdown-item">
                    📞 Contact
                  </Link>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login">
                Sign In
              </Link>
              <Link to="/register" className="auth-btn register">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={isActive('/') ? 'active' : ''}>
            🏠 Home
          </Link>
          
          <div className="mobile-nav-section">
            <h4>📚 Learning</h4>
            <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className={isActiveStartsWith('/courses') ? 'active' : ''}>
              All Courses
            </Link>
            <Link to="/case-studies" onClick={() => setMobileMenuOpen(false)} className={isActiveStartsWith('/case-studies') ? 'active' : ''}>
              Case Studies
            </Link>
            <Link to="/statistics" onClick={() => setMobileMenuOpen(false)} className={isActive('/statistics') ? 'active' : ''}>
              Statistics
            </Link>
          </div>

          <Link to="/tools" onClick={() => setMobileMenuOpen(false)} className={isActiveStartsWith('/tools') ? 'active' : ''}>
            🛠️ Tools
          </Link>

          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={isActive('/about') ? 'active' : ''}>
            ℹ️ About
          </Link>
          
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={isActive('/contact') ? 'active' : ''}>
            📞 Contact
          </Link>

          {user ? (
            <>
              <div className="mobile-nav-section">
                <h4>👤 Account</h4>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
              </div>
              <button onClick={handleLogout} className="mobile-logout">
                🚪 Logout
              </button>
            </>
          ) : (
            <div className="mobile-auth">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;