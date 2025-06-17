import React, { useState } from "react";
import axios from "axios";

interface Props {
  onLogin?: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        password,
      });
      const token = res.data.token;
      localStorage.setItem("adminToken", token);
      if (onLogin) onLogin();
    } catch (err) {
      alert("Invalid password");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
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

export default Login;
