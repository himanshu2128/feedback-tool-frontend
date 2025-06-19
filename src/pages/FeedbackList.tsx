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

const FeedbackList: React.FC<FeedbackListProps> = ({ refreshTrigger }) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFeedback = async () => {
    if (!API_BASE_URL) {
      setError("⚠️ VITE_API_URL not defined.");
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
    <div style={{ padding: "1rem", background: "#f9f9f9", borderRadius: "10px", marginTop: "20px" }}>
      <h2>📝 Feedback List</h2>

      {loading && <p>⏳ Loading feedback...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && feedbackList.length === 0 && !error && <p>No feedback available.</p>}

      <ul style={{ paddingLeft: "1rem" }}>
        {feedbackList?.map((item) => (
          <li key={item._id} style={{ marginBottom: "10px" }}>
            <strong>{new Date(item.timestamp).toLocaleString()}:</strong> {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
