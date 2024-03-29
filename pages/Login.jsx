import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { uuidv7 } from 'uuidv7';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({
        email: '',
        password: '',
    });
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    function handleTogglePassword(e) {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        loginUser(loginFormData)
            .then((data) => {
                setError(null);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setStatus('idle');
            });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="login-container">
            {location.state?.message && (
                <h3 className="login-error">{location.state.message}</h3>
            )}
            <h1>Sign in to your account</h1>
            {error?.message && (
                <h3 className="login-error">
                    Can't find your accoun! Wrong email or password!
                </h3>
            )}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    required
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <div className="password-input-container">
                    <input
                        required
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        minLength="8"
                        value={loginFormData.password}
                    />
                    <button onClick={handleTogglePassword}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <button disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </form>

            <p>
                Don't having an account?
                <Link to="/registration" className="link-create-acount">
                    Create one now
                </Link>
            </p>
        </div>
    );
}
