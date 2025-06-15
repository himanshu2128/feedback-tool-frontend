// src/pages/AdminDashboard.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";

interface FeedbackItem {
  _id: string;
  message: string;
  timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminDashboard: React.FC = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        password,
      });
      const { token } = response.data;
      localStorage.setItem("adminToken", token);
      setToken(token);
      setPassword("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Invalid password");
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback`);
      setFeedbackList(response.data.feedbackList);
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFeedbacks();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setFeedbackList([]);
  };

  if (!token) {
    // 👇 Show password input if not logged in
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">🔐 Admin Login</h2>
        <input
          type="password"
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  // 👇 Show feedback list after login
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📋 Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {feedbackList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="space-y-2">
          {feedbackList.map((item) => (
            <li
              key={item._id}
              className="border p-2 rounded shadow-sm bg-gray-50"
            >
              <p>{item.message}</p>
              <small className="text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
