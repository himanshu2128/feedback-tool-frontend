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

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedbacks`);
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>All Feedback</h2>
      <ul>
        {feedbackList.map((item) => (
          <li key={item._id}>
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
