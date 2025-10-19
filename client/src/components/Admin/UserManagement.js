import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const { user: currentUser } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchTerm]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getUsers({
                page: currentPage,
                limit: 10,
                search: searchTerm
            });
            setUsers(response.data.users);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleUserTypeChange = async (userId, newUserType) => {
        try {
            await adminAPI.updateUser(userId, { user_type: newUserType });
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleStatusChange = async (userId, isActive) => {
        try {
            await adminAPI.updateUser(userId, { is_active: isActive });
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    const getRoleBadge = (userType) => {
        const roles = {
            admin: { label: 'Admin', class: 'role-admin' },
            instructor: { label: 'Instructor', class: 'role-instructor' },
            student: { label: 'Student', class: 'role-student' }
        };
        const role = roles[userType] || roles.student;
        return <span className={`role-badge ${role.class}`}>{role.label}</span>;
    };

    if (loading && users.length === 0) {
        return (
            <div className="user-management">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="user-management">
            <div className="admin-header">
                <h1>User Management 👥</h1>
                <p>Manage all users on the platform</p>
            </div>

            <div className="management-actions">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="user-stats">
                    <span>Total Users: {pagination.total || 0}</span>
                </div>
            </div>

            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Courses</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className={!user.is_active ? 'inactive' : ''}>
                                <td className="user-info">
                                    <div className="user-avatar">{user.avatar}</div>
                                    <div className="user-details">
                                        <div className="user-name">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="user-email">{user.email}</div>
                                        <div className="user-country">{user.country}</div>
                                    </div>
                                </td>
                                <td>
                                    {getRoleBadge(user.user_type)}
                                </td>
                                <td>
                                    <div className="course-stats">
                                        <span className="stat">
                                            {user.courses_enrolled || 0} enrolled
                                        </span>
                                        <span className="stat">
                                            {user.courses_completed || 0} completed
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="join-date">
                                        {new Date(user.join_date).toLocaleDateString()}
                                    </div>
                                    {user.last_login && (
                                        <div className="last-login">
                                            Last: {new Date(user.last_login).toLocaleDateString()}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <div className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </div>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <select
                                            value={user.user_type}
                                            onChange={(e) => handleUserTypeChange(user.id, e.target.value)}
                                            disabled={user.id === currentUser?.id}
                                            className="role-select"
                                        >
                                            <option value="student">Student</option>
                                            <option value="instructor">Instructor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button
                                            onClick={() => handleStatusChange(user.id, !user.is_active)}
                                            disabled={user.id === currentUser?.id}
                                            className={`status-btn ${user.is_active ? 'deactivate' : 'activate'}`}
                                        >
                                            {user.is_active ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">👥</div>
                        <h3>No users found</h3>
                        <p>Try adjusting your search criteria</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    
                    <div className="page-numbers">
                        {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                        disabled={currentPage === pagination.pages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;