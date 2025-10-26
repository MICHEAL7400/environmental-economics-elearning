// client/src/components/Admin/AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

// Import Lucide Icons
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  Globe,
  UserCircle
} from 'lucide-react';

// Import Admin Sub-components
import DashboardHome from './DashboardHome';
import CourseManagement from './CourseManagement';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';
import Analytics from './Analytics';
import SettingsPage from './Settings';
import CourseModules from './CourseModules';
import CourseEdit from './CourseEdit';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get admin user from sessionStorage
  const adminUser = (() => {
    try {
      const adminUserData = sessionStorage.getItem('adminUser');
      if (!adminUserData) return null;

      const user = JSON.parse(adminUserData);
      return {
        firstName: user.firstName || user.first_name || 'Admin',
        lastName: user.lastName || user.last_name || 'User',
        email: user.email || 'admin@ecolearn.org',
        avatar: user.avatar || <UserCircle size={40} />,
        ...user
      };
    } catch (error) {
      console.error('Error parsing admin user:', error);
      return null;
    }
  })();

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="admin-title">
            <Globe size={22} style={{ marginRight: '8px' }} /> EcoLearn Admin
          </h2>
          {adminUser && (
            <div className="admin-user-info">
              <div className="admin-avatar">
                <UserCircle size={40} color="#4caf50" />
              </div>
              <div className="admin-details">
                <div className="admin-name">
                  {adminUser.firstName} {adminUser.lastName}
                </div>
                <div className="admin-email">{adminUser.email}</div>
                <div className="admin-role">Administrator</div>
              </div>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/courses" className={`nav-item ${location.pathname.startsWith('/admin/courses') ? 'active' : ''}`}>
            <BookOpen size={18} /> Courses
          </Link>
          <Link to="/admin/users" className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}>
            <Users size={18} /> Users
          </Link>
          <Link to="/admin/content" className={`nav-item ${location.pathname === '/admin/content' ? 'active' : ''}`}>
            <FileText size={18} /> Content
          </Link>
          <Link to="/admin/analytics" className={`nav-item ${location.pathname === '/admin/analytics' ? 'active' : ''}`}>
            <BarChart2 size={18} /> Analytics
          </Link>
          <Link to="/admin/settings" className={`nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
            <Settings size={18} /> Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <div className="header-actions">
              <span className="welcome-text">
                Welcome back, {adminUser?.firstName || 'Admin'}!
              </span>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/courses/:courseId/edit" element={<CourseEdit />} />
            <Route path="/courses/:courseId/modules" element={<CourseModules />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
