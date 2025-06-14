import React, { useState } from "react";
import axios from "axios";

interface FeedbackFormProps {
  onSuccess?: () => void;
}

// ✅ Set your deployed backend URL here (easier to change later)
const API_BASE_URL = "https://feedback-tool-backend-1.onrender.com";

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      await axios.post(`${API_BASE_URL}/api/feedback`, { message });
      setMessage("");
      onSuccess?.(); // Notify parent to refresh feedback list
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your feedback here..."
        rows={4}
        cols={40}
        required
      />
      <br />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
