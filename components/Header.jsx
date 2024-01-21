import React from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";


export default function Header() {
    const navigate = useNavigate()
    const userAccount = localStorage.getItem("user")
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    
    function LogOut() {
        localStorage.removeItem("user")
        navigate("/")
        location.reload();
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
                    to={userAccount ? "/settings" : "/login"}
                    className={({isActive}) => isActive ? "active-link" : null}
                >
                    <MdOutlineAccountCircle className="login-icon" />
                </NavLink> 
                {userAccount && <button className="logOut-link"  onClick={LogOut}><IoIosLogOut className="login-icon" /></button> 
}
            </nav>
        </header>
    )
}