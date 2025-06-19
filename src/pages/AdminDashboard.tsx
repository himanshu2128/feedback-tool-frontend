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
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback`);
      setFeedbackList(response.data.data); // ✅ FIXED
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
      setError("❌ Could not load feedback data.");
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
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">🔐 Admin Login Required</h2>
        <p className="text-gray-500">Please login again from the login page.</p>
      </div>
    );
  }

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

      {error && <p className="text-red-500">{error}</p>}

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
