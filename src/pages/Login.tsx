import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        password,
      });

      const token = res.data.token;
      localStorage.setItem("adminToken", token);
      onLogin(); // ✅ This line is crucial
      navigate("/admin"); // Redirect on successful login
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("❌ Invalid password or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "sans-serif"
    }}>
      <h2 style={{ textAlign: "center" }}>🔐 Admin Login</h2>

      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          fontSize: "16px"
        }}
      />

      {errorMsg && (
        <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
          {errorMsg}
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={loading || !password.trim()}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
