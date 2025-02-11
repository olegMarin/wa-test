"use client"

import React, { useState } from 'react';


export interface LoginInterface {
    
    onSetToken: (token: string) => void,
    
  }

const Login: React.FC<LoginInterface> = ({onSetToken}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const authRequest = async() => {

        return 'ok';
    };

    const handleLogIn = async (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        const response = await authRequest();
        onSetToken(response);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogIn}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;