import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = (role) => {
        const demoAccounts = {
            student: { email: 'student@ecolearn.org', password: 'demo123' },
            instructor: { email: 'instructor@ecolearn.org', password: 'demo123' },
            admin: { email: 'admin@ecolearn.org', password: 'admin123' }
        };

        setFormData(demoAccounts[role]);
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
                    <h1>Welcome Back!</h1>
                    <p>Sign in to continue your environmental economics journey</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <span className="alert-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
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

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <span className="input-icon">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
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
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input type="checkbox" />
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
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="button-spinner"></div>
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="demo-section">
                    <div className="demo-divider">
                        <span>Quick Demo Access</span>
                    </div>
                    
                    <div className="demo-buttons">
                        <button
                            type="button"
                            className="demo-button student"
                            onClick={() => handleDemoLogin('student')}
                            disabled={loading}
                        >
                            👨‍🎓 Student Demo
                        </button>
                        <button
                            type="button"
                            className="demo-button instructor"
                            onClick={() => handleDemoLogin('instructor')}
                            disabled={loading}
                        >
                            👨‍🏫 Instructor Demo
                        </button>
                        <button
                            type="button"
                            className="demo-button admin"
                            onClick={() => handleDemoLogin('admin')}
                            disabled={loading}
                        >
                            ⚙️ Admin Demo
                        </button>
                    </div>
                </div>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="auth-link">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>

            <div className="auth-features">
                <div className="features-content">
                    <h2>Continue Your Learning Journey</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <span className="feature-icon">📚</span>
                            <div>
                                <h4>Access All Courses</h4>
                                <p>Continue where you left off with personalized learning paths</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🎯</span>
                            <div>
                                <h4>Track Your Progress</h4>
                                <p>Monitor your achievements and course completion</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🏆</span>
                            <div>
                                <h4>Earn Certificates</h4>
                                <p>Get recognized for your environmental economics expertise</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🌍</span>
                            <div>
                                <h4>Join the Community</h4>
                                <p>Connect with fellow learners and experts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;