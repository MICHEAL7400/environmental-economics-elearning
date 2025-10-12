import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Mock user data
    const userData = {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+254 712 345 678',
      country: 'Kenya',
      city: 'Nairobi',
      organization: 'University of Nairobi',
      role: 'Environmental Science Student',
      bio: 'Passionate about sustainable development and environmental economics in African contexts.',
      avatar: '👩‍🎓',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-15',
      notifications: {
        email: true,
        sms: false,
        courseUpdates: true,
        newsletter: true,
        promotional: false
      },
      privacy: {
        profilePublic: true,
        showProgress: true,
        showAchievements: true
      }
    };
    setUser(userData);
    setFormData(userData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Simulate API call
    console.log('Saving profile:', formData);
    setUser(formData);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  const learningStats = {
    totalHours: 45,
    coursesCompleted: 3,
    currentStreak: 7,
    points: 1250,
    rank: 'Environmental Explorer'
  };

  const recentCertificates = [
    {
      id: 1,
      course: 'Introduction to Environmental Economics',
      date: '2024-02-15',
      score: '95%',
      downloadUrl: '#'
    },
    {
      id: 2,
      course: 'Carbon Pricing Fundamentals',
      date: '2024-03-01',
      score: '88%',
      downloadUrl: '#'
    }
  ];

  if (!user) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-hero">
            <div className="avatar-section">
              <div className="user-avatar-large">{user.avatar}</div>
              {!editMode && (
                <button 
                  className="edit-profile-btn"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="profile-info">
              <h1>{user.firstName} {user.lastName}</h1>
              <p className="user-role">{user.role}</p>
              <p className="user-location">📍 {user.city}, {user.country}</p>
              <div className="profile-stats">
                <div className="profile-stat">
                  <strong>{learningStats.coursesCompleted}</strong>
                  <span>Courses Completed</span>
                </div>
                <div className="profile-stat">
                  <strong>{learningStats.totalHours}h</strong>
                  <span>Learning Time</span>
                </div>
                <div className="profile-stat">
                  <strong>{learningStats.points}</strong>
                  <span>Points</span>
                </div>
                <div className="profile-stat">
                  <strong>{learningStats.currentStreak}🔥</strong>
                  <span>Day Streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            👤 Personal Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveTab('learning')}
          >
            📚 Learning Progress
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            🏆 Certificates
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === 'personal' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Personal Information</h2>
                <p>Manage your personal details and profile information</p>
              </div>

              {editMode ? (
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Ethiopia">Ethiopia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Role/Position</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about yourself and your interests in environmental economics..."
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button className="save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name</label>
                      <p>{user.firstName} {user.lastName}</p>
                    </div>
                    <div className="info-item">
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="info-item">
                      <label>Phone</label>
                      <p>{user.phone}</p>
                    </div>
                    <div className="info-item">
                      <label>Location</label>
                      <p>{user.city}, {user.country}</p>
                    </div>
                    <div className="info-item">
                      <label>Organization</label>
                      <p>{user.organization}</p>
                    </div>
                    <div className="info-item">
                      <label>Role</label>
                      <p>{user.role}</p>
                    </div>
                  </div>

                  <div className="bio-section">
                    <h3>About Me</h3>
                    <p>{user.bio}</p>
                  </div>

                  <div className="account-info">
                    <h3>Account Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Member Since</label>
                        <p>{new Date(user.joinDate).toLocaleDateString()}</p>
                      </div>
                      <div className="info-item">
                        <label>Last Login</label>
                        <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Learning Progress</h2>
                <p>Track your learning journey and achievements</p>
              </div>

              <div className="learning-stats-cards">
                <div className="stat-card large">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <h3>{learningStats.rank}</h3>
                    <p>Your current learning rank</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📚</div>
                  <div className="stat-content">
                    <h3>{learningStats.coursesCompleted}</h3>
                    <p>Courses Completed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-content">
                    <h3>{learningStats.totalHours}h</h3>
                    <p>Total Learning Time</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-content">
                    <h3>{learningStats.currentStreak}</h3>
                    <p>Current Streak</p>
                  </div>
                </div>
              </div>

              <div className="progress-section">
                <h3>Course Progress</h3>
                <div className="course-progress-list">
                  <div className="progress-item">
                    <div className="course-info">
                      <span className="course-icon">🌱</span>
                      <div>
                        <h4>Introduction to Environmental Economics</h4>
                        <p>Last activity: 2 days ago</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '85%'}}></div>
                    </div>
                    <span className="progress-percent">85%</span>
                  </div>
                  <div className="progress-item">
                    <div className="course-info">
                      <span className="course-icon">💰</span>
                      <div>
                        <h4>Carbon Pricing and Taxes</h4>
                        <p>Last activity: 1 week ago</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '45%'}}></div>
                    </div>
                    <span className="progress-percent">45%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Account Settings</h2>
                <p>Manage your notification and privacy preferences</p>
              </div>

              <div className="settings-sections">
                {/* Notifications */}
                <div className="settings-section">
                  <h3>Notification Preferences</h3>
                  <div className="settings-grid">
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.notifications?.email}
                          onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
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
                          checked={formData.notifications?.sms}
                          onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        SMS Notifications
                      </label>
                      <p>Receive text message alerts</p>
                    </div>
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.notifications?.courseUpdates}
                          onChange={(e) => handleNestedChange('notifications', 'courseUpdates', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Course Updates
                      </label>
                      <p>Get notified about new course content</p>
                    </div>
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.notifications?.newsletter}
                          onChange={(e) => handleNestedChange('notifications', 'newsletter', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Monthly Newsletter
                      </label>
                      <p>Receive our environmental economics newsletter</p>
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div className="settings-section">
                  <h3>Privacy Settings</h3>
                  <div className="settings-grid">
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.privacy?.profilePublic}
                          onChange={(e) => handleNestedChange('privacy', 'profilePublic', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Public Profile
                      </label>
                      <p>Allow others to view your profile</p>
                    </div>
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.privacy?.showProgress}
                          onChange={(e) => handleNestedChange('privacy', 'showProgress', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Show Learning Progress
                      </label>
                      <p>Display your course progress to others</p>
                    </div>
                    <div className="setting-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.privacy?.showAchievements}
                          onChange={(e) => handleNestedChange('privacy', 'showAchievements', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Show Achievements
                      </label>
                      <p>Display your badges and achievements</p>
                    </div>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="save-btn" onClick={handleSave}>
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>My Certificates</h2>
                <p>Download and share your course completion certificates</p>
              </div>

              <div className="certificates-grid">
                {recentCertificates.map(certificate => (
                  <div key={certificate.id} className="certificate-card">
                    <div className="certificate-header">
                      <span className="certificate-icon">🏆</span>
                      <div className="certificate-info">
                        <h3>{certificate.course}</h3>
                        <p>Completed on {new Date(certificate.date).toLocaleDateString()}</p>
                        <span className="certificate-score">Score: {certificate.score}</span>
                      </div>
                    </div>
                    <div className="certificate-actions">
                      <button className="download-btn">
                        📥 Download PDF
                      </button>
                      <button className="share-btn">
                        🔗 Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {recentCertificates.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📜</div>
                  <h3>No Certificates Yet</h3>
                  <p>Complete your first course to earn a certificate!</p>
                  <Link to="/courses" className="cta-button primary">
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;