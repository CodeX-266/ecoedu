import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentQuiz from "./pages/Student/StudentQuiz";
import Courses from "./pages/Courses"; // 👈 1. Import the Courses component

// Private Route wrapper for role-based access
const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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
            <PrivateRoute role="student">
              <div className="pt-20 min-h-screen">
                <Dashboard />
              </div>
            </PrivateRoute>
          }
        />

        {/* Teacher Dashboard */}
        <Route
          path="/teacher-dashboard"
          element={
            <PrivateRoute role="teacher">
              <div className="pt-20 min-h-screen">
                <TeacherDashboard />
              </div>
            </PrivateRoute>
          }
        />

        {/* 👇 2. Add the new route for the Courses page */}
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <div className="pt-20 min-h-screen">
                <Courses />
              </div>
            </PrivateRoute>
          }
        />

        {/* Quiz */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <div className="pt-20 min-h-screen">
                <Quiz />
              </div>
            </PrivateRoute>
          }
        />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <div className="pt-20 min-h-screen">
                <Leaderboard />
              </div>
            </PrivateRoute>
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
        <Route
          path="/student-quiz"
          element={
            <div className="pt-20 min-h-screen">
              <StudentQuiz />
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