// // client/src/components/Header.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Header.css';

// const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [showLearnDropdown, setShowLearnDropdown] = useState(false);
//   const [showToolsDropdown, setShowToolsDropdown] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const learnRef = useRef(null);
//   const toolsRef = useRef(null);
//   const userRef = useRef(null);
//   const learnTimeoutRef = useRef(null);
//   const toolsTimeoutRef = useRef(null);

//   // Normalize user data and sanitize avatar
//   const normalizeUserData = (userData) => {
//     if (!userData) return null;
//     const avatar = userData.avatar?.trim();
//     return {
//       ...userData,
//       firstName: userData.first_name || userData.firstName,
//       lastName: userData.last_name || userData.lastName,
//       userType: userData.user_type || userData.userType || 'student',
//       avatar: avatar && avatar !== '??' ? avatar : '👤',
//       id: userData.id,
//       email: userData.email,
//       phone: userData.phone,
//       country: userData.country,
//       city: userData.city,
//       organization: userData.organization,
//       role: userData.role,
//       bio: userData.bio,
//       join_date: userData.join_date,
//       last_login: userData.last_login,
//       is_active: userData.is_active
//     };
//   };

//   // Check user auth
//   const checkUserAuth = () => {
//     const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');

//     if (userData && token) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         const normalizedUser = normalizeUserData(parsedUser);
//         setUser(normalizedUser);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     checkUserAuth();

//     const handleStorageChange = () => checkUserAuth();
//     const handleUserLogin = () => checkUserAuth();
//     const handleUserLogout = () => setUser(null);

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userLogin', handleUserLogin);
//     window.addEventListener('userLogout', handleUserLogout);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userLogin', handleUserLogin);
//       window.removeEventListener('userLogout', handleUserLogout);
//     };
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (learnRef.current && !learnRef.current.contains(event.target)) setShowLearnDropdown(false);
//       if (toolsRef.current && !toolsRef.current.contains(event.target)) setShowToolsDropdown(false);
//       if (userRef.current && !userRef.current.contains(event.target)) setShowUserDropdown(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Hover handlers
//   const handleLearnMouseEnter = () => {
//     if (learnTimeoutRef.current) clearTimeout(learnTimeoutRef.current);
//     setShowLearnDropdown(true);
//   };
//   const handleLearnMouseLeave = () => {
//     learnTimeoutRef.current = setTimeout(() => setShowLearnDropdown(false), 200);
//   };
//   const handleToolsMouseEnter = () => {
//     if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
//     setShowToolsDropdown(true);
//   };
//   const handleToolsMouseLeave = () => {
//     toolsTimeoutRef.current = setTimeout(() => setShowToolsDropdown(false), 200);
//   };

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     setShowUserDropdown(false);
//     window.dispatchEvent(new Event('userLogout'));
//     navigate('/', { replace: true });
//   };

//   const isActive = (path) => location.pathname === path;
//   const isActiveStartsWith = (path) => location.pathname.startsWith(path);

//   return (
//     <header className="header">
//       <div className="container">
//         <Link to="/" className="logo">
//           <span className="logo-icon">🌍</span>
//           <h1>EcoLearn</h1>
//         </Link>

//         <nav className="main-nav">
//           <Link to="/" className={isActive('/') ? 'active' : ''}>🏠 Home</Link>

//           {/* Learn Dropdown */}
//           <div className="nav-dropdown" ref={learnRef}>
//             <button
//               className={`nav-dropdown-btn ${isActiveStartsWith('/courses') || isActiveStartsWith('/case-studies') || isActive('/statistics') ? 'active' : ''}`}
//               onMouseEnter={handleLearnMouseEnter}
//               onMouseLeave={handleLearnMouseLeave}
//             >
//               📚 Learn
//             </button>
//             {showLearnDropdown && (
//               <div className="nav-dropdown-menu" onMouseEnter={handleLearnMouseEnter} onMouseLeave={handleLearnMouseLeave}>
//                 <button className="dropdown-item" onClick={() => { setShowLearnDropdown(false); navigate('/courses'); }}>🎓 Courses</button>
//                 <button className="dropdown-item" onClick={() => { setShowLearnDropdown(false); navigate('/case-studies'); }}>📖 Case Studies</button>
//                 <button className="dropdown-item" onClick={() => { setShowLearnDropdown(false); navigate('/statistics'); }}>📊 Statistics</button>
//               </div>
//             )}
//           </div>

