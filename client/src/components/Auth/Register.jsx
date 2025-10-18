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
        country: '',
        userType: 'student'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { register, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

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
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            return 'Please fill in all required fields';
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return 'Please enter a valid email address';
        }

        if (formData.password.length < 8) {
            return 'Password must be at least 8 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match';
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

        try {
            const { confirmPassword, ...submitData } = formData;
            const result = await register(submitData);
            
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength >= 75) return { text: 'Strong', color: 'var(--success-color)' };
        if (passwordStrength >= 50) return { text: 'Good', color: 'var(--warning-color)' };
        if (passwordStrength >= 25) return { text: 'Weak', color: 'var(--danger-color)' };
        return { text: 'Very Weak', color: 'var(--danger-color)' };
    };

    const strengthInfo = getPasswordStrengthText();

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

                {error && (
                    <div className="alert alert-error">
                        <span className="alert-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <div className="input-with-icon">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <div className="input-with-icon">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <div className="input-with-icon">
                            <span className="input-icon">📧</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="userType">I am a *</label>
                            <div className="input-with-icon">
                                <span className="input-icon">🎯</span>
                                <select
                                    id="userType"
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country *</label>
                            <div className="input-with-icon">
                                <span className="input-icon">🌍</span>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Select your country</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <div className="input-with-icon">
                            <span className="input-icon">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        
                        {formData.password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-fill"
                                        style={{
                                            width: `${passwordStrength}%`,
                                            backgroundColor: strengthInfo.color
                                        }}
                                    ></div>
                                </div>
                                <span 
                                    className="strength-text"
                                    style={{ color: strengthInfo.color }}
                                >
                                    {strengthInfo.text}
                                </span>
                            </div>
                        )}

                        <div className="password-requirements">
                            <p>Password must contain:</p>
                            <ul>
                                <li className={formData.password.length >= 8 ? 'met' : ''}>
                                    At least 8 characters
                                </li>
                                <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>
                                    One uppercase letter
                                </li>
                                <li className={/[0-9]/.test(formData.password) ? 'met' : ''}>
                                    One number
                                </li>
                                <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'met' : ''}>
                                    One special character
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <div className="input-with-icon">
                            <span className="input-icon">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                disabled={loading}
                            />
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <div className="input-error">Passwords do not match</div>
                        )}
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input 
                                type="checkbox" 
                                required 
                            />
                            <span className="checkmark"></span>
                            I agree to the{' '}
                            <Link to="/terms" className="inline-link">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="inline-link">
                                Privacy Policy
                            </Link>
                        </label>
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