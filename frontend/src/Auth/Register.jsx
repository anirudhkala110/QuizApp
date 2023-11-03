import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const handleRegister = () => {
        // Perform validation and check if the username is unique (not already registered)
        // You can add more validation logic here as needed

        if (username && password) {
            if (cpassword === password)
                onRegister(username, password);
            else alert("Password didn't match")
        } else {
            alert('Please fill in all the fields.');
        }
    };

    const navigate = useNavigate()
    const handleRoute = (route) => {
        navigate(`/${route}`)
    }
    return (
        <div className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
            <form className='border px-3 shadow-lg rounded py-4' onSubmit={e => handleRegister} style={{ minWidth: "300px", minHeight: "300px" }}>
                <h1>Register</h1>
                <div className='my-4'>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='my-4'>
                    <label>Password</label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='my-4'>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-50 rounded-0" type='submit' onClick={handleRegister}>Register</button>
                <Link to='/register' className="btn btn-success w-50 rounded-0" onClick={e => handleRoute('register')}>Login</Link>
            </form>
        </div>
    );
}

export default Register;
