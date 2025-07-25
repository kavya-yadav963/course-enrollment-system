import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If there is no user, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the child components (the Dashboard)
  return children;
};

export default ProtectedRoute;