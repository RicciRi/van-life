import React from "react"

export default function AccountSettings() {
    const userData = JSON.parse(localStorage.getItem("user"))
    const [data, setData] = React.useState({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    function handleChange(e) {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    function handleSubmit(e) {
        e.preventDefault()
        userData.name = data.name
        userData.email = data.email
        userData.password = data.password


        localStorage.setItem("user", JSON.stringify(userData))
        changeUserinfo(userData)
    }



    return (
        <div className="login-container">
            <h1>Account settings</h1>

            <form onSubmit={handleSubmit} className="change-form">
                <div>
                    <label htmlFor="name">name: </label>
                    <input id="name" name="name" onChange={handleChange} type="text" value={data.name} />
                </div>
                <div>
                    <label htmlFor="email">email:</label>
                    <input id="email" name="email" onChange={handleChange} type="email" value={data.email} />
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input id="password" name="password" onChange={handleChange} type="password" minLength="8" value={data.password} />
                </div>
                <button>Change info</button>
            </form>
        </div>
    )
}
