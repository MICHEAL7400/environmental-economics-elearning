import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    country: '',
    organization: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const countries = [
    'Select Country', 'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Ethiopia',
    'Tanzania', 'Uganda', 'Rwanda', 'Zambia', 'Zimbabwe', 'Botswana',
    'Senegal', 'Ivory Coast', 'Cameroon', 'Other'
  ];

  const userTypes = [
    { value: 'student', label: '👨‍🎓 Student/Learner', description: 'I want to learn about environmental economics' },
    { value: 'instructor', label: '👨‍🏫 Educator/Instructor', description: 'I want to teach or create content' },
    { value: 'policymaker', label: '🏛️ Policy Maker', description: 'I work in government or policy' },
    { value: 'professional', label: '💼 Environmental Professional', description: 'I work in environmental sector' },
    { value: 'researcher', label: '🔬 Researcher/Academic', description: 'I conduct research or studies' },
    { value: 'other', label: '🌍 Other', description: 'Other interests in environmental economics' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.country || formData.country === 'Select Country') {
      newErrors.country = 'Please select your country';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      // Remove confirmPassword before sending
      const { confirmPassword, agreeToTerms, ...submitData } = formData;
      
      const response = await axios.post('http://localhost:5000/api/auth/register', submitData);
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to onboarding or dashboard
      navigate('/onboarding');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        submit: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeSelect = (userType) => {
    setFormData(prev => ({
      ...prev,
      userType
    }));
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
          <h1>Join EcoLearn</h1>
          <p>Start your journey in environmental economics today</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="error-message submit-error">
              ⚠️ {errors.submit}
            </div>
          )}

          {/* Name Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* User Type Selection */}
          <div className="form-group">
            <label>I am a...</label>
            <div className="user-type-grid">
              {userTypes.map((type) => (
                <div
                  key={type.value}
                  className={`user-type-card ${
                    formData.userType === type.value ? 'selected' : ''
                  }`}
                  onClick={() => handleUserTypeSelect(type.value)}
                >
                  <div className="user-type-header">
                    <span className="user-type-icon">{type.label.split(' ')[0]}</span>
                    <div className="user-type-info">
                      <h4>{type.label.split(' ').slice(1).join(' ')}</h4>
                      <p>{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <span className="error-text">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization (Optional)</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="University, Company, etc."
              />
            </div>
          </div>

          {/* Password Fields */}
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
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
            <div className="password-strength">
              <div className={`strength-bar ${formData.password.length >= 8 ? 'strong' : 'weak'}`}></div>
              <span className="strength-text">
                {formData.password.length >= 8 ? 'Strong password' : 'Weak password'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          {/* Terms Agreement */}
          <div className="form-group">
            <label className="checkbox-label terms">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              I agree to the{' '}
              <Link to="/terms" className="inline-link">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="inline-link">Privacy Policy</Link>
            </label>
            {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              'Create Account →'
            )}
          </button>
        </form>

        {/* Social Sign Up */}
        <div className="social-login">
          <div className="divider">
            <span>Or sign up with</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="social-btn google">
              <span className="social-icon">🔍</span>
              Google
            </button>
            <button type="button" className="social-btn github">
              <span className="social-icon">💻</span>
              GitHub
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Benefits Side Panel */}
      <div className="auth-welcome">
        <div className="welcome-content">
          <h2>Why Join EcoLearn?</h2>
          <p>Be part of Africa's premier environmental economics learning community</p>
          
          <div className="welcome-features">
            <div className="feature-item">
              <span className="feature-icon">🎓</span>
              <div>
                <h4>Expert-Led Courses</h4>
                <p>Learn from leading African environmental economists</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌍</span>
              <div>
                <h4>African Context</h4>
                <p>Content tailored for African challenges and opportunities</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛠️</span>
              <div>
                <h4>Practical Tools</h4>
                <p>Access calculators, simulators, and analysis tools</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <div>
                <h4>Network</h4>
                <p>Connect with professionals across Africa</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <div>
                <h4>Career Growth</h4>
                <p>Advance your career in green economy sectors</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💚</span>
              <div>
                <h4>Make Impact</h4>
                <p>Contribute to sustainable development in Africa</p>
              </div>
            </div>
          </div>

          <div className="testimonial">
            <p>"EcoLearn transformed how I approach environmental policy in my work. The African-focused content is invaluable!"</p>
            <div className="testimonial-author">
              <strong>Dr. Sarah K.</strong>
              <span>Policy Advisor, Nairobi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;