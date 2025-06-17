import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch feedback from backend
    axios
      .get("http://localhost:5000/api/feedback")
      .then((res) => {
        setFeedbackList(res.data.feedbackList);
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
              <strong>{new Date(item.timestamp).toLocaleString()}</strong>: {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
