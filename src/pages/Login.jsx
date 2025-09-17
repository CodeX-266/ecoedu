// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empID, setEmpID] = useState(""); // for teacher
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (role === "teacher") {
        // Check teacher collection
        const teacherRef = doc(db, "teachers", empID);
        const teacherSnap = await getDoc(teacherRef);

        if (!teacherSnap.exists()) {
          setError("Invalid employee ID");
          return;
        }

        const teacherData = teacherSnap.data();
        if (!teacherData.registered) {
          setError("Teacher is not registered by admin yet");
          return;
        }
      }

      // Save login state and role
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      // ✅ Always go to home after login
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-600">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl transform transition-transform duration-400 hover:scale-105 max-w-sm w-full"
      >
        <h2 className="text-center text-gray-900 text-2xl font-bold mb-4 drop-shadow-md">
          Login
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-5 py-3 rounded-full bg-gray-100 text-gray-900 shadow-inner outline-none placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-5 py-3 rounded-full bg-gray-100 text-gray-900 shadow-inner outline-none placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 transition"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-5 py-3 rounded-full bg-gray-100 text-gray-900 shadow-inner outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {role === "teacher" && (
          <input
            type="text"
            placeholder="Employee ID"
            value={empID}
            onChange={(e) => setEmpID(e.target.value)}
            className="px-5 py-3 rounded-full bg-gray-100 text-gray-900 shadow-inner outline-none placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 transition"
            required
          />
        )}

        <button
          type="submit"
          className="mt-6 px-8 py-3 bg-cyan-600 text-white font-semibold rounded-full shadow-lg hover:bg-cyan-500 transition-all transform hover:scale-105"
        >
          Login
        </button>

        <p className="text-center text-gray-700 mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-cyan-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
