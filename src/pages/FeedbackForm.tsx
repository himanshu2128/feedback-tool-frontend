import React, { useState, FormEvent } from "react";
import { submitFeedback } from "../components/api"; // ✅ Import API call

type FeedbackFormProps = {
  onSuccess: () => void;
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const result = await submitFeedback({ message });

      if (result.success) {
        setMessage("");
        setStatus("✅ Feedback submitted successfully!");
        onSuccess(); // Refresh feedback list if needed
      } else {
        setStatus("❌ Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("❌ Error connecting to server.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">📝 Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your feedback..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

export default FeedbackForm;
