import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";   // ✅ fixed path
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Mock progress & activity (replace later with real data if needed)
  const studentData = {
    progress: 45,
    activities: [
      { date: "2025-09-17", description: "Completed Lesson 1" },
      { date: "2025-09-16", description: "Attempted Quiz on Topic A" },
    ],
  };

  // Fetch logged-in user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            setUser(snap.data()); // contains name, role, email, etc.
          }
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Animate progress bar filling
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < studentData.progress) {
        current += 1;
        setAnimatedProgress(current);
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [studentData.progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-900 to-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-cyan-900/90 backdrop-blur-sm p-4 flex justify-between items-center z-50 shadow-md">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white animate-gradient hover:scale-105 transition-transform"
        >
          InTutor
        </Link>
        <div>
          <Link
            to="/profile"
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Profile
          </Link>
        </div>
      </nav>

      <div className="p-6 pt-28 max-w-5xl mx-auto">
        {/* Welcome Section with centered animated name */}
        <header className="mb-8 text-center">
          <h2 className="text-5xl font-extrabold mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 animate-nameFade">
            {user?.name || "Student"}
          </h2>
          <p className="text-cyan-200 tracking-wide text-lg animate-nameFade delay-200">
            Your mystical learning journey awaits...
          </p>
        </header>

        {/* Progress Section */}
        <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Your Progress</h3>
          <div className="w-full bg-gray-900/50 rounded-full h-6 overflow-hidden shadow-sm">
            <div
              className="h-6 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${animatedProgress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-cyan-300">{animatedProgress}% completed</p>
        </section>

        {/* Recent Activities */}
        <section className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-900">
            {studentData.activities.map((activity, index) => (
              <li
                key={index}
                className="bg-gray-900/50 p-3 rounded-md shadow hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102"
              >
                <div className="text-cyan-400 text-sm">{activity.date}</div>
                <p className="text-white/90">{activity.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Action Buttons */}
        <section className="flex space-x-4">
          <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Start a Quiz
          </button>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            View Detailed Progress
          </button>
        </section>
      </div>

      {/* Custom Tailwind animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');

          h2 {
            font-family: 'Cinzel Decorative', serif;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background: linear-gradient(90deg, #00FFFF, #8A2BE2, #00FFFF);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient 5s ease infinite;
          }

          @keyframes nameFade {
            0% { opacity: 0; transform: translateY(-10px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-nameFade {
            animation: nameFade 1s ease forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
}

export default StudentDashboard;
