import React, { useState } from 'react';
import axios from 'axios';
import "../styles/login.css";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password })
            setMessage(response.data.msg);
            localStorage.setItem('token', response.data.token);
            if (response.data.role === 'user')
                navigate('/dashboard')
            if (response.data.role === 'organizer')
                navigate('/organizer-dashboard')
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.message)
        }
    }

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/forgetPassword', { email })
            setMessage(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login-container">
            <h2 className="login-title">Login Page</h2>
            <form className="login-form">
                <label>
                    Email:
                    <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>               
                <label>
                    Password:
                    <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <Link to="/forgetPassword" onClick={handleForgetPassword}>Forget Password?</Link>
                <button onClick={handleSubmit}>
                    Login
                </button>
                <br />
                {message && <p className={message.includes('User') ? 'login-error' : 'login-message'}>{message}</p>}
            </form>
        </div>
    );
}

export default Login;