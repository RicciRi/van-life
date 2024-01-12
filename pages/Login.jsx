import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"
import { loginUser, changeUserinfo } from "../api";


export default function Login() {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"))
    if(isLoggedIn){
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
            <div>
                <h1>Account settings</h1>

                <form onSubmit={handleSubmit} className="change-form">
                    <div>
                        <label htmlFor="name">name: </label>
                        <input id="name" name="name" onChange={handleChange} type="text" value={data.name}/>
                    </div>
                    <div>
                       <label htmlFor="email">email:</label>
                        <input id="email" name="email" onChange={handleChange} type="email" value={data.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">password:</label>
                        <input id="password" name="password" onChange={handleChange} type="password" minLength="8"  value={data.password} />
                    </div>
                    <button>Change info</button>
                </form>
            </div>
        )

    }

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const [user, setUser] = React.useState([])

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/host"



    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData) 
            .then(data => {
                setError(null)
                navigate("/", { replace: true })
                
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
                window.location.reload()
            })

    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {
                location.state ?.message &&
                    <h3 className="login-error">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
            {
                error ?.message &&
                    <h3 className="login-error">Can't find your accoun! Wrong email or password!</h3>
            }

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    required
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    required    
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    minLength="8" 
                    value={loginFormData.password}
                />
                <button
                    disabled={status === "submitting"}
                >
                    {status === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </form>

            <p>Don't having an account?
                <Link to="/registration" className="link-create-acount" >Create one now</Link>
            </p>
        </div>
    )

}
