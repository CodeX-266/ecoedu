import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", role);
    navigate(role === "teacher" ? "/teacher-dashboard" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-600">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 bg-[#171717] rounded-3xl shadow-lg transform transition-transform duration-400 hover:scale-105"
      >
        <h2 className="text-center text-white text-xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-full bg-[#171717] text-gray-300 shadow-inner outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-full bg-[#171717] text-gray-300 shadow-inner outline-none"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 rounded-full bg-[#171717] text-gray-300 shadow-inner outline-none"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-md transition hover:bg-black"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-gray-800 text-white rounded-md transition hover:bg-black"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
=======
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/background.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-10"
        options={{
          fpsLimit: 60,
          background: { color: "transparent" },
          particles: {
            number: { value: 120, density: { enable: true, area: 800 } },
            size: { value: 2, random: { enable: true, minimumValue: 1 } },
            color: { value: "#ffffff" },
            move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
            opacity: { value: 0.8, random: true },
            shape: { type: "circle" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 120 } },
          },
        }}
      />

      {/* Floating shapes for extra vibe */}
      <motion.div
        className="absolute w-24 h-24 bg-white rounded-full opacity-30 z-10"
        animate={{ y: [0, 15, 0], x: [0, 10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-white rounded-full opacity-25 z-10"
        animate={{ y: [0, -20, 0], x: [0, -15, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Login Form */}
      <motion.form
        onSubmit={handleLogin}
        className="relative z-20 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-10 w-full max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
>>>>>>> 73b6462d60c83ec0b0f6a06f41cda88cd857ceb9
