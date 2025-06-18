import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/feedback`)
      .then((res) => {
        setFeedbackList(res.data.data); // ✅ Adjusted to match your backend response structure
      })
      .catch((err) => {
        console.error("❌ Failed to fetch feedback:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛠 Admin Feedback Dashboard</h2>
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
