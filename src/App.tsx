import { useState } from "react"; // ✅ this is required
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackList from "./pages/FeedbackList";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleNewFeedback = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="app-container">
      <h1>📢 Feedback Tool</h1>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "🔙 Back to Feedback Form" : "🛠️ Admin Dashboard"}
      </button>

      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <FeedbackForm onSuccess={handleNewFeedback} />
          <hr />
          <FeedbackList refreshTrigger={refreshList} />
        </>
      )}
    </div>
  );
}

export default App;