//           {/* Tools Dropdown */}
//           <div className="nav-dropdown" ref={toolsRef}>
//             <button
//               className={`nav-dropdown-btn ${isActiveStartsWith('/tools') ? 'active' : ''}`}
//               onMouseEnter={handleToolsMouseEnter}
//               onMouseLeave={handleToolsMouseLeave}
//             >
//               🛠️ Tools
//             </button>
//             {showToolsDropdown && (
//               <div className="nav-dropdown-menu" onMouseEnter={handleToolsMouseEnter} onMouseLeave={handleToolsMouseLeave}>
//                 <button className="dropdown-item" onClick={() => { setShowToolsDropdown(false); navigate('/tools/calculator'); }}>🧮 Calculator</button>
//                 <button className="dropdown-item" onClick={() => { setShowToolsDropdown(false); navigate('/tools/converter'); }}>🔄 Converter</button>
//                 <button className="dropdown-item" onClick={() => { setShowToolsDropdown(false); navigate('/tools/analytics'); }}>📊 Analytics</button>
//               </div>
//             )}
//           </div>

//           <Link to="/about" className={isActive('/about') ? 'active' : ''}>ℹ️ About</Link>
//           <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>📞 Contact</Link>
//         </nav>

//         {/* User Section */}
//         <div className="header-actions" ref={userRef}>
//           {user ? (
//             <div className="user-menu">
//               <button className="user-avatar-btn" onClick={() => setShowUserDropdown(!showUserDropdown)}>
//                 <span className="avatar">{user.avatar}</span>
//                 <span className="user-name">{user.firstName}</span>
//                 <span className={`dropdown-arrow ${showUserDropdown ? 'open' : ''}`}>▼</span>
//               </button>

//               {showUserDropdown && (
//                 <div className="user-dropdown">
//                   <div className="user-info">
//                     <strong>{user.firstName} {user.lastName}</strong>
//                     <span className="user-role">
//                       {user.userType?.charAt(0).toUpperCase() + user.userType?.slice(1)}
//                       {user.organization && ` • ${user.organization}`}
//                     </span>
//                   </div>
//                   <div className="dropdown-divider"></div>

//                   <button className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/dashboard'); }}>📊 Dashboard</button>
//                   <button className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/profile'); }}>👤 Profile</button>
//                   <div className="dropdown-divider"></div>
//                   <button className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/contact'); }}>📞 Contact</button>
//                   <button className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="auth-buttons">
//               <Link to="/login" className="auth-btn login">Sign In</Link>
//               <Link to="/register" className="auth-btn register">Sign Up</Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//           <span className="menu-bar"></span>
//           <span className="menu-bar"></span>
//           <span className="menu-bar"></span>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="mobile-nav">
//           <Link to="/" onClick={() => setMobileMenuOpen(false)} className={isActive('/') ? 'active' : ''}>🏠 Home</Link>

//           <div className="mobile-nav-section">
//             <h4>📚 Learning</h4>
//             <button onClick={() => { setMobileMenuOpen(false); navigate('/courses'); }}>All Courses</button>
//             <button onClick={() => { setMobileMenuOpen(false); navigate('/case-studies'); }}>Case Studies</button>
//             <button onClick={() => { setMobileMenuOpen(false); navigate('/statistics'); }}>Statistics</button>
//           </div>

//           <div className="mobile-nav-section">
//             <h4>🛠️ Tools</h4>
//             <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/calculator'); }}>Calculator</button>
//             <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/converter'); }}>Converter</button>
//             <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/analytics'); }}>Analytics</button>
//           </div>

//           <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={isActive('/about') ? 'active' : ''}>ℹ️ About</Link>
//           <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={isActive('/contact') ? 'active' : ''}>📞 Contact</Link>

//           {user ? (
//             <>
//               <div className="mobile-nav-section">
//                 <h4>👤 Account</h4>
//                 <button onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>Dashboard</button>
//                 <button onClick={() => { setMobileMenuOpen(false); navigate('/profile'); }}>Profile</button>
//                 <div className="user-info-mobile">
//                   <strong>{user.firstName} {user.lastName}</strong>
//                   <span>{user.userType?.charAt(0).toUpperCase() + user.userType?.slice(1)}</span>
//                 </div>
//               </div>
//               <button onClick={handleLogout} className="mobile-logout">🚪 Logout</button>
//             </>
//           ) : (
//             <div className="mobile-auth">
//               <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
//               <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
//             </div>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;



