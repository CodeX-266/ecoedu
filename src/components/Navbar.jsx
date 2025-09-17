import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            setUser({
              uid: firebaseUser.uid,
              ...snap.data(),
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // --- EDITED SECTION START ---
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isCoursesPage = location.pathname === "/courses"; // 1. Check for courses page

  // 2. Updated logic to handle three different background styles
  const navClass = isCoursesPage
    ? "bg-gray-900/90 backdrop-blur-md" // Style for Courses page
    : isLoginPage
    ? "bg-gradient-to-br from-black via-gray-900 to-cyan-600 backdrop-blur-md" // Style for Login/Register
    : "bg-transparent backdrop-blur-md"; // Default style for all other pages
  // --- EDITED SECTION END ---

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 text-white ${navClass}`}
    >
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center space-x-3 hover:scale-105 transition-transform"
      >
        <img
          src={logo}
          alt="InTutor Logo"
          className="w-10 h-10 object-cover rounded-full shadow-lg shadow-cyan-500/40"
        />
        <span
          className="text-glow tracking-wide"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "2rem",
            lineHeight: 1,
          }}
        >
          InTutor
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 items-center text-white text-lg font-medium">
        {/* Dashboard link for logged-in users */}
        {user && (
          <Link
            to={user.role === "teacher" ? "/teacher-dashboard" : "/dashboard"}
            className="relative group hover:text-green-300 transition-colors duration-300"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 group-hover:w-full transition-all duration-300 rounded"></span>
          </Link>
        )}
        
        {/* --- ADDED COURSES LINK --- */}
        {user && (
          <Link
            to="/courses"
            className="relative group hover:text-green-300 transition-colors duration-300"
          >
            Courses
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 group-hover:w-full transition-all duration-300 rounded"></span>
          </Link>
        )}
        {/* --- END ADDED LINK --- */}

        {/* Always available */}
        <Link
          to="/quiz"
          className="relative group hover:text-green-300 transition-colors duration-300"
        >
          Quiz
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 group-hover:w-full transition-all duration-300 rounded"></span>
        </Link>

        <Link
          to="/leaderboard"
          className="relative group hover:text-green-300 transition-colors duration-300"
        >
          Leaderboard
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 group-hover:w-full transition-all duration-300 rounded"></span>
        </Link>

        {/* User profile dropdown or login/register links */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              {/* Avatar circle with first letter */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold border-2 border-cyan-400 shadow-md group-hover:shadow-cyan-500/50 transition">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              {/* Name */}
              <span className="font-medium group-hover:text-cyan-300 transition">
                {user.name}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  open ? "rotate-180 text-cyan-300" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-48 rounded-2xl bg-gray-900/90 backdrop-blur-md shadow-xl border border-gray-700 overflow-hidden"
                >
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 hover:bg-cyan-600/30 transition"
                    onClick={() => setOpen(false)}
                  >
                    <User size={18} className="mr-2 text-cyan-300" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 hover:bg-cyan-600/30 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Settings size={18} className="mr-2 text-cyan-300" /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-3 hover:bg-red-600/40 transition"
                  >
                    <LogOut size={18} className="mr-2 text-red-400" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            {/* If not logged in → show Login & Register */}
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;