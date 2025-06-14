import { useEffect, useState } from "react";
import axios from "axios";

interface Feedback {
  id: number;
  message: string;
  timestamp: string;
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`);
        setFeedbacks(res.data.feedbackList);
      } catch (err) {
        console.error("Failed to load feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">📋 Submitted Feedback</h2>
      {loading ? (
        <p>Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="p-3 border rounded bg-gray-50">
              <p className="text-gray-800">{fb.message}</p>
              <p className="text-sm text-gray-500">
                Submitted at: {new Date(fb.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;
