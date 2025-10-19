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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, user } = response.data;

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirect to home page
      navigate('/', { replace: true });

    } catch (error) {
      console.error('Login error:', error);

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

  const handleDemoLogin = async (role) => {
    const demoCredentials = {
      student: { email: 'student@demo.com', password: 'demo123' },
      instructor: { email: 'instructor@demo.com', password: 'demo123' },
      policymaker: { email: 'policymaker@demo.com', password: 'demo123' }
    };

    setFormData(demoCredentials[role]);

    // Submit demo credentials using the same handleSubmit function
    setTimeout(() => handleSubmit(new Event('submit', { cancelable: true })), 100);
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
        </div>

        {/* Demo Login Buttons */}
        <div className="demo-login-section">
          <p className="demo-label">Quick Demo Access:</p>
          <div className="demo-buttons">
            <button 
              type="button"
              className="demo-btn student"
              onClick={() => handleDemoLogin('student')}
              disabled={isLoading}
            >
              👨‍🎓 Student Demo
            </button>
            <button 
              type="button"
              className="demo-btn instructor"
              onClick={() => handleDemoLogin('instructor')}
              disabled={isLoading}
            >
              👨‍🏫 Instructor Demo
            </button>
            <button 
              type="button"
              className="demo-btn policymaker"
              onClick={() => handleDemoLogin('policymaker')}
              disabled={isLoading}
            >
              🏛️ Policy Maker Demo
            </button>
          </div>
        </div>

        <div className="divider">
          <span>Or sign in with email</span>
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

        {/* Social Login */}
        <div className="social-login">
          <div className="divider">
            <span>Or continue with</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="social-btn google" disabled={isLoading}>
              <span className="social-icon">🔍</span>
              Google
            </button>
            <button type="button" className="social-btn github" disabled={isLoading}>
              <span className="social-icon">💻</span>
              GitHub
            </button>
            <button type="button" className="social-btn linkedin" disabled={isLoading}>
              <span className="social-icon">💼</span>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up for free
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
            <div className="feature-item">
              <span className="feature-icon">🛠️</span>
              <div>
                <h4>Tools Access</h4>
                <p>Use all our environmental tools</p>
              </div>
            </div>
          </div>

          <div className="welcome-stats">
            <div className="stat">
              <h3>5,000+</h3>
              <p>Active Learners</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>African Countries</p>
            </div>
            <div className="stat">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
