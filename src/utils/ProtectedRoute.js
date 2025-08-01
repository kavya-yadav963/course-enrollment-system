import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.token) {
    // Not logged in, redirect to landing page
    return <Navigate to="/" />;
  }

  const userRole = user.role.replace('ROLE_', ''); // "ROLE_ADMIN" -> "ADMIN"

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Logged in, but does not have the required role, redirect to landing
    return <Navigate to="/" />;
  }
  
  // User is authenticated and has the required role, render the child component
  return <Outlet />;
};

export default ProtectedRoute;