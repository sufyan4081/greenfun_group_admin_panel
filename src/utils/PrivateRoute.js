import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  // Check if the user is authenticated (e.g., token exists in localStorage)
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
