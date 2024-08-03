import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPage = () => {
    const[username, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://world-app-ztrd.onrender.com/api/auth/login', { username, password });
          setAuth(response.data);
          navigate('/');
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div>
             <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
             </form>
    </div>
  )
}