// client/src/components/Header.jsx
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
  const learnTimeoutRef = useRef(null);
  const toolsTimeoutRef = useRef(null);

  // Normalize user data and sanitize avatar
  const normalizeUserData = (userData) => {
    if (!userData) return null;
    const avatar = userData.avatar?.trim();
    return {
      ...userData,
      firstName: userData.first_name || userData.firstName,
      lastName: userData.last_name || userData.lastName,
      userType: userData.user_type || userData.userType || 'student',
      avatar: avatar && avatar !== '??' ? avatar : '👤',
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

  // Check user auth
  const checkUserAuth = () => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        const normalizedUser = normalizeUserData(parsedUser);
        setUser(normalizedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserAuth();

    const handleStorageChange = () => checkUserAuth();
    const handleUserLogin = () => checkUserAuth();
    const handleUserLogout = () => setUser(null);

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (learnRef.current && !learnRef.current.contains(event.target)) setShowLearnDropdown(false);
      if (toolsRef.current && !toolsRef.current.contains(event.target)) setShowToolsDropdown(false);
      if (userRef.current && !userRef.current.contains(event.target)) setShowUserDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hover handlers
  const handleLearnMouseEnter = () => {
    if (learnTimeoutRef.current) clearTimeout(learnTimeoutRef.current);
    setShowLearnDropdown(true);
  };
  const handleLearnMouseLeave = () => {
    learnTimeoutRef.current = setTimeout(() => setShowLearnDropdown(false), 200);
  };
  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setShowToolsDropdown(true);
  };
  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => setShowToolsDropdown(false), 200);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setShowUserDropdown(false);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/', { replace: true });
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
              <div className="nav-dropdown-menu" onMouseEnter={handleLearnMouseEnter} onMouseLeave={handleLearnMouseLeave}>
                <button className="dropdown-item" onClick={() => { setShowLearnDropdown(false); navigate('/courses'); }}>🎓 Courses</button>
                <button className="dropdown-item" onClick={() => { setShowLearnDropdown(false); navigate('/case-studies'); }}>📖 Case Studies</button>
                <button className="dropdown-item" onClick={() => { setShowLearnDropdown(false); navigate('/statistics'); }}>📊 Statistics</button>
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
              <div className="nav-dropdown-menu" onMouseEnter={handleToolsMouseEnter} onMouseLeave={handleToolsMouseLeave}>
                <button className="dropdown-item" onClick={() => { setShowToolsDropdown(false); navigate('/tools/calculator'); }}>🧮 Calculator</button>
                <button className="dropdown-item" onClick={() => { setShowToolsDropdown(false); navigate('/tools/converter'); }}>🔄 Converter</button>
                <button className="dropdown-item" onClick={() => { setShowToolsDropdown(false); navigate('/tools/analytics'); }}>📊 Analytics</button>
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
              <button className="user-avatar-btn" onClick={() => setShowUserDropdown(!showUserDropdown)}>
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

                  <button className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/dashboard'); }}>📊 Dashboard</button>
                  <button className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/profile'); }}>👤 Profile</button>
                  <button className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/settings'); }}>⚙️ Settings</button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</button>
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

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={isActive('/') ? 'active' : ''}>🏠 Home</Link>

          <div className="mobile-nav-section">
            <h4>📚 Learning</h4>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/courses'); }}>All Courses</button>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/case-studies'); }}>Case Studies</button>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/statistics'); }}>Statistics</button>
          </div>

          <div className="mobile-nav-section">
            <h4>🛠️ Tools</h4>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/calculator'); }}>Calculator</button>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/converter'); }}>Converter</button>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/tools/analytics'); }}>Analytics</button>
          </div>

          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={isActive('/about') ? 'active' : ''}>ℹ️ About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={isActive('/contact') ? 'active' : ''}>📞 Contact</Link>

          {user ? (
            <>
              <div className="mobile-nav-section">
                <h4>👤 Account</h4>
                <button onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>Dashboard</button>
                <button onClick={() => { setMobileMenuOpen(false); navigate('/profile'); }}>Profile</button>
                <button onClick={() => { setMobileMenuOpen(false); navigate('/settings'); }}>Settings</button>
                <div className="user-info-mobile">
                  <strong>{user.firstName} {user.lastName}</strong>
                  <span>{user.userType?.charAt(0).toUpperCase() + user.userType?.slice(1)}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="mobile-logout">🚪 Logout</button>
            </>
          ) : (
            <div className="mobile-auth">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;