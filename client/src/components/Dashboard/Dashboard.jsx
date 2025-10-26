// client/src/components/Dashboard/Dashboard.jsx - FIXED VERSION
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const fetchDashboardData = async () => {
    const token = getToken();
    
    console.log('🔍 Dashboard initialization - Token:', !!token);

    if (!token) {
      setError('Not authorized, please login.');
      setLoading(false);
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 1️⃣ Fetch user info from API
      console.log('🔍 Fetching user data from /api/auth/me...');
      const userResponse = await axios.get('http://localhost:5000/api/auth/me');
      console.log('✅ User data from API:', userResponse.data.user);
      setUser(userResponse.data.user);

      // 2️⃣ Fetch courses
      try {
        const coursesResponse = await axios.get('http://localhost:5000/api/courses');
        console.log('🔍 Courses API response:', coursesResponse.data);
        
        const coursesData = coursesResponse.data;
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else if (coursesData && Array.isArray(coursesData.courses)) {
          setCourses(coursesData.courses);
        } else if (coursesData && coursesData.data) {
          setCourses(Array.isArray(coursesData.data) ? coursesData.data : []);
        } else {
          console.warn('⚠️ Courses data is not an array:', coursesData);
          setCourses([]);
        }
      } catch (coursesError) {
        console.warn('⚠️ Courses API failed:', coursesError);
        setCourses([]);
      }

      // 3️⃣ Fetch progress
      try {
        const progressResponse = await axios.get('http://localhost:5000/api/progress');
        console.log('🔍 Progress API response:', progressResponse.data);
        
        const progressData = progressResponse.data;
        if (Array.isArray(progressData)) {
          setProgress(progressData);
        } else if (progressData && Array.isArray(progressData.progress)) {
          setProgress(progressData.progress);
        } else if (progressData && progressData.data) {
          setProgress(Array.isArray(progressData.data) ? progressData.data : []);
        } else {
          console.warn('⚠️ Progress data is not an array:', progressData);
          setProgress([]);
        }
      } catch (progressError) {
        console.warn('⚠️ Progress API failed:', progressError);
        setProgress([]);
      }

      setError('');
    } catch (err) {
      console.error('❌ Dashboard fetch error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Unable to load dashboard.');
      } else {
        setError('Unable to connect to server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🎯 Dashboard component mounted');
    fetchDashboardData();

    const handleLoginEvent = () => {
      console.log('🔔 Login event received, refreshing dashboard...');
      fetchDashboardData();
    };

    window.addEventListener('userLogin', handleLoginEvent);

    return () => {
      window.removeEventListener('userLogin', handleLoginEvent);
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          ⚠️ {error}
          <br />
          <button onClick={fetchDashboardData} className="retry-btn">
            Try Again
          </button>
          <br />
          <Link to="/login" className="auth-link">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          ⚠️ User data not available
          <br />
          <Link to="/login" className="auth-link">Please login again</Link>
        </div>
      </div>
    );
  }

  console.log('🔍 RENDERING DASHBOARD WITH USER:', user);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.firstName || user.first_name || 'User'}!</h1>
        <p>Your learning dashboard</p>
      </div>

      <div className="dashboard-section">
        <h2>Your Courses</h2>
        {!Array.isArray(courses) || courses.length === 0 ? (
          <div className="dashboard-empty">
            <div className="empty-icon">📚</div>
            <h3>Start Your Learning Journey</h3>
            <p>You haven't enrolled in any courses yet. Explore our course catalog to begin learning!</p>
            <div className="empty-actions">
              <Link to="/courses" className="browse-courses-btn primary">
                Browse All Courses
              </Link>
              <Link to="/courses?category=beginner" className="browse-courses-btn secondary">
                Recommended for Beginners
              </Link>
            </div>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => {
              const courseProgress = progress.find(p => p.course_id === course.id)?.progress || 0;
              return (
                <div key={course.id} className="course-card">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${courseProgress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{courseProgress}% Complete</span>
                  </div>
                  <Link to={`/course/${course.id}`} className="continue-btn">
                    Continue Learning
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Profile Information</h2>
        <div className="profile-card">
          <div className="profile-field">
            <strong>Email:</strong> {user.email || 'Not provided'}
          </div>
          <div className="profile-field">
            <strong>Name:</strong> {user.firstName || user.first_name || 'Not provided'} {user.lastName || user.last_name || ''}
          </div>
          <div className="profile-field">
            <strong>Role:</strong> {user.userType || user.user_type || user.role || 'Student'}
          </div>
          <div className="profile-field">
            <strong>Joined:</strong> {user.join_date ? new Date(user.join_date).toLocaleDateString() : 'N/A'}
          </div>
          {user.organization && user.organization !== user.email && (
            <div className="profile-field">
              <strong>Organization:</strong> {user.organization}
            </div>
          )}
          {user.country && (
            <div className="profile-field">
              <strong>Country:</strong> {user.country}
            </div>
          )}
          {user.phone && (
            <div className="profile-field">
              <strong>Phone:</strong> {user.phone}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;