import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

// Pages such as Host, Form, Income are only available when the user is logged in
export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem('user');
    const location = useLocation();

    if (!isLoggedIn) {
        return (
            <Navigate
                to="/login"
                state={{
                    message: 'You must log in first',
                    from: location.pathname,
                }}
                replace
            />
        );
    }
    return <Outlet />;
}
