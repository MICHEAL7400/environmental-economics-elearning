import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
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
        'Kenya', 'Nigeria', 'Ghana', 'South Africa', 'Ethiopia', 'Tanzania',
        'Uganda', 'Rwanda', 'Zambia', 'Zimbabwe', 'Botswana', 'Senegal',
        'Other'
    ];

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        if (error) setError('');
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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

        if (passwordStrength < 75) {
            return 'Please choose a stronger password';
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

    setIsLoading(true);
    setErrors({});
    
    try {
      // Prepare data for backend - match the expected field names
      const submitData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: formData.role,
        country: formData.country || '',
        organization: formData.organization || ''
      };

      console.log('Sending registration data:', submitData);

      // First, test if backend is reachable
      try {
        await axios.get('http://localhost:5000/api/health');
        console.log('✅ Backend server is running');
      } catch (healthError) {
        throw new Error('Backend server is not running. Please make sure the server is started on port 5000.');
      }

      const response = await axios.post('http://localhost:5000/api/auth/register', submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      });
      
      console.log('✅ Registration successful:', response.data);
      
      // ✅ SUCCESS: Show success message
      setErrors({ 
        success: '🎉 Account created successfully! Redirecting to login...' 
      });

      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        country: '',
        organization: '',
        agreeToTerms: false
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login', { 
          replace: true,
          state: { 
            successMessage: 'Account created successfully! Please sign in with your new credentials.',
            prefillEmail: submitData.email 
          }
        });
      }, 2000);
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      if (error.message.includes('Backend server is not running')) {
        setErrors({ 
          submit: '🚨 ' + error.message 
        });
      } else if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Registration failed. Please try again.';
        setErrors({ 
          submit: '❌ ' + errorMessage 
        });
      } else if (error.request) {
        // Request was made but no response received
        setErrors({ 
          submit: '🌐 Cannot connect to server. Please make sure the backend is running on http://localhost:5000' 
        });
      } else {
        // Something else happened
        setErrors({ 
          submit: '⚠️ An unexpected error occurred. Please try again.' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>

            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">
                        <span className="logo-icon">🌍</span>
                        <span className="logo-text">EcoLearn</span>
                    </Link>
                    <h1>Join EcoLearn Today! 🌱</h1>
                    <p>Start your journey in environmental economics</p>
                </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Success Message */}
          {errors.success && (
            <div className="success-message">
              ✅ {errors.success}
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          {/* Name Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter your first name"
                disabled={isLoading}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter your last name"
                disabled={isLoading}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* User Type Selection */}
          <div className="form-group">
            <label>I am a... *</label>
            <div className="user-type-grid">
              {userTypes.map((type) => (
                <div
                  key={type.value}
                  className={`user-type-card ${
                    formData.role === type.value ? 'selected' : ''
                  } ${isLoading ? 'disabled' : ''}`}
                  onClick={() => !isLoading && handleUserTypeSelect(type.value)}
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
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Create a password (min. 6 characters)"
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
            <div className="password-strength">
              <div className={`strength-bar ${
                formData.password.length >= 6 ? 'strong' : 'weak'
              }`}></div>
              <span className="strength-text">
                {formData.password.length >= 6 ? 'Password meets requirements' : 'Minimum 6 characters required'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              I agree to the{' '}
              <Link to="/terms" className="inline-link">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="inline-link">Privacy Policy</Link>
              {' '}*
            </label>
            {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
          </div>

                    <button 
                        type="submit" 
                        className="auth-button primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="button-spinner"></div>
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

        {/* Social Sign Up */}
        <div className="social-login">
          <div className="divider">
            <span>Or sign up with</span>
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

            <div className="auth-features">
                <div className="features-content">
                    <h2>Why Join EcoLearn?</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <span className="feature-icon">🎓</span>
                            <div>
                                <h4>Expert-Led Courses</h4>
                                <p>Learn from leading environmental economics experts</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🛠️</span>
                            <div>
                                <h4>Practical Tools</h4>
                                <p>Access calculators and analysis tools for real-world applications</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📖</span>
                            <div>
                                <h4>African Case Studies</h4>
                                <p>Learn through context-specific African examples</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🤝</span>
                            <div>
                                <h4>Global Community</h4>
                                <p>Connect with environmental professionals across Africa</p>
                            </div>
                        </div>
                    </div>

                    <div className="stats-preview">
                        <div className="stat">
                            <h3>15,000+</h3>
                            <p>Active Learners</p>
                        </div>
                        <div className="stat">
                            <h3>50+</h3>
                            <p>Expert Courses</p>
                        </div>
                        <div className="stat">
                            <h3>25+</h3>
                            <p>African Countries</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;