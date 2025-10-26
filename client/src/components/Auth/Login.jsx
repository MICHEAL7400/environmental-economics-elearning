// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Auth.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email address is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     return newErrors;
//   };

//   // Normalize user data to match your database schema
//   const normalizeUserData = (userData) => {
//     if (!userData) return null;
    
//     return {
//       ...userData,
//       // Map database fields to frontend expected fields
//       firstName: userData.first_name || userData.firstName,
//       lastName: userData.last_name || userData.lastName,
//       userType: userData.user_type || userData.userType || 'student',
//       avatar: userData.avatar || '👤',
//       // Include all database fields for compatibility
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       console.log('🚀 Starting login process...');
//       console.log('📧 Login attempt for:', formData.email);
      
//       const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const { token, user } = response.data;
      
//       console.log('✅ Login successful!');
//       console.log('🔍 Raw user data from API:', user);
//       console.log('🔍 User first_name:', user.first_name);
//       console.log('🔍 User last_name:', user.last_name);
//       console.log('🔍 User user_type:', user.user_type);

//       // Normalize user data to match database schema
//       const normalizedUser = normalizeUserData(user);
//       console.log('🔄 Normalized user data:', normalizedUser);

//       if (rememberMe) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(normalizedUser));
//         console.log('💾 User saved to localStorage');
//       } else {
//         sessionStorage.setItem('token', token);
//         sessionStorage.setItem('user', JSON.stringify(normalizedUser));
//         console.log('💾 User saved to sessionStorage');
//       }

//       // Set authorization header for future requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//       // Trigger events to update other components
//       window.dispatchEvent(new Event('storage'));
      
//       // Dispatch custom event with normalized user data
//       const loginEvent = new CustomEvent('userLogin', { 
//         detail: normalizedUser 
//       });
//       window.dispatchEvent(loginEvent);

//       // 🔥 REDIRECT BASED ON USER TYPE
//       console.log('🔄 Checking user type for redirect...');
//       console.log('👤 User type from API:', user.user_type);
//       console.log('👤 Normalized user type:', normalizedUser.userType);
      
//       // Check both possible user type fields
//       const isAdmin = user.user_type === 'admin' || normalizedUser.userType === 'admin';
      
//       if (isAdmin) {
//         console.log('🎯 Redirecting ADMIN to admin dashboard');
//         navigate('/admin', { replace: true });
//       } else {
//         console.log('🎯 Redirecting regular user to home');
//         navigate('/', { replace: true });
//       }

//     } catch (error) {
//       console.error('❌ Login error:', error);

//       if (error.response) {
//         const errorMessage = error.response.data?.message || error.response.data?.error || 'Login failed. Please try again.';
//         setErrors({ submit: errorMessage });
//         console.log('🔍 Error response data:', error.response.data);
//         console.log('🔍 Error response status:', error.response.status);
//       } else if (error.request) {
//         setErrors({ submit: 'Unable to connect to server. Please check your connection and try again.' });
//         console.log('🔍 No response received:', error.request);
//       } else {
//         setErrors({ submit: 'An unexpected error occurred. Please try again.' });
//         console.log('🔍 Error message:', error.message);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Development helper - fill test credentials
//   const fillTestCredentials = (type = 'admin') => {
//     if (type === 'admin') {
//       setFormData({
//         email: 'admin@ecolearn.org',
//         password: 'admin123'
//       });
//     } else {
//       setFormData({
//         email: 'biamungunestory@gmail.com',
//         password: 'admin123'
//       });
//     }
//     console.log('🧪 Test credentials filled for:', type);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         {/* Header */}
//         <div className="auth-header">
//           <Link to="/" className="auth-logo">
//             <span className="logo-icon">🌍</span>
//             <span className="logo-text">EcoLearn</span>
//           </Link>
//           <h1>Welcome Back</h1>
//           <p>Sign in to continue your environmental economics journey</p>
          
