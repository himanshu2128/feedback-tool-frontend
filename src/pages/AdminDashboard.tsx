import React, { useEffect, useState } from "react";
import axios from "axios";

interface FeedbackItem {
  id: number;
  message: string;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback");
      setFeedbackList(response.data.feedbackList);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      fetchFeedback(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div>
      <h2>🛠️ Admin Dashboard</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul>
          {feedbackList.map((item) => (
            <li key={item.id}>
              <strong>{item.message}</strong>
              <br />
              <small>{new Date(item.timestamp).toLocaleString()}</small>
              <br />
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
