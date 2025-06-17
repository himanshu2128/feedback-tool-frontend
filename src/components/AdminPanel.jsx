import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedbackList(res.data.feedbackList);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {feedbackList.map((f, index) => (
          <li key={index}>
            {f.message} - {new Date(f.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
