// client/src/components/Admin/AdminRoute.jsx - FIXED
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminAuth = () => {
      console.log('🛡️ AdminRoute checking authentication...');
      console.log('📍 Current path:', location.pathname);
      
      const adminToken = sessionStorage.getItem('adminToken');
      const adminUser = sessionStorage.getItem('adminUser');
      
      console.log('📋 AdminRoute auth check:', {
        hasToken: !!adminToken,
        hasUser: !!adminUser,
        tokenLength: adminToken ? adminToken.length : 0,
        userData: adminUser ? 'Present' : 'Missing'
      });

      if (!adminToken || !adminUser) {
        console.log('❌ AdminRoute: No authentication found');
        console.log('🔍 Available sessionStorage keys:', Object.keys(sessionStorage));
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate('/admin/login', { replace: true });
        return;
      }

      try {
        const user = JSON.parse(adminUser);
        console.log('✅ AdminRoute: User authenticated:', user.email);
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (error) {
        console.error('❌ AdminRoute: Error parsing user data:', error);
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate('/admin/login', { replace: true });
      }
    };

    checkAdminAuth();
  }, [navigate, location]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="admin-route-loading">
        <div className="loading-spinner"></div>
        <p>Verifying admin access...</p>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
};

export default AdminRoute;