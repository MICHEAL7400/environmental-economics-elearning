// client/src/components/Admin/AdminLogin.jsx - UPDATED
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth/Auth.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
      console.log('🚀 Starting STRICT ADMIN login process...');
      console.log('📧 Admin login attempt for:', formData.email);
      
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

      // 🔥 STRICT ADMIN CHECK - REJECT REGULAR USERS
      const userType = user.user_type || normalizedUser.userType;
      console.log('🔍 User type detected:', userType);

      if (userType !== 'admin') {
        console.log('❌ Regular user detected in admin login - access denied');
        setErrors({ submit: 'Access denied. Administrator privileges required. Please use the regular user login.' });
        setIsLoading(false);
        return;
      }

      console.log('✅ Admin access granted!');

      // 🔥 CRITICAL CHANGE: Store admin data in sessionStorage ONLY
      // This prevents the Header from detecting admin login on home page
      sessionStorage.setItem('adminToken', token);
      sessionStorage.setItem('adminUser', JSON.stringify(normalizedUser));

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log('🎯 Redirecting to admin dashboard...');
      
      // Redirect to admin dashboard
      navigate('/admin', { replace: true });

    } catch (error) {
      console.error('❌ ADMIN Login error:', error);
      
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

  // Development helper - ONLY ADMIN CREDENTIALS
  const fillAdminCredentials = () => {
    setFormData({
      email: 'admin@ecolearn.org',
      password: 'admin123'
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">EcoLearn Admin</span>
          </Link>
          <h1>Admin Portal</h1>
          <p>Sign in to access the administration dashboard</p>
          
          {/* Development Helper - ONLY ADMIN */}
          {process.env.NODE_ENV === 'development' && (
            <div className="dev-helper">
              <button 
                type="button" 
                className="test-credentials-btn admin"
                onClick={fillAdminCredentials}
              >
                🧪 Fill Admin Credentials
              </button>
              <div className="test-info">
                <small>
                  <strong>Admin Only:</strong> admin@ecolearn.org | admin123
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
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter admin email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter admin password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Admin Sign In...
              </>
            ) : (
              'Admin Sign In →'
            )}
          </button>
        </form>

        {/* Back to main site */}
        <div className="auth-footer">
          <p>
            <Link to="/" className="auth-link">
              ← Back to Main Site
            </Link>
          </p>
          <p>
            <Link to="/login" className="auth-link">
              User Login
            </Link>
          </p>
        </div>
      </div>

      {/* Admin Features Panel */}
      <div className="auth-welcome">
        <div className="welcome-content">
          <h2>Admin Dashboard Features</h2>
          <p>Manage your EcoLearn platform efficiently</p>
          
          <div className="welcome-features">
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <div>
                <h4>Course Management</h4>
                <p>Create, edit, and manage courses</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <div>
                <h4>User Management</h4>
                <p>Manage users and permissions</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <h4>Analytics</h4>
                <p>View platform statistics and reports</p>
              </div>
            </div>
          </div>

          <div className="security-notice">
            <h3>🔒 Security Notice</h3>
            <p>This portal is for authorized administrators only. All activities are logged and monitored.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;