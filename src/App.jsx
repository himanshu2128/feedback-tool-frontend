import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserFeedback from './UserFeedback'; // your current feedback form component
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserFeedback />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
