import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Updated Navbar with logo
import Landing from "./pages/Landing";
import Dashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Student Dashboard */}
        <Route
          path="/dashboard"
          element={
            <div className="pt-20 min-h-screen">
              <Dashboard />
            </div>
          }
        />

        {/* Teacher Dashboard */}
        <Route
          path="/teacher-dashboard"
          element={
            <div className="pt-20 min-h-screen">
              <TeacherDashboard />
            </div>
          }
        />

        {/* Quiz */}
        <Route
          path="/quiz"
          element={
            <div className="pt-20 min-h-screen">
              <Quiz />
            </div>
          }
        />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={
            <div className="pt-20 min-h-screen">
              <Leaderboard />
            </div>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <div className="pt-20 min-h-screen">
              <Login />
            </div>
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <div className="pt-20 min-h-screen">
              <Register />
            </div>
          }
        />

        {/* 404 Fallback */}
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