//           {/* Development Helper */}
//           {process.env.NODE_ENV === 'development' && (
//             <div className="dev-helper">
//               <div className="test-buttons">
//                 <button 
//                   type="button" 
//                   className="test-credentials-btn admin"
//                   onClick={() => fillTestCredentials('admin')}
//                 >
//                   🧪 Fill Admin Credentials
//                 </button>
//                 <button 
//                   type="button" 
//                   className="test-credentials-btn user"
//                   onClick={() => fillTestCredentials('user')}
//                 >
//                   🧪 Fill User Credentials
//                 </button>
//               </div>
//               <div className="test-info">
//                 <small>
//                   <strong>Admin:</strong> admin@ecolearn.org | admin123<br />
//                   <strong>User:</strong> biamungunestory@gmail.com | admin123
//                 </small>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="auth-form">
//           {errors.submit && (
//             <div className="error-message submit-error">
//               ⚠️ {errors.submit}
//               <br />
//               <small>Check console for detailed error information</small>
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? 'error' : ''}
//               placeholder="Enter your email"
//               disabled={isLoading}
//               autoComplete="email"
//             />
//             {errors.email && <span className="error-text">{errors.email}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="password-input">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? 'error' : ''}
//                 placeholder="Enter your password"
//                 disabled={isLoading}
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={isLoading}
//               >
//                 {showPassword ? '🙈' : '👁️'}
//               </button>
//             </div>
//             {errors.password && <span className="error-text">{errors.password}</span>}
//           </div>

//           <div className="form-options">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 disabled={isLoading}
//               />
//               <span className="checkmark"></span>
//               Remember me
//             </label>
//             <Link to="/forgot-password" className="forgot-link">
//               Forgot password?
//             </Link>
//           </div>

//           <button 
//             type="submit" 
//             className="auth-button primary"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <div className="spinner"></div>
//                 Signing In...
//               </>
//             ) : (
//               'Sign In →'
//             )}
//           </button>
//         </form>

//         {/* Debug Info */}
//         {process.env.NODE_ENV === 'development' && (
//           <div className="debug-info">
//             <details>
//               <summary>🔧 Debug Information</summary>
//               <pre>
//                 Email: {formData.email}<br />
//                 Password: {'*'.repeat(formData.password.length)}<br />
//                 Loading: {isLoading ? 'Yes' : 'No'}<br />
//                 Remember Me: {rememberMe ? 'Yes' : 'No'}<br />
//                 Endpoint: http://localhost:5000/api/auth/login
//               </pre>
//             </details>
//           </div>
//         )}

//         {/* Social Login */}
//         <div className="social-login">
//           <div className="divider">
//             <span>Or continue with</span>
//           </div>
//           <div className="social-buttons">
//             <button type="button" className="social-btn google" disabled={isLoading}>
//               <span className="social-icon">🔍</span>
//               Google
//             </button>
//             <button type="button" className="social-btn github" disabled={isLoading}>
//               <span className="social-icon">💻</span>
//               GitHub
//             </button>
//             <button type="button" className="social-btn linkedin" disabled={isLoading}>
//               <span className="social-icon">💼</span>
//               LinkedIn
//             </button>
//           </div>
//         </div>

//         {/* Sign Up Link */}
//         <div className="auth-footer">
//           <p>
//             Don't have an account?{' '}
//             <Link to="/register" className="auth-link">
//               Sign up for free
//             </Link>
//           </p>
          
//           {/* ADDED: Admin Login Link */}
//           <p>
//             <Link to="/admin/login" className="auth-link admin-link">
//               🛠️ Admin Login
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Welcome Side Panel */}
//       <div className="auth-welcome">
//         <div className="welcome-content">
//           <h2>Continue Your Learning Journey</h2>
//           <p>Access your courses, track progress, and join the EcoLearn community</p>
          
//           <div className="welcome-features">
//             <div className="feature-item">
//               <span className="feature-icon">📚</span>
//               <div>
//                 <h4>Your Courses</h4>
//                 <p>Resume where you left off</p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <span className="feature-icon">📊</span>
//               <div>
//                 <h4>Progress Tracking</h4>
//                 <p>Monitor your learning journey</p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <span className="feature-icon">👥</span>
//               <div>
//                 <h4>Community</h4>
//                 <p>Connect with other learners</p>
//               </div>
//             </div>
//             <div className="feature-item">
//               <span className="feature-icon">🛠️</span>
//               <div>
//                 <h4>Tools Access</h4>
//                 <p>Use all our environmental tools</p>
//               </div>
//             </div>
//           </div>

//           <div className="welcome-stats">
//             <div className="stat">
//               <h3>5,000+</h3>
//               <p>Active Learners</p>
//             </div>
//             <div className="stat">
//               <h3>50+</h3>
//               <p>African Countries</p>
//             </div>
//             <div className="stat">
//               <h3>98%</h3>
//               <p>Satisfaction Rate</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





// client/src/components/Auth/Login.jsx - USER ONLY VERSION
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const normalizeUserData = (userData) => {
    if (!userData) return null;
    
    return {
      ...userData,
      firstName: userData.first_name || userData.firstName,
      lastName: userData.last_name || userData.lastName,
      userType: userData.user_type || userData.userType || 'student',
      avatar: userData.avatar || '👤',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      console.log('🚀 Starting USER login process...');
      console.log('📧 Login attempt for:', formData.email);
      
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, user } = response.data;
      
      console.log('✅ Login successful!');
      console.log('🔍 Raw user data from API:', user);

      // Normalize user data
      const normalizedUser = normalizeUserData(user);
      console.log('🔄 Normalized user data:', normalizedUser);

      // 🔥 STRICT USER CHECK - REJECT ADMINS
      const userType = user.user_type || normalizedUser.userType;
      console.log('🔍 User type detected:', userType);

      if (userType === 'admin') {
        console.log('❌ Admin detected in user login - redirecting to admin login');
        setErrors({ submit: 'Please use the Admin Login portal for administrator access.' });
        setIsLoading(false);
        return;
      }

      // Only proceed if it's a regular user
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        console.log('💾 User saved to localStorage');
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(normalizedUser));
        console.log('💾 User saved to sessionStorage');
      }

      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Trigger events to update other components
      window.dispatchEvent(new Event('storage'));
      
      const loginEvent = new CustomEvent('userLogin', { 
        detail: normalizedUser 
      });
      window.dispatchEvent(loginEvent);

      console.log('🎯 Redirecting regular user to home');
      navigate('/', { replace: true });

    } catch (error) {
      console.error('❌ Login error:', error);

      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Login failed. Please try again.';
        setErrors({ submit: errorMessage });
      } else if (error.request) {
        setErrors({ submit: 'Unable to connect to server. Please check your connection and try again.' });
      } else {
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Development helper - ONLY USER CREDENTIALS
  const fillTestCredentials = () => {
    setFormData({
      email: 'biamungunestory@gmail.com',
      password: 'admin123'
    });
    console.log('🧪 User credentials filled');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">EcoLearn</span>
          </Link>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your environmental economics journey</p>
          
          {/* Development Helper - ONLY USER */}
          {process.env.NODE_ENV === 'development' && (
            <div className="dev-helper">
              <button 
                type="button" 
                className="test-credentials-btn user"
                onClick={fillTestCredentials}
              >
                🧪 Fill User Credentials
              </button>
              <div className="test-info">
                <small>
                  <strong>User:</strong> biamungunestory@gmail.com | admin123
                </small>
              </div>
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="error-message submit-error">
              ⚠️ {errors.submit}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In →'
            )}
          </button>
        </form>

        {/* Admin Login Link */}
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up for free
            </Link>
          </p>
          <p>
            <Link to="/admin/login" className="auth-link admin-link">
              🛠️ Admin Login
            </Link>
          </p>
        </div>
      </div>

      {/* Welcome Side Panel */}
      <div className="auth-welcome">
        <div className="welcome-content">
          <h2>Continue Your Learning Journey</h2>
          <p>Access your courses, track progress, and join the EcoLearn community</p>
          
          <div className="welcome-features">
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <div>
                <h4>Your Courses</h4>
                <p>Resume where you left off</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <h4>Progress Tracking</h4>
                <p>Monitor your learning journey</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <div>
                <h4>Community</h4>
                <p>Connect with other learners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


