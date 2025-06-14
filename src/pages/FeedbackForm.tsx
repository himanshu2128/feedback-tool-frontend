import React, { useState } from "react";
import axios from "axios";

interface FeedbackFormProps {
  onSuccess?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/feedback", { message });
      setMessage("");
      onSuccess?.(); // Optional call if provided
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
