import React, { useEffect, useState } from 'react';
import { getAllFeedback, submitFeedback } from './components/api';

export default function App() {
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getAllFeedback().then(data => {
      if (data.success) setFeedbacks(data.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // prevent empty messages
    await submitFeedback(message);
    const res = await getAllFeedback();
    if (res.success) setFeedbacks(res.data);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Feedback Collection</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <textarea
          placeholder="Write your feedback..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          Submit
        </button>
      </form>
      <h2>All Feedback</h2>
      <ul>
        {feedbacks.map(fb => (
          <li key={fb._id} style={{ marginBottom: '10px' }}>
            <strong>{fb.message}</strong><br />
            <small>{new Date(fb.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
