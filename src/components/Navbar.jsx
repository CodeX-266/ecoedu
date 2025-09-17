import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure correct path

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-transparent text-white backdrop-blur-md">
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center space-x-2 hover:scale-105 transition-transform"
      >
        <img
          src={logo}
          alt="InTutor Logo"
          className="w-10 h-10 object-cover rounded-full" // Made round
        />
        <span className="text-xl font-semibold tracking-wide drop-shadow-md">
          InTutor
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 items-center text-white text-base">
        {["Dashboard", "Quiz", "Leaderboard"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="relative group font-medium hover:text-green-300 transition"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-green-300 group-hover:w-full transition-all duration-300 rounded"></span>
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
