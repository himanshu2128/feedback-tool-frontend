import React, { useEffect, useState } from "react";
import axios from "axios";

interface FeedbackItem {
  _id: string;
  message: string;
  timestamp: string; // We'll map createdAt to this
}

interface FeedbackListProps {
  refreshTrigger: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FeedbackList: React.FC<FeedbackListProps> = ({ refreshTrigger }) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/feedback`);
      const data = res.data;

      // ✅ Check for correct array in `data.data`
      if (Array.isArray(data.data)) {
       const normalized = data.data.map((item: any) => ({

          _id: item._id,
          message: item.message,
          timestamp: item.createdAt, // backend sends createdAt
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

  // Run on mount + on refresh trigger change
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
