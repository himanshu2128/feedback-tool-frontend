import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackList from "./pages/FeedbackList";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login"; // ✅ Login component

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <h1>📢 Feedback Tool</h1>

        <Routes>
          {/* Public Home Route */}
          <Route
            path="/"
            element={
              <>
                <FeedbackForm />
                <hr />
                <FeedbackList refreshTrigger={false} />
              </>
            }
          />

          {/* Admin Login Page */}
          <Route
            path="/admin-login"
            element={<Login onLogin={() => setIsAdmin(true)} />}
          />

          {/* Optional: Redirect /login to /admin-login */}
          <Route path="/login" element={<Navigate to="/admin-login" />} />

          {/* Admin Dashboard (protected) */}
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
