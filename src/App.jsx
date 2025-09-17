import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Updated Navbar with logo
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <div className="pt-20 min-h-screen">
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/quiz"
          element={
            <div className="pt-20 min-h-screen">
              <Quiz />
            </div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="pt-20 min-h-screen">
              <Leaderboard />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="pt-20 min-h-screen flex items-center justify-center">
              <span className="text-xl text-red-600">Page Not Found</span>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
