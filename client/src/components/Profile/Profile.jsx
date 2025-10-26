import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [learningStats, setLearningStats] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
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

      console.log('🔍 Fetching complete user data...');
      
      // Fetch user profile data from /api/auth/me
      const userResponse = await axios.get('http://localhost:5000/api/auth/me');
      console.log('✅ User data from auth/me:', userResponse.data);
      
      const userData = userResponse.data;
      setUser(userData);
      setFormData(userData);

      // Fetch learning statistics
      try {
        const statsResponse = await axios.get('http://localhost:5000/api/users/learning-stats');
        console.log('✅ Learning stats:', statsResponse.data);
        setLearningStats(statsResponse.data);
      } catch (statsError) {
        console.warn('⚠️ Could not fetch learning stats:', statsError.message);
        // Use mock data as fallback
        setLearningStats({
          total_hours: 45,
          courses_completed: 3,
          current_streak: 7,
          points: 1250,
          rank: 'Environmental Explorer'
        });
      }

      // Fetch certificates
      try {
        const certsResponse = await axios.get('http://localhost:5000/api/users/certificates');
        console.log('✅ Certificates:', certsResponse.data);
        setCertificates(certsResponse.data.certificates || []);
      } catch (certsError) {
        console.warn('⚠️ Could not fetch certificates:', certsError.message);
        setCertificates([]);
      }

      // Fetch course progress
      try {
        const progressResponse = await axios.get('http://localhost:5000/api/users/course-progress');
        console.log('✅ Course progress:', progressResponse.data);
        setCourseProgress(progressResponse.data.progress || []);
      } catch (progressError) {
        console.warn('⚠️ Could not fetch course progress:', progressError.message);
        setCourseProgress([]);
      }

      setError('');

    } catch (err) {
      console.error('❌ Profile fetch error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Unable to load profile data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const token = getToken();
    
    try {
      setLoading(true);
      
      // Prepare data for API - using actual database fields
      const updateData = {
        first_name: formData.first_name || formData.firstName || '',
        last_name: formData.last_name || formData.lastName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        country: formData.country || '',
        city: formData.city || '',
        organization: formData.organization || '',
        role: formData.role || '',
        bio: formData.bio || ''
      };

      console.log('💾 Saving profile data:', updateData);

      // Update user profile via API
      const response = await axios.put('http://localhost:5000/api/users/profile', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Profile updated successfully:', response.data);
      
      // Update local user data
      setUser(response.data.user);
      setFormData(response.data.user);
      setEditMode(false);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert('Profile updated successfully!');

    } catch (err) {
      console.error('❌ Profile update error:', err);
      console.error('❌ Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message
      });
      
      if (err.response?.status === 404) {
        setError('Profile update endpoint not found. Please check server configuration.');
      } else if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
    setError('');
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const token = getToken();
    const uploadData = new FormData();
    uploadData.append('avatar', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/users/upload-avatar', uploadData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('✅ Avatar uploaded:', response.data);
      
      // Update user data with new avatar
      setUser(prev => ({ ...prev, avatar: response.data.avatar }));
      alert('Avatar updated successfully!');
      
    } catch (err) {
      console.error('❌ Avatar upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload avatar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async (certificateId) => {
    const token = getToken();
    try {
      const response = await axios.get(`http://localhost:5000/api/users/certificates/${certificateId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Certificate download response:', response.data);
      
      if (response.data.downloadUrl) {
        window.open(response.data.downloadUrl, '_blank');
      } else {
        alert('Certificate download prepared: ' + response.data.message);
      }
      
    } catch (err) {
      console.error('❌ Certificate download error:', err);
      setError('Failed to download certificate. Please try again.');
    }
  };

  // Helper functions
  const getFullName = () => {
    if (!user) return 'User';
    return `${user.first_name || user.firstName || ''} ${user.last_name || user.lastName || ''}`.trim() || 'User';
  };

  const getUserAvatar = () => {
    if (!user) return <div className="avatar-fallback">U</div>;
    
    if (user.avatar) {
      return <div className="avatar-emoji">{user.avatar}</div>;
    }
    
    const initials = (user.first_name?.charAt(0) || user.firstName?.charAt(0) || 'U') + 
                    (user.last_name?.charAt(0) || user.lastName?.charAt(0) || '');
    return <div className="avatar-fallback">{initials}</div>;
  };

  const getUserRole = () => {
    if (!user) return 'Student';
    return user.role || user.user_type || 'Student';
  };

  const getUserLocation = () => {
    if (!user) return '📍 Unknown Location';
    
    const city = user.city || 'Unknown';
    const country = user.country || '';
    
    if (city && country) {
      return `📍 ${city}, ${country}`;
    } else if (city) {
      return `📍 ${city}`;
    } else if (country) {
      return `📍 ${country}`;
    } else {
      return '📍 Unknown Location';
    }
  };

  // Get actual stats from API or mock data
  const actualStats = learningStats || {
    total_hours: 45,
    courses_completed: 3,
    current_streak: 7,
    points: 1250,
    rank: 'Environmental Explorer'
  };

  if (loading && !user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="profile-page">
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

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-message">
            ⚠️ User data not available
            <br />
            <Link to="/login" className="auth-link">Please login again</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        {error && (
          <div className="error-banner">
            ⚠️ {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-hero">
            <div className="avatar-section">
              <div className="user-avatar-large">
                {getUserAvatar()}
                {editMode && (
                  <div className="avatar-upload">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="avatar-upload" className="upload-label">
                      📷 Change Photo
                    </label>
                  </div>
                )}
              </div>
              {!editMode && (
                <button 
                  className="edit-profile-btn"
                  onClick={() => setEditMode(true)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Edit Profile'}
                </button>
              )}
            </div>
            <div className="profile-info">
              <h1>{getFullName()}</h1>
              <p className="user-role">{getUserRole()}</p>
              <p className="user-location">{getUserLocation()}</p>
              <div className="profile-stats">
                <div className="profile-stat">
                  <strong>{actualStats.courses_completed}</strong>
                  <span>Courses Completed</span>
                </div>
                <div className="profile-stat">
                  <strong>{actualStats.total_hours}h</strong>
                  <span>Learning Time</span>
                </div>
                <div className="profile-stat">
                  <strong>{actualStats.points}</strong>
                  <span>Points</span>
                </div>
                <div className="profile-stat">
                  <strong>{actualStats.current_streak}🔥</strong>
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
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || formData.firstName || ''}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || formData.lastName || ''}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="+254 XXX XXX XXX"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="">Select Country</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization || ''}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Role/Position</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ''}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>About Me (Bio)</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about yourself and your interests in environmental economics..."
                      disabled={loading}
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="save-btn" 
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      className="cancel-btn" 
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name</label>
                      <p>{getFullName()}</p>
                    </div>
                    <div className="info-item">
                      <label>Email</label>
                      <p>{user.email || 'Not provided'}</p>
                    </div>
                    <div className="info-item">
                      <label>Phone</label>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                    <div className="info-item">
                      <label>Location</label>
                      <p>{getUserLocation().replace('📍 ', '')}</p>
                    </div>
                    <div className="info-item">
                      <label>Organization</label>
                      <p>{user.organization || 'Not provided'}</p>
                    </div>
                    <div className="info-item">
                      <label>Role</label>
                      <p>{getUserRole()}</p>
                    </div>
                  </div>

                  <div className="bio-section">
                    <h3>About Me</h3>
                    <p>{user.bio || 'No bio provided yet.'}</p>
                  </div>

                  <div className="account-info">
                    <h3>Account Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Member Since</label>
                        <p>
                          {user.join_date ? new Date(user.join_date).toLocaleDateString() : 
                           user.created_at ? new Date(user.created_at).toLocaleDateString() : 
                           'N/A'}
                        </p>
                      </div>
                      <div className="info-item">
                        <label>Last Login</label>
                        <p>
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 
                           'N/A'}
                        </p>
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
                    <h3>{actualStats.rank}</h3>
                    <p>Your current learning rank</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📚</div>
                  <div className="stat-content">
                    <h3>{actualStats.courses_completed}</h3>
                    <p>Courses Completed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-content">
                    <h3>{actualStats.total_hours}h</h3>
                    <p>Total Learning Time</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-content">
                    <h3>{actualStats.current_streak}</h3>
                    <p>Current Streak</p>
                  </div>
                </div>
              </div>

              <div className="progress-section">
                <h3>Course Progress</h3>
                {courseProgress.length > 0 ? (
                  <div className="course-progress-list">
                    {courseProgress.map((course) => (
                      <div key={course.course_id} className="progress-item">
                        <div className="course-info">
                          <span className="course-icon">🌱</span>
                          <div>
                            <h4>{course.course_name}</h4>
                            <p>Last activity: {new Date(course.last_activity).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{width: `${course.progress_percentage}%`}}
                          ></div>
                        </div>
                        <span className="progress-percent">{course.progress_percentage}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-data">
                    <p>No course progress data available. Start learning to see your progress here!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="tab-panel">
              <div className="panel-header">
                <h2>Certificates</h2>
                <p>Your earned certificates and achievements</p>
              </div>

              {certificates.length > 0 ? (
                <div className="certificates-grid">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="certificate-card">
                      <div className="certificate-header">
                        <div className="certificate-icon">🏆</div>
                        <div className="certificate-info">
                          <h3>{cert.course_name}</h3>
                          <p>Completed on: {new Date(cert.completion_date).toLocaleDateString()}</p>
                          <span className="certificate-score">Score: {cert.score}%</span>
                        </div>
                      </div>
                      <button 
                        className="download-btn"
                        onClick={() => downloadCertificate(cert.id)}
                      >
                        📥 Download Certificate
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No certificates earned yet. Complete courses to earn certificates!</p>
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