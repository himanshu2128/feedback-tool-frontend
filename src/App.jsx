import React, { useEffect, useState } from 'react';
import { submitFeedback } from "./components/api"; // ✅ correct path


export default function App() {
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getFeedback().then(data => {
      if (data.success) setFeedbacks(data.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFeedback(message);
    const res = await getFeedback();
    if (res.success) setFeedbacks(res.data);
    setMessage('');
  };

  return (
    <div>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {feedbacks.map(fb => (
          <li key={fb._id}>{fb.message} <i>({new Date(fb.createdAt).toLocaleString()})</i></li>
        ))}
      </ul>
    </div>
  );
}
