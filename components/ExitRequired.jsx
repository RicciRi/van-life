import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function ExitRequired() {
    const isLoggedIn = localStorage.getItem("user")
    const location = useLocation()

    if(isLoggedIn) {
        return(
            <Navigate 
            to="/logout"
            replace
            />)
    }

    return <Outlet />

}