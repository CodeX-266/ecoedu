// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", role);
    navigate(role === "teacher" ? "/teacher-dashboard" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-600">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-8 bg-[#171717] rounded-3xl shadow-lg transform transition-transform duration-400 hover:scale-105 w-full max-w-md"
      >
        <h2 className="text-center text-white text-xl mb-4">Register</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-full bg-[#171717] text-gray-300 shadow-inner outline-none w-full"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-full bg-[#171717] text-gray-300 shadow-inner outline-none w-full"
          required
        />

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 rounded-full bg-[#171717] text-gray-300 shadow-inner outline-none w-full"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-md transition hover:bg-black"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gray-800 text-white rounded-md transition hover:bg-black"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
