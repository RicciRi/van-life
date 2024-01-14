import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
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
                <input required name="name" onChange={handleChange} type="text" id="name" placeholder="name" />
                <input required name="email" onChange={handleChange} type="email" id="email" placeholder="email" />
                <input required name="password" onChange={handleChange} type="password" id="password" placeholder="password" minLength="8"  />
                {usedMessage ? <p className="login-error">This email is already in use</p> : null}
                <button >registration</button>
                <p>
                    Do you have an account?
                    <Link className="link-create-acount">Log in</Link>
                </p>

            </form>
        </div>
    )
}

