import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const learnRef = useRef(null);
  const toolsRef = useRef(null);
  const userRef = useRef(null);
  
  // Add timeouts for smooth closing
  const learnTimeoutRef = useRef(null);
  const toolsTimeoutRef = useRef(null);

  // Normalize user data function to match your database schema
  const normalizeUserData = (userData) => {
    if (!userData) return null;
    
    return {
      ...userData,
      // Map database fields to frontend expected fields
      firstName: userData.first_name || userData.firstName,
      lastName: userData.last_name || userData.lastName,
      userType: userData.user_type || userData.userType || 'student',
      avatar: userData.avatar || '👤',
      // Include all database fields for compatibility
      id: userData.id,
      email: userData.email,
      phone: userData.phone,
      country: userData.country,
      city: userData.city,
      organization: userData.organization,
      role: userData.role,
      bio: userData.bio,
      join_date: userData.join_date,
      last_login: userData.last_login,
      is_active: userData.is_active
    };
  };

  // Check authentication status
  const checkUserAuth = () => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    console.log('🔄 Header checking user auth:', { userData: !!userData, token: !!token });
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('✅ User found in Header:', parsedUser);
        
        const normalizedUser = normalizeUserData(parsedUser);
        setUser(normalizedUser);
        
        // Set authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        setUser(null);
      }
    } else {
      console.log('❌ No user data or token found');
      setUser(null);
    }
  };

  useEffect(() => {
    // Check immediately on component mount
    checkUserAuth();

    // Listen for storage changes (across tabs)
    const handleStorageChange = () => {
      console.log('📦 Storage changed, checking auth...');
      checkUserAuth();
    };

    // Listen for custom login events
    const handleUserLogin = (event) => {
      console.log('🔔 Custom login event received:', event.detail);
      checkUserAuth();
    };

    // Listen for logout events
    const handleUserLogout = () => {
      console.log('🔔 Custom logout event received');
      setUser(null);
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (learnRef.current && !learnRef.current.contains(event.target)) {
        setShowLearnDropdown(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setShowToolsDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLearnMouseEnter = () => {
    if (learnTimeoutRef.current) {
      clearTimeout(learnTimeoutRef.current);
    }
    setShowLearnDropdown(true);
  };

  const handleLearnMouseLeave = () => {
    learnTimeoutRef.current = setTimeout(() => {
      setShowLearnDropdown(false);
    }, 200);
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    setShowToolsDropdown(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setShowToolsDropdown(false);
    }, 200);
  };

  const handleLogout = () => {
    // Clear all storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    
    // Clear axios default headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset state
    setUser(null);
    setShowUserDropdown(false);
    
    // Dispatch logout event
    window.dispatchEvent(new Event('userLogout'));
    
    console.log('🚪 User logged out successfully');
    navigate('/', { replace: true });
  };

  const isActive = (path) => location.pathname === path;
  const isActiveStartsWith = (path) => location.pathname.startsWith(path);

  // Debug info
  console.log('🔍 Header Debug Info:', {
    user: user ? `${user.firstName} ${user.lastName}` : 'No user',
    userType: user?.userType,
    hasToken: !!(localStorage.getItem('token') || sessionStorage.getItem('token'))
  });

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <h1>EcoLearn</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav">
          <Link to="/" className={isActive('/') ? 'active' : ''}>🏠 Home</Link>

          {/* Learn Dropdown */}
          <div className="nav-dropdown" ref={learnRef}>
            <button
              className={`nav-dropdown-btn ${isActiveStartsWith('/courses') || isActiveStartsWith('/case-studies') || isActive('/statistics') ? 'active' : ''}`}
              onMouseEnter={handleLearnMouseEnter}
              onMouseLeave={handleLearnMouseLeave}
            >
              📚 Learn
            </button>
            {showLearnDropdown && (
              <div 
                className="nav-dropdown-menu"
                onMouseEnter={handleLearnMouseEnter}
                onMouseLeave={handleLearnMouseLeave}
              >
                <Link to="/courses" className="dropdown-item">🎓 Courses</Link>
                <Link to="/case-studies" className="dropdown-item">📖 Case Studies</Link>
                <Link to="/statistics" className="dropdown-item">📊 Statistics</Link>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="nav-dropdown" ref={toolsRef}>
            <button
              className={`nav-dropdown-btn ${isActiveStartsWith('/tools') ? 'active' : ''}`}
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              🛠️ Tools
            </button>
            {showToolsDropdown && (
              <div
                className="nav-dropdown-menu"
                onMouseEnter={handleToolsMouseEnter}
                onMouseLeave={handleToolsMouseLeave}
              >
                <Link to="/tools/calculator" className="dropdown-item">🧮 Calculator</Link>
                <Link to="/tools/converter" className="dropdown-item">🔄 Converter</Link>
                <Link to="/tools/analytics" className="dropdown-item">📊 Analytics</Link>
              </div>
            )}
          </div>

          <Link to="/about" className={isActive('/about') ? 'active' : ''}>ℹ️ About</Link>
          <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>📞 Contact</Link>
        </nav>

        {/* User Section */}
        <div className="header-actions" ref={userRef}>
          {user ? (
            <div className="user-menu">
              <button
                className="user-avatar-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                onMouseEnter={() => {
                  if (learnTimeoutRef.current) clearTimeout(learnTimeoutRef.current);
                  if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
                }}
              >
                <span className="avatar">{user.avatar}</span>
                <span className="user-name">{user.firstName}</span>
                <span className={`dropdown-arrow ${showUserDropdown ? 'open' : ''}`}>▼</span>
              </button>

              {showUserDropdown && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <strong>{user.firstName} {user.lastName}</strong>
                    <span className="user-role">
                      {user.userType?.charAt(0).toUpperCase() + user.userType?.slice(1)}
                      {user.organization && ` • ${user.organization}`}
                    </span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                    📊 Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                    👤 Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/contact" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
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
              <Link to="/login" className="auth-btn login">Sign In</Link>
              <Link to="/register" className="auth-btn register">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
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

          <div className="mobile-nav-section">
            <h4>🛠️ Tools</h4>
            <Link to="/tools/calculator" onClick={() => setMobileMenuOpen(false)}>
              Calculator
            </Link>
            <Link to="/tools/converter" onClick={() => setMobileMenuOpen(false)}>
              Converter
            </Link>
            <Link to="/tools/analytics" onClick={() => setMobileMenuOpen(false)}>
              Analytics
            </Link>
          </div>

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
                <div className="user-info-mobile">
                  <strong>{user.firstName} {user.lastName}</strong>
                  <span>{user.userType?.charAt(0).toUpperCase() + user.userType?.slice(1)}</span>
                </div>
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