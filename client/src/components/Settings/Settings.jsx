import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    // Account settings
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification settings
    emailNotifications: true,
    courseUpdates: true,
    assignmentReminders: true,
    newsletter: false,
    pushNotifications: true,
    
    // Privacy settings
    profileVisibility: 'public',
    showProgress: true,
    showCertificates: true,
    dataSharing: false,
    
    // Preferences
    language: 'en',
    timezone: 'Africa/Nairobi',
    theme: 'light',
    fontSize: 'medium'
  });

  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const fetchUserData = async () => {
    const token = getToken();
    
    if (!token) {
      setError('Not authorized, please login.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userResponse = await axios.get('http://localhost:5000/api/auth/me');
      setUser(userResponse.data);
      
      // Initialize form data with user data
      setFormData(prev => ({
        ...prev,
        email: userResponse.data.email || ''
      }));

    } catch (err) {
      console.error('❌ Settings fetch error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Unable to load settings.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async (section) => {
    const token = getToken();
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      let updateData = {};
      let endpoint = '';

      switch (section) {
        case 'account':
          // Validate password change
          if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match.');
            return;
          }

          updateData = {
            email: formData.email
          };

          if (formData.newPassword) {
            if (!formData.currentPassword) {
              setError('Current password is required to set a new password.');
              return;
            }
            updateData.currentPassword = formData.currentPassword;
            updateData.newPassword = formData.newPassword;
          }

          endpoint = '/api/users/account';
          break;

        case 'notifications':
          updateData = {
            email_notifications: formData.emailNotifications,
            course_updates: formData.courseUpdates,
            assignment_reminders: formData.assignmentReminders,
            newsletter: formData.newsletter,
            push_notifications: formData.pushNotifications
          };
          endpoint = '/api/users/notifications';
          break;

        case 'privacy':
          updateData = {
            profile_visibility: formData.profileVisibility,
            show_progress: formData.showProgress,
            show_certificates: formData.showCertificates,
            data_sharing: formData.dataSharing
          };
          endpoint = '/api/users/privacy';
          break;

        case 'preferences':
          updateData = {
            language: formData.language,
            timezone: formData.timezone,
            theme: formData.theme,
            font_size: formData.fontSize
          };
          endpoint = '/api/users/preferences';
          break;

        default:
          return;
      }

      console.log(`💾 Saving ${section} settings:`, updateData);

      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes - in real app, make actual API call
      // const response = await axios.put(`http://localhost:5000${endpoint}`, updateData, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      setSuccess(`${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully!`);
      
      // Clear password fields after successful update
      if (section === 'account') {
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

    } catch (err) {
      console.error(`❌ ${section} settings update error:`, err);
      setError(err.response?.data?.message || `Failed to update ${section} settings. Please try again.`);
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      setLoading(true);
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Your data has been prepared for download. Check your email for the download link.');
    } catch (err) {
      setError('Failed to export data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone. All your data, progress, and certificates will be permanently lost.'
    );

    if (confirmDelete) {
      setError('Account deletion feature is not yet implemented. Please contact support.');
    }
  };

  if (loading && !user) {
    return (
      <div className="settings-page">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading your settings...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="settings-page">
        <div className="container">
          <div className="error-message">
            ⚠️ {error}
            <br />
            <Link to="/login" className="auth-link">Please login again</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="container">
        {/* Header */}
        <div className="settings-header">
          <div className="header-content">
            <h1>Settings</h1>
            <p>Manage your account preferences and privacy settings</p>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            ⚠️ {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        {success && (
          <div className="success-banner">
            ✅ {success}
            <button onClick={() => setSuccess('')} className="close-error">×</button>
          </div>
        )}

        <div className="settings-layout">
          {/* Sidebar Navigation */}
          <div className="settings-sidebar">
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeSection === 'account' ? 'active' : ''}`}
                onClick={() => setActiveSection('account')}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-text">Account</span>
              </button>

              <button 
                className={`nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveSection('notifications')}
              >
                <span className="nav-icon">🔔</span>
                <span className="nav-text">Notifications</span>
              </button>

              <button 
                className={`nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveSection('privacy')}
              >
                <span className="nav-icon">🛡️</span>
                <span className="nav-text">Privacy & Security</span>
              </button>

              <button 
                className={`nav-item ${activeSection === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveSection('preferences')}
              >
                <span className="nav-icon">🎨</span>
                <span className="nav-text">Preferences</span>
              </button>

              <div className="nav-divider"></div>

              <button 
                className={`nav-item ${activeSection === 'data' ? 'active' : ''}`}
                onClick={() => setActiveSection('data')}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Data Management</span>
              </button>

              <button 
                className={`nav-item danger ${activeSection === 'danger' ? 'active' : ''}`}
                onClick={() => setActiveSection('danger')}
              >
                <span className="nav-icon">⚠️</span>
                <span className="nav-text">Danger Zone</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="settings-content">
            {/* Account Settings */}
            {activeSection === 'account' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <p>Manage your account information and password</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-divider">
                    <span>Change Password</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={() => handleSaveSettings('account')}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Settings</h2>
                <p>Control how and when you receive notifications</p>

                <div className="settings-grid">
                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Email Notifications
                    </label>
                    <p>Receive important updates via email</p>
                  </div>

                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="courseUpdates"
                        checked={formData.courseUpdates}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Course Updates
                    </label>
                    <p>Get notified about new course content and updates</p>
                  </div>

                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="assignmentReminders"
                        checked={formData.assignmentReminders}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Assignment Reminders
                    </label>
                    <p>Reminders for upcoming assignment deadlines</p>
                  </div>

                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      EcoLearn Newsletter
                    </label>
                    <p>Monthly newsletter with environmental economics insights</p>
                  </div>

                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={formData.pushNotifications}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Push Notifications
                    </label>
                    <p>Browser notifications for real-time updates</p>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => handleSaveSettings('notifications')}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeSection === 'privacy' && (
              <div className="settings-section">
                <h2>Privacy & Security</h2>
                <p>Control your privacy and data sharing preferences</p>

                <div className="settings-form">
                  <div className="form-group">
                    <label htmlFor="profileVisibility">Profile Visibility</label>
                    <select
                      id="profileVisibility"
                      name="profileVisibility"
                      value={formData.profileVisibility}
                      onChange={handleInputChange}
                    >
                      <option value="public">Public - Anyone can see my profile</option>
                      <option value="members">Members Only - Only logged-in users</option>
                      <option value="private">Private - Only me</option>
                    </select>
                  </div>

                  <div className="settings-grid">
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="showProgress"
                          checked={formData.showProgress}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Show Learning Progress
                      </label>
                      <p>Allow others to see your course progress and achievements</p>
                    </div>

                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="showCertificates"
                          checked={formData.showCertificates}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Show Certificates
                      </label>
                      <p>Display your earned certificates on your public profile</p>
                    </div>

                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="dataSharing"
                          checked={formData.dataSharing}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        Anonymous Data Sharing
                      </label>
                      <p>Help improve EcoLearn by sharing anonymous usage data</p>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={() => handleSaveSettings('privacy')}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Privacy Settings'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeSection === 'preferences' && (
              <div className="settings-section">
                <h2>Preferences</h2>
                <p>Customize your learning experience</p>

                <div className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="language">Language</label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                      >
                        <option value="en">English</option>
                        <option value="sw">Swahili</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="timezone">Timezone</label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                      >
                        <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                        <option value="Africa/Lagos">West Africa Time (WAT)</option>
                        <option value="UTC">UTC</option>
                        <option value="Europe/London">GMT</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="theme">Theme</label>
                      <select
                        id="theme"
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="fontSize">Font Size</label>
                      <select
                        id="fontSize"
                        name="fontSize"
                        value={formData.fontSize}
                        onChange={handleInputChange}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xlarge">Extra Large</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={() => handleSaveSettings('preferences')}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeSection === 'data' && (
              <div className="settings-section">
                <h2>Data Management</h2>
                <p>Manage your personal data and exports</p>

                <div className="data-actions">
                  <div className="data-card">
                    <div className="data-icon">📥</div>
                    <div className="data-content">
                      <h3>Export Your Data</h3>
                      <p>Download a copy of your personal data, including course progress, certificates, and account information.</p>
                      <button 
                        className="export-btn"
                        onClick={handleExportData}
                        disabled={loading}
                      >
                        {loading ? 'Preparing...' : 'Export Data'}
                      </button>
                    </div>
                  </div>

                  <div className="data-card">
                    <div className="data-icon">🗑️</div>
                    <div className="data-content">
                      <h3>Clear Learning Data</h3>
                      <p>Reset your course progress and learning history while keeping your account active.</p>
                      <button className="clear-btn">
                        Clear Learning Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <div className="settings-section">
                <h2 className="danger-title">Danger Zone</h2>
                <p className="danger-subtitle">Irreversible actions that will affect your account</p>

                <div className="danger-actions">
                  <div className="danger-card">
                    <div className="danger-content">
                      <h3>Delete Account</h3>
                      <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <ul className="warning-list">
                        <li>All course progress will be lost</li>
                        <li>Certificates will be revoked</li>
                        <li>Personal data will be permanently deleted</li>
                        <li>This action is irreversible</li>
                      </ul>
                      <button 
                        className="delete-btn"
                        onClick={handleDeleteAccount}
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;