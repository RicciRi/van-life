import React from "react"
import { Navigate } from "react-router-dom"


export default function Logout(){
    const [logOut, setLogOut] = React.useState(false)

    function logout() {
        localStorage.removeItem("user")
        setLogOut(true)
        
    }

    if(logOut) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <>
            <h1>You must logout first</h1>
            <button onClick={logout} className="logOut-button">Logout</button>
        </>
    )
}