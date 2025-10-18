import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const { user } = useAuth();

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [statsRes, usersRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getUsers({ page: 1, limit: 5 })
            ]);
            setStats(statsRes.data);
            setRecentActivity(usersRes.data.users.slice(0, 5));
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <p>Loading Admin Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="admin-welcome">
                    <h1>Admin Dashboard 👨‍💼</h1>
                    <p>Welcome back, {user?.firstName}! Here's what's happening with your platform.</p>
                </div>
                <div className="admin-actions">
                    <Link to="/admin/users" className="cta-button primary">
                        Manage Users
                    </Link>
                    <Link to="/admin/courses" className="cta-button secondary">
                        Manage Courses
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="admin-stats-grid">
                <div className="stat-card admin-stat">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <h3>{stats?.userStats?.total_users || 0}</h3>
                        <p>Total Users</p>
                        <div className="stat-breakdown">
                            <span>Students: {stats?.userStats?.total_students || 0}</span>
                            <span>Instructors: {stats?.userStats?.total_instructors || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card admin-stat">
                    <div className="stat-icon">📚</div>
                    <div className="stat-info">
                        <h3>{stats?.courseStats?.total_courses || 0}</h3>
                        <p>Total Courses</p>
                        <div className="stat-breakdown">
                            <span>Published: {stats?.courseStats?.published_courses || 0}</span>
                            <span>Drafts: {stats?.courseStats?.draft_courses || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card admin-stat">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                        <h3>{stats?.courseStats?.total_enrollments || 0}</h3>
                        <p>Total Enrollments</p>
                        <div className="stat-breakdown">
                            <span>Avg Rating: {stats?.courseStats?.average_rating || 0}/5</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card admin-stat">
                    <div className="stat-icon">🌍</div>
                    <div className="stat-info">
                        <h3>{stats?.userStats?.countries_represented || 0}</h3>
                        <p>Countries</p>
                        <div className="stat-breakdown">
                            <span>Global Reach</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="admin-content-grid">
                {/* Recent Users */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3>Recent Users 👥</h3>
                        <Link to="/admin/users" className="view-all">View All</Link>
                    </div>
                    <div className="user-list">
                        {recentActivity.length === 0 ? (
                            <div className="empty-state">
                                <p>No users found</p>
                            </div>
                        ) : (
                            recentActivity.map(user => (
                                <div key={user.id} className="user-item">
                                    <div className="user-avatar">{user.avatar}</div>
                                    <div className="user-details">
                                        <div className="user-name">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="user-email">{user.email}</div>
                                        <div className="user-meta">
                                            <span className={`user-type ${user.user_type}`}>
                                                {user.user_type}
                                            </span>
                                            <span className="user-country">{user.country}</span>
                                        </div>
                                    </div>
                                    <div className="user-stats">
                                        <div className="stat">
                                            <span className="number">{user.courses_enrolled}</span>
                                            <span className="label">Courses</span>
                                        </div>
                                        <div className="stat">
                                            <span className="number">{user.quizzes_taken}</span>
                                            <span className="label">Quizzes</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3>Quick Actions ⚡</h3>
                    </div>
                    <div className="quick-actions-grid">
                        <Link to="/admin/courses/new" className="action-card">
                            <div className="action-icon">➕</div>
                            <h4>Create Course</h4>
                            <p>Add a new course to the platform</p>
                        </Link>

                        <Link to="/admin/users/invite" className="action-card">
                            <div className="action-icon">📧</div>
                            <h4>Invite Users</h4>
                            <p>Send invitations to new users</p>
                        </Link>

                        <Link to="/admin/analytics" className="action-card">
                            <div className="action-icon">📊</div>
                            <h4>View Analytics</h4>
                            <p>Platform performance metrics</p>
                        </Link>

                        <Link to="/admin/settings" className="action-card">
                            <div className="action-icon">⚙️</div>
                            <h4>System Settings</h4>
                            <p>Configure platform settings</p>
                        </Link>
                    </div>
                </div>

                {/* Platform Health */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3>Platform Health 🏥</h3>
                    </div>
                    <div className="health-metrics">
                        <div className="metric">
                            <div className="metric-info">
                                <span className="metric-label">Server Status</span>
                                <span className="metric-value online">Online</span>
                            </div>
                            <div className="metric-bar">
                                <div className="metric-fill" style={{width: '100%'}}></div>
                            </div>
                        </div>

                        <div className="metric">
                            <div className="metric-info">
                                <span className="metric-label">Database</span>
                                <span className="metric-value online">Healthy</span>
                            </div>
                            <div className="metric-bar">
                                <div className="metric-fill" style={{width: '100%'}}></div>
                            </div>
                        </div>

                        <div className="metric">
                            <div className="metric-info">
                                <span className="metric-label">Storage</span>
                                <span className="metric-value warning">75% Used</span>
                            </div>
                            <div className="metric-bar">
                                <div className="metric-fill warning" style={{width: '75%'}}></div>
                            </div>
                        </div>

                        <div className="metric">
                            <div className="metric-info">
                                <span className="metric-label">Active Users</span>
                                <span className="metric-value online">1,234</span>
                            </div>
                            <div className="metric-bar">
                                <div className="metric-fill" style={{width: '82%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3>Recent Activity 📈</h3>
                    </div>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">🎓</div>
                            <div className="activity-content">
                                <p><strong>John Doe</strong> completed "Environmental Economics" course</p>
                                <span className="activity-time">2 hours ago</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-icon">📚</div>
                            <div className="activity-content">
                                <p><strong>Sarah Smith</strong> enrolled in "Carbon Pricing" course</p>
                                <span className="activity-time">5 hours ago</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-icon">🏆</div>
                            <div className="activity-content">
                                <p><strong>Mike Johnson</strong> earned a certificate</p>
                                <span className="activity-time">1 day ago</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-icon">👨‍🏫</div>
                            <div className="activity-content">
                                <p>New instructor <strong>Dr. Jane Wilson</strong> joined</p>
                                <span className="activity-time">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;