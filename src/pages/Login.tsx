import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('adminToken', token);
      navigate('/admin');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:<br />
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br /><br />
        <label>
          Password:<br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
