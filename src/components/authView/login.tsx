"use client"

import React, { useState } from 'react';


export interface LoginInterface {
    onSetToken: (token: string) => void,
    onSetUsername: (username: string) => void,
    onSetPassword: (password: string) => void,
  }

const Login: React.FC<LoginInterface> = ({onSetToken, onSetUsername, onSetPassword}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const authRequest = async() => {

        return 'ok';
    };

    const handleLogIn = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await authRequest();
        onSetToken(response);
        onSetUsername(username);
        onSetPassword(password);
    };

    return (
        <div className='flex flex-col items-center'>
            <h2 className=''>Login</h2>
            <form className='flex flex-col items-center' onSubmit={handleLogIn}>
                <div className="m-2">
                    <label htmlFor="username">Username:</label>
                    <input className='ml-2'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="m-2">
                    <label htmlFor="password">Password:</label>
                    <input className='ml-2'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='h-12 w-25' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;