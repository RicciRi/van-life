import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"
import { loginUser } from "../api";


export default function Login() {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"))
    if(isLoggedIn){
        return <h1>{isLoggedIn.name}, You alredy login!</h1>
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
                navigate(from, { replace: true })
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
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

            <p>Don't having an account?</p>
            <Link to="/registration" className="link-create-acount" >Create acount</Link>
        </div>
    )

}











// import React from "react";
// import { MdBorderBottom } from "react-icons/md";
// import { useNavigate, useLocation, Link } from "react-router-dom"
// import { loginUser } from "../api";


// export default function Login() {
//     const isLoggedIn = localStorage.getItem("loggedin")
//     if(isLoggedIn){
//         return <h1>You alredy login!</h1>
//     }

    
//     const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
//     const [status, setStatus] = React.useState("idle")
//     const [error, setError] = React.useState(null)

//     const location = useLocation()
//     const navigate = useNavigate()
//     const from = location.state?.from || "/host"

//     function pushUserToLocalStorage( name, hostId, hostVans ) {
//         var user = {
//             name: name,
//             hostId: hostId,
//             hostVans: hostVans
//         };
    
//         localStorage.setItem("user", JSON.stringify(user));
//     }

//     function handleSubmit(e) {
//         e.preventDefault()
//         setStatus("submitting")
//         loginUser(loginFormData)
//             .then(data => {
//                 console.log(data)
//                 setError(null)
//                 localStorage.setItem("loggedin", true)
//                 navigate(from, { replace: true })

                





//             })
//             .catch(err => {
//                 setError(err)
//             })
//             .finally(() => {
//                 setStatus("idle")
//             })
//     }

//     function handleChange(e) {
//         const { name, value } = e.target
//         setLoginFormData(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     return (
//         <div className="login-container">
//             {
//                 location.state ?.message &&
//                     <h3 className="login-error">{location.state.message}</h3>
//             }
//             <h1>Sign in to your account</h1>
//             {
//                 error ?.message &&
//                     <h3 className="login-error">{error.message}</h3>
//             }

//             <form onSubmit={handleSubmit} className="login-form">
//                 <input
//                     name="email"
//                     onChange={handleChange}
//                     type="email"
//                     placeholder="Email address"
//                     value={loginFormData.email}
//                 />
//                 <input
//                     name="password"
//                     onChange={handleChange}
//                     type="password"
//                     placeholder="Password"
//                     value={loginFormData.password}
//                 />
//                 <button
//                     disabled={status === "submitting"}
//                 >
//                     {status === "submitting"
//                         ? "Logging in..."
//                         : "Log in"
//                     }
//                 </button>
//             </form>

//             <p>Don't having an account?</p>
//             <Link to="/registration" className="link-create-acount" >Create acount</Link>
//         </div>
//     )

// }