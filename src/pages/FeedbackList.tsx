import React, { useEffect, useState } from "react";
import axios from "axios";

interface FeedbackItem {
  id: number;
  message: string;
  timestamp: string;
}

interface FeedbackListProps {
  refreshTrigger: boolean;
}

// ✅ Use environment variable (set in .env)
const API_BASE_URL = import.meta.env.VITE_API_URL;

const FeedbackList: React.FC<FeedbackListProps> = ({ refreshTrigger }) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback`);
      setFeedbackList(response.data.feedbackList);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]); // refetch when refreshTrigger changes

  return (
    <div>
      <h2>All Feedback</h2>
      <ul>
        {feedbackList.map((item) => (
          <li key={item.id}>
            {item.message}
            <br />
            <small>{new Date(item.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
