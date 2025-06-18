import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackList from "./pages/FeedbackList";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <Router>
      <div className="app-container">
        <h1>📢 Feedback Tool</h1>
        <Routes>
          <Route path="/" element={
            <>
              <FeedbackForm />
              <hr />
              <FeedbackList />
            </>
          } />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
