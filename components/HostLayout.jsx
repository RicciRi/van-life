import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function HostLayout() {
    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616',
    };

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to=""
                    end
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Income
                </NavLink>

                <NavLink
                    to="vans"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Vans
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
}
