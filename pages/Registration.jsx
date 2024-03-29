import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { checkEmail, createUsers } from '../api';
import { uuidv7 } from 'uuidv7';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Registration() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        hostId: uuidv7(),
        hostVans: [],
        transaction: [],
    });
    const [usedMessage, setUsedMessage] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/login';

    function handleTogglePassword(e) {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const createAcount = await checkEmail(formData.email);

        if (createAcount) {
            createUsers(formData);
            setUsedMessage(false);
            navigate(from, { replace: true });
        } else {
            setUsedMessage(true);
        }
    }

    return (
        <div className="login-container">
            <h1>Create your acount</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    required
                    name="name"
                    onChange={handleChange}
                    type="text"
                    id="name"
                    placeholder="Name"
                />
                <input
                    required
                    name="email"
                    onChange={handleChange}
                    type="email"
                    id="email"
                    placeholder="Email"
                />
                <div className="password-input-container">
                    <input
                        required
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Password"
                        minLength="8"
                    />
                    <button onClick={handleTogglePassword}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

                {usedMessage ? (
                    <p className="login-error">This email is already in use</p>
                ) : null}
                <button>Registration</button>
                <p>
                    Do you have an account?
                    <Link to="/login" className="link-create-acount">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}
