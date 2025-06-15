import React, { useState, FormEvent } from "react";

// ✅ Define props type
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
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      type FeedbackResponse = {
        success: boolean;
        error?: string;
      };

      const data: FeedbackResponse = await response.json();

      if (data.success) {
        setMessage("");
        setStatus("✅ Feedback submitted successfully!");
        onSuccess(); // ✅ Call the parent function to refresh the list
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
