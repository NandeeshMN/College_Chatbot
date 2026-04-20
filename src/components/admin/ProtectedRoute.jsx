import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = sessionStorage.getItem('adminToken');
    const adminUser = sessionStorage.getItem('adminUser');

    if (!token || !adminUser) {
        // If not authenticated, redirect to login page and replace the history stack
        return <Navigate to="/admin-login" replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
