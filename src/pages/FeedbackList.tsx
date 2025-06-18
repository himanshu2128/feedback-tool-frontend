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

// ✅ No more fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL;

const FeedbackList: React.FC<FeedbackListProps> = ({ refreshTrigger }) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const fetchFeedback = async () => {
    if (!API_BASE_URL) {
      console.error("VITE_API_URL is not defined in environment variables.");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/feedback`);
      const data = res.data;

      if (Array.isArray(data.data)) {
        const normalized = data.data.map((item: any) => ({
          _id: item._id,
          message: item.message,
          timestamp: item.createdAt,
        }));
        setFeedbackList(normalized);
      } else {
        console.error("Unexpected feedback response structure:", data);
        setFeedbackList([]);
      }
    } catch (error) {
      console.error("❌ Error fetching feedback:", error);
      setFeedbackList([]);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>📝 Feedback List</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul>
          {feedbackList.map((item) => (
            <li key={item._id}>
              <strong>{new Date(item.timestamp).toLocaleString()}:</strong> {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;
