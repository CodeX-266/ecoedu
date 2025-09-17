import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-green-600 bg-opacity-80 text-white flex justify-between items-center px-6 py-4 z-20 shadow-md">
      <Link to="/" className="text-2xl font-bold">Questify</Link>
      <div className="space-x-6">
        <Link to="/dashboard" className="hover:text-green-200 transition">Dashboard</Link>
        <Link to="/quiz" className="hover:text-green-200 transition">Quiz</Link>
        <Link to="/leaderboard" className="hover:text-green-200 transition">Leaderboard</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen relative">
      <Router>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="pt-20"> {/* Add top padding so content doesn't go under navbar */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<div className="text-center mt-10 text-xl text-red-600">Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
