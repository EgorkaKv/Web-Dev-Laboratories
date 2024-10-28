import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/login'); // Перенаправление на страницу login после успешной регистрации
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
    };

    return (
        <div className="auth-container">
            <h2>Register the new account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Retype password"
                    required
                />
                <button type="submit">SIGN ME UP</button>
            </form>
            {error && <div className="error-message">{error}</div>} {/* Отображение сообщения об ошибке */}
            <p>
                Already a member? <Link to="/login">Sign in</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
