// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        password,
      });
      const token = res.data.token;
      localStorage.setItem("adminToken", token);
      if (onLogin) onLogin();
      navigate("/admin");
    } catch (err) {
      alert("❌ Invalid password");
    }
  };

  return (
    <div>
      <h2>🔐 Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
