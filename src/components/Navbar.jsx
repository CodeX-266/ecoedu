import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure correct path

function Navbar() {
  const location = useLocation();

  // Check if the current path is '/login' or '/register'
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  const navClass = isLoginPage 
    ? "bg-gradient-to-br from-black via-gray-900 to-cyan-600 backdrop-blur-md" 
    : "bg-transparent backdrop-blur-md";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 text-white ${navClass}`}>
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center space-x-3 hover:scale-105 transition-transform"
      >
        <img
          src={logo}
          alt="InTutor Logo"
          className="w-10 h-10 object-cover rounded-full"
        />
        <span
          className="text-glow"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "2rem", // smaller for navbar
            lineHeight: 1,
          }}
        >
          InTutor
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 items-center text-white text-lg font-medium">
        {["Dashboard", "Quiz", "Leaderboard"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="relative group hover:text-green-300 transition-colors duration-300"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 group-hover:w-full transition-all duration-300 rounded"></span>
          </Link>
        ))}

        {/* Login & Register */}
        <Link
          to="/login"
          className="relative group font-medium hover:text-blue-300 transition"
        >
          Login
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-300 group-hover:w-full transition-all duration-300 rounded"></span>
        </Link>

        <Link
          to="/register"
          className="relative group font-medium hover:text-blue-300 transition"
        >
          Register
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-300 group-hover:w-full transition-all duration-300 rounded"></span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;