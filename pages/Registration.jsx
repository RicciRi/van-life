import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { checkEmail, addItemToUsers } from "../api";
import { uuidv7 } from 'uuidv7';




export default function Registration() {
    const [formData, setFormData] = React.useState({ name: "", email: "", password: "", hostId: uuidv7(), hostVans: [] })
    const [usedMessage, setUsedMessage] = React.useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/login"

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    

    async function handleSubmit(e) {
        e.preventDefault()
        const createAcount = await checkEmail(formData.email)

        if (createAcount) {
            addItemToUsers(formData)
            setUsedMessage(false)
            navigate(from, { replace: true })
        } else {
            setUsedMessage(true)
        }


    }

    return (
        <div className="login-container">
            <h1>Create your acount</h1>
            <form 
                className="login-form"
                onSubmit={handleSubmit}
                >
                <input name="name" onChange={handleChange} type="text" id="name" placeholder="name" />
                <input name="email" onChange={handleChange} type="email" id="email" placeholder="email" />
                <input name="password" onChange={handleChange} type="password" id="password" placeholder="password" />
                <button >registrat</button>
                {usedMessage ? <p className="login-error">This email is already in use</p> : null}
            </form>
        </div>
    )
}








function getUserFormLocalStorage() {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
}

function deleteUserFormLocalStorage() {
    localStorage.removeItem("user")
}

