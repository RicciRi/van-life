import React from "react"
import { Link, NavLink } from "react-router-dom"
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <NavLink 
                    to="/login"
                    className={({isActive}) => isActive ? "active-link" : null}
                >
                    <MdOutlineAccountCircle className="login-icon" />

                </NavLink>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}