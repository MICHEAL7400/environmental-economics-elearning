// client/src/components/Admin/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check for user in localStorage first, then sessionStorage
  const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  let user = {};
  try {
    user = userString ? JSON.parse(userString) : {};
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is not admin, redirect to home
  if (user.role !== 'admin' && user.userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // User is admin, allow access
  return children;
};

export default AdminRoute;