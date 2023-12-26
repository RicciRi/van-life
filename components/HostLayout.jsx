import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function HostLayout() {
    return (
        <>
            <nav className="host-nav">
                <Link to="/host">Dashboard</Link>
                <Link to="/host/income">Income</Link>
                <Link to="/host/reviews">Reviews</Link>
                <Link to="/vans">Vans</Link>
            </nav>        
            <Outlet />
        </>
    )
}