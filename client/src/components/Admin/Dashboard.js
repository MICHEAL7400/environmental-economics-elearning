import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import './Admin.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [statsRes, usersRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getUsers()
            ]);
            setStats(statsRes.data);
            setRecentUsers(usersRes.data.slice(0, 5));
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-spinner"></div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your learning platform</p>
            </div>

            <div className="admin-stats">
                <div className="admin-stat-card">
                    <h3>{stats?.userStats.total_users}</h3>
                    <p>Total Users</p>
                </div>
                <div className="admin-stat-card">
                    <h3>{stats?.userStats.total_students}</h3>
                    <p>Students</p>
                </div>
                <div className="admin-stat-card">
                    <h3>{stats?.courseStats.total_courses}</h3>
                    <p>Courses</p>
                </div>
                <div className="admin-stat-card">
                    <h3>{stats?.courseStats.total_enrollments}</h3>
                    <p>Enrollments</p>
                </div>
            </div>

            <div className="admin-grid">
                <div className="admin-card">
                    <h3>Recent Users</h3>
                    <div className="user-list">
                        {recentUsers.map(user => (
                            <div key={user.id} className="user-item">
                                <div className="user-avatar-small">{user.avatar}</div>
                                <div className="user-info">
                                    <strong>{user.first_name} {user.last_name}</strong>
                                    <span>{user.email}</span>
                                </div>
                                <span className="user-type">{user.user_type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-card">
                    <h3>Quick Actions</h3>
                    <div className="quick-actions">
                        <button className="action-btn primary">Add New Course</button>
                        <button className="action-btn secondary">Manage Users</button>
                        <button className="action-btn secondary">View Analytics</button>
                        <button className="action-btn secondary">System Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;