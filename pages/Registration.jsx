import React from "react"
import { addItemToUsers } from "../api";
import { uuidv7 } from 'uuidv7';




export default function Registration() {
    const [formData, setFormData] = React.useState({ name: "", email:"", password: "", hostId: uuidv7() })

    function handleChange(e) {
    
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault()
        addItemToUsers(formData)
    }
    
    return (
        <div>

            <form 
            onSubmit={handleSubmit}
            className="registr-form">
                <input name="name" onChange={handleChange} type="text" id="name" placeholder="name"/>
                <input name="email" onChange={handleChange} type="email" id="email" placeholder="email"/>   
                <input name="password" onChange={handleChange} type="password" id="password" placeholder="password"/>
                <button >registrat</button>
            </form>
        </div>
    )
}