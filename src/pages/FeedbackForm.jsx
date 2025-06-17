// src/pages/FeedbackForm.jsx
import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ onSuccess }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter some feedback.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", { message });
      alert("✅ Feedback submitted!");
      setMessage("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Error submitting feedback:", err);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your feedback here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
