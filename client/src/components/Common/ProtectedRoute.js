import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireInstructor = false }) => {
    const { user, isAdmin, isInstructor, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return (
            <div className="access-denied">
                <div className="access-denied-content">
                    <h1>🔒 Access Denied</h1>
                    <p>You need administrator privileges to access this page.</p>
                    <Navigate to="/dashboard" replace />
                </div>
            </div>
        );
    }

    if (requireInstructor && !isInstructor) {
        return (
            <div className="access-denied">
                <div className="access-denied-content">
                    <h1>👨‍🏫 Instructor Access Required</h1>
                    <p>You need instructor privileges to access this page.</p>
                    <Navigate to="/dashboard" replace />
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;