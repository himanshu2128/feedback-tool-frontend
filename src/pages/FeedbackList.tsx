import React, { useEffect, useState } from "react";
import axios from "axios";

interface FeedbackItem {
  _id: string;
  message: string;
  timestamp: string;
}

interface FeedbackListProps {
  refreshTrigger: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const FeedbackList: React.FC<FeedbackListProps> = ({ refreshTrigger = false }) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFeedback = async () => {
    if (!API_BASE_URL) {
      setError("⚠️ VITE_API_URL not defined in .env file.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/feedback`);
      const data = res.data;

      if (Array.isArray(data?.data)) {
        const normalized = data.data.map((item: any) => ({
          _id: item._id,
          message: item.message,
          timestamp: item.createdAt,
        }));
        setFeedbackList(normalized);
        setError("");
      } else {
        setError("⚠️ Unexpected data format from server.");
        setFeedbackList([]);
      }
    } catch (error) {
      console.error("❌ Error fetching feedback:", error);
      setError("❌ Failed to fetch feedback from server.");
      setFeedbackList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]);

  return (
    <div
      style={{
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        marginTop: "20px",
        maxWidth: "600px",
        marginInline: "auto",
      }}
    >
      <h2 style={{ marginBottom: "16px", color: "#333" }}>📝 Feedback List</h2>

      {loading && <p>⏳ Loading feedback...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && feedbackList.length === 0 && !error && (
        <p>No feedback available.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {feedbackList.map((item) => (
          <li
            key={item._id}
            style={{
              marginBottom: "14px",
              padding: "10px",
              border: "1px solid #eee",
              borderRadius: "8px",
              backgroundColor: "#f6f8fa",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>
              {new Date(item.timestamp).toLocaleString()}
            </div>
            <div style={{ fontSize: "16px", color: "#000" }}>{item.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
