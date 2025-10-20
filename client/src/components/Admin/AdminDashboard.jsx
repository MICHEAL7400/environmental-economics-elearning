// // client/src/components/Admin/AdminDashboard.jsx - UPDATED
// import React from 'react';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';

// // Import Admin Sub-components
// import DashboardHome from './DashboardHome';
// import CourseManagement from './CourseManagement';
// import UserManagement from './UserManagement';
// import ContentManagement from './ContentManagement';
// import Analytics from './Analytics';
// import Settings from './Settings';

// const AdminDashboard = () => {
//   const location = useLocation();

//   return (
//     <div className="admin-dashboard">
//       <div className="admin-sidebar">
//         <div className="sidebar-header">
//           <h2>🌍 EcoLearn Admin</h2>
//         </div>
        
//         <nav className="sidebar-nav">
//           <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
//             📊 Dashboard
//           </Link>
//           <Link to="/admin/courses" className={`nav-item ${location.pathname === '/admin/courses' ? 'active' : ''}`}>
//             📚 Courses
//           </Link>
//           <Link to="/admin/users" className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}>
//             👥 Users
//           </Link>
//           <Link to="/admin/content" className={`nav-item ${location.pathname === '/admin/content' ? 'active' : ''}`}>
//             📝 Content
//           </Link>
//           <Link to="/admin/analytics" className={`nav-item ${location.pathname === '/admin/analytics' ? 'active' : ''}`}>
//             📈 Analytics
//           </Link>
//           <Link to="/admin/settings" className={`nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
//             ⚙️ Settings
//           </Link>
//         </nav>
//       </div>

//       <div className="admin-main">
//         <header className="admin-header">
//           <h1>Admin Dashboard</h1>
//         </header>
        
//         <main className="admin-content">
//           <Routes>
//             <Route path="/" element={<DashboardHome />} />
//             <Route path="/courses" element={<CourseManagement />} />
//             <Route path="/users" element={<UserManagement />} />
//             <Route path="/content" element={<ContentManagement />} />
//             <Route path="/analytics" element={<Analytics />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




// client/src/components/Admin/AdminDashboard.jsx - UPDATED
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Import Admin Sub-components
import DashboardHome from './DashboardHome';
import CourseManagement from './CourseManagement';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';
import Analytics from './Analytics';
import Settings from './Settings';
import CourseModules from './CourseModules'; // Add this import
import CourseEdit from './CourseEdit'; // Add this import

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🌍 EcoLearn Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            📊 Dashboard
          </Link>
          <Link to="/admin/courses" className={`nav-item ${location.pathname.startsWith('/admin/courses') ? 'active' : ''}`}>
            📚 Courses
          </Link>
          <Link to="/admin/users" className={`nav-item ${location.pathname === '/admin/users' ? 'active' : ''}`}>
            👥 Users
          </Link>
          <Link to="/admin/content" className={`nav-item ${location.pathname === '/admin/content' ? 'active' : ''}`}>
            📝 Content
          </Link>
          <Link to="/admin/analytics" className={`nav-item ${location.pathname === '/admin/analytics' ? 'active' : ''}`}>
            📈 Analytics
          </Link>
          <Link to="/admin/settings" className={`nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
            ⚙️ Settings
          </Link>
        </nav>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-breadcrumb">
            {/* Add breadcrumb navigation here */}
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
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;