import React, { useState } from 'react';
import usersData from './users.json'; // Import the user data from the JSON file

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const user = usersData.users.find((user) => user.username === username);

        if (user && user.password === password) {
            onLogin(user);
        } else {
            // Handle login failure
            alert('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
            <form className='border px-3 shadow-lg rounded py-4' onSubmit={e => handleLogin} style={{ minWidth: "300px", minHeight: "300px" }}>
                <center className='fs-1 fw-bold border-bottom bg-light pb-2'>Login</center>
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
                <button  className="btn btn-primary w-100 rounded-0" type='submit' onClick={handleLogin}>Log In</button>
            </form>
        </div>
    );
}

export default Login;
