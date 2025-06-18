import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    // Fetch feedback data with token
    axios
      .get(`${API_BASE_URL}/api/feedback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFeedbackList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch feedback:", err);
        setLoading(false);

        // If token is invalid or expired, log out the user
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin-login");
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛠 Admin Feedback Dashboard</h2>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        🚪 Logout
      </button>

      {loading ? (
        <p>Loading feedback...</p>
      ) : feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul style={styles.list}>
          {feedbackList.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{new Date(item.createdAt).toLocaleString()}</strong>:{" "}
              {item.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  heading: {
    marginBottom: "20px",
  },
  logoutBtn: {
    padding: "10px 15px",
    marginBottom: "20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default AdminDashboard;
