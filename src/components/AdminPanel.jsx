import React, { useEffect, useState } from 'react';
import { getAllFeedback } from './api';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getAllFeedback().then(res => {
      if (res.success) setFeedbacks(res.data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin'; // refresh to login screen
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>📊 Admin Panel</h1>
      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>Logout</button>
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
};

export default AdminPanel;
