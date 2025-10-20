// client/src/components/Admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      // Mock data
      setUsers([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          userType: 'student',
          joinDate: '2024-01-15',
          status: 'active',
          coursesCompleted: 5
        },
        {
          id: 2,
          firstName: 'Sarah',
          lastName: 'Smith',
          email: 'sarah@example.com',
          userType: 'instructor',
          joinDate: '2024-02-10',
          status: 'active',
          coursesCompleted: 12
        },
        {
          id: 3,
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike@example.com',
          userType: 'student',
          joinDate: '2024-03-05',
          status: 'inactive',
          coursesCompleted: 2
        },
        {
          id: 4,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@ecolearn.org',
          userType: 'admin',
          joinDate: '2024-01-01',
          status: 'active',
          coursesCompleted: 0
        }
      ]);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.userType === filter;
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleUserTypeChange = (userId, newType) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, userType: newType } : user
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'success', label: 'Active' },
      inactive: { class: 'warning', label: 'Inactive' },
      suspended: { class: 'error', label: 'Suspended' }
    };
    const config = statusConfig[status] || statusConfig.active;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getUserTypeBadge = (userType) => {
    const typeConfig = {
      student: { class: 'info', label: 'Student' },
      instructor: { class: 'primary', label: 'Instructor' },
      admin: { class: 'secondary', label: 'Admin' }
    };
    const config = typeConfig[userType] || typeConfig.student;
    return <span className={`type-badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="header-actions">
          <button className="btn-primary">+ Invite User</button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Users
          </button>
          <button 
            className={`filter-btn ${filter === 'student' ? 'active' : ''}`}
            onClick={() => setFilter('student')}
          >
            Students
          </button>
          <button 
            className={`filter-btn ${filter === 'instructor' ? 'active' : ''}`}
            onClick={() => setFilter('instructor')}
          >
            Instructors
          </button>
          <button 
            className={`filter-btn ${filter === 'admin' ? 'active' : ''}`}
            onClick={() => setFilter('admin')}
          >
            Admins
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="content-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <strong>{user.firstName} {user.lastName}</strong>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.userType}
                      onChange={(e) => handleUserTypeChange(user.id, e.target.value)}
                      className="user-type-select"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) => handleUserStatusChange(user.id, e.target.value)}
                      className={`status-select ${user.status}`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>
                  <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td>{user.coursesCompleted}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit">Edit</button>
                      <button className="btn-view">View</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn">Previous</button>
          <span className="page-info">Page 1 of 1</span>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;