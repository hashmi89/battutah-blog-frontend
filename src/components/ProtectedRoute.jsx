import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // User is not logged in, redirect them to the login page
        return <Navigate to="/admin/login" replace />;
    }

    // User is logged in, render the child route component
    return children;
};

export default ProtectedRoute;