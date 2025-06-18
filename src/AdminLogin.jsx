import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Protect the route
    const isAdmin = localStorage.getItem("admin") === "true";
    if (!isAdmin) {
      navigate("/admin-login"); // Redirect to login if not admin
    }

    // Fetch feedback
    axios
      .get(`${API_BASE_URL}/api/feedback`)
      .then((res) => {
        setFeedbackList(res.data.data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch feedback:", err);
      });
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛠 Admin Feedback Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: "15px" }}>
        🚪 Logout
      </button>

      {feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul>
          {feedbackList.map((item, index) => (
            <li key={index}>
              <strong>{new Date(item.createdAt).toLocaleString()}</strong>: {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
