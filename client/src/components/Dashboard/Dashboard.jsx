import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock user data
    setUser({
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      country: 'Kenya',
      userType: 'student',
      joinDate: '2024-01-15',
      avatar: '👩‍🎓'
    });
  }, []);

  const stats = {
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalPoints: 1250,
    currentStreak: 7,
    quizzesTaken: 8,
    certificates: 2
  };

  const enrolledCourses = [
    {
      id: 1,
      title: 'Introduction to Environmental Economics',
      progress: 85,
      nextModule: 'Carbon Pricing Mechanisms',
      lastActivity: '2 days ago',
      image: '🌱'
    },
    {
      id: 2,
      title: 'Carbon Pricing and Taxes',
      progress: 45,
      nextModule: 'Tax Implementation Strategies',
      lastActivity: '1 week ago',
      image: '💰'
    }
  ];

  const achievements = [
    { name: 'First Steps', icon: '🚀', description: 'Complete your first module', earned: true },
    { name: 'Quiz Master', icon: '🎯', description: 'Score 100% on 5 quizzes', earned: true },
    { name: 'Case Study Expert', icon: '📖', description: 'Read 10 case studies', earned: false },
    { name: 'Environmental Champion', icon: '🌍', description: 'Complete all courses', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed quiz', course: 'Introduction to Environmental Economics', time: '2 hours ago', score: '95%' },
    { action: 'Started module', course: 'Carbon Pricing and Taxes', time: '1 day ago', module: 'Tax Models' },
    { action: 'Earned badge', course: 'Achievement', time: '2 days ago', badge: 'Quiz Master' },
    { action: 'Downloaded resource', course: 'Case Studies', time: '3 days ago', resource: 'Zambia Mining Report' }
  ];

  if (!user) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-info">
              <h1>Welcome back, {user.name}! 👋</h1>
              <p>Continue your journey in environmental economics</p>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/courses" className="cta-button primary">
              Browse Courses 📚
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.coursesCompleted}</h3>
              <p>Courses Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{stats.coursesInProgress}</h3>
              <p>Courses in Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{stats.totalPoints}</h3>
              <p>Total Points</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{stats.currentStreak}</h3>
              <p>Day Streak</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 My Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 Achievements
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            📈 Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              {/* Continue Learning */}
              <div className="dashboard-section">
                <h2>Continue Learning</h2>
                <div className="courses-grid">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="course-progress-card">
                      <div className="course-header">
                        <span className="course-icon">{course.image}</span>
                        <div className="course-info">
                          <h4>{course.title}</h4>
                          <p>Next: {course.nextModule}</p>
                        </div>
                      </div>
                      <div className="progress-section">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{course.progress}%</span>
                      </div>
                      <div className="course-actions">
                        <Link 
                          to={`/course/${course.id}`} 
                          className="continue-btn"
                        >
                          Continue →
                        </Link>
                        <span className="last-activity">{course.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="dashboard-section">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  {recentActivity.slice(0, 3).map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">📝</div>
                      <div className="activity-details">
                        <p><strong>{activity.action}</strong> in {activity.course}</p>
                        <span className="activity-time">{activity.time}</span>
                        {activity.score && <span className="activity-score">Score: {activity.score}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                  <Link to="/tools" className="quick-action-card">
                    <span className="action-icon">🛠️</span>
                    <h4>Practical Tools</h4>
                    <p>Use calculators and simulators</p>
                  </Link>
                  <Link to="/case-studies" className="quick-action-card">
                    <span className="action-icon">📖</span>
                    <h4>Case Studies</h4>
                    <p>Explore real-world examples</p>
                  </Link>
                  <Link to="/statistics" className="quick-action-card">
                    <span className="action-icon">📊</span>
                    <h4>Statistics</h4>
                    <p>View environmental data</p>
                  </Link>
                  <Link to="/quiz" className="quick-action-card">
                    <span className="action-icon">🎯</span>
                    <h4>Take a Quiz</h4>
                    <p>Test your knowledge</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="courses-tab">
              <h2>My Courses</h2>
              <div className="enrolled-courses">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="enrolled-course-card">
                    <div className="course-main">
                      <span className="course-icon-large">{course.image}</span>
                      <div className="course-details">
                        <h3>{course.title}</h3>
                        <p>Last activity: {course.lastActivity}</p>
                        <div className="progress-section">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{course.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="course-actions">
                      <Link to={`/course/${course.id}`} className="cta-button primary">
                        {course.progress === 0 ? 'Start' : 'Continue'}
                      </Link>
                      <Link to={`/quiz/${course.id}`} className="cta-button secondary">
                        Take Quiz
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-tab">
              <h2>My Achievements</h2>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                  >
                    <div className="achievement-icon">
                      {achievement.icon}
                    </div>
                    <div className="achievement-info">
                      <h4>{achievement.name}</h4>
                      <p>{achievement.description}</p>
                    </div>
                    <div className="achievement-status">
                      {achievement.earned ? '✅ Earned' : '🔒 Locked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-tab">
              <h2>Recent Activity</h2>
              <div className="activity-timeline">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="activity-header">
                        <h4>{activity.action}</h4>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                      <p className="activity-description">
                        {activity.course}
                        {activity.module && ` - ${activity.module}`}
                        {activity.score && ` - Score: ${activity.score}`}
                        {activity.badge && ` - Badge: ${activity.badge}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;