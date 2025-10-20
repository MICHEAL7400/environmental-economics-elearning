// client/src/components/Admin/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeUsers: 0,
    revenue: 0
  });

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalUsers: 15234,
      totalCourses: 28,
      activeUsers: 3245,
      revenue: 45200
    });
  }, []);

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>📊 Dashboard Overview</h2>
        <div className="header-actions">
          <span>Last updated: Today</span>
        </div>
      </div>

      <div className="page-content">
        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers.toLocaleString()}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-trend positive">+12%</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{stats.totalCourses}</h3>
              <p>Total Courses</p>
            </div>
            <div className="stat-trend positive">+5%</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{stats.activeUsers.toLocaleString()}</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-trend positive">+8%</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${stats.revenue.toLocaleString()}</h3>
              <p>Revenue</p>
            </div>
            <div className="stat-trend positive">+15%</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="action-grid">
            <Link to="/admin/courses/new" className="action-card">
              <span className="action-icon">➕</span>
              <h4>Add New Course</h4>
              <p>Create a new course with modules and quizzes</p>
            </Link>

            <Link to="/admin/content/upload" className="action-card">
              <span className="action-icon">📤</span>
              <h4>Upload Content</h4>
              <p>Upload documents, videos, or learning materials</p>
            </Link>

            <Link to="/admin/users" className="action-card">
              <span className="action-icon">👥</span>
              <h4>Manage Users</h4>
              <p>View and manage user accounts</p>
            </Link>

            <Link to="/admin/analytics" className="action-card">
              <span className="action-icon">📈</span>
              <h4>View Analytics</h4>
              <p>Detailed reports and performance metrics</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-avatar">👤</div>
              <div className="activity-details">
                <p><strong>John Doe</strong> completed course <strong>Environmental Economics</strong></p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">👤</div>
              <div className="activity-details">
                <p><strong>Sarah Smith</strong> registered as a new user</p>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-avatar">👤</div>
              <div className="activity-details">
                <p><strong>Mike Johnson</strong> uploaded new content</p>
                <span className="activity-time">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;