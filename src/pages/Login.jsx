import { useState } from "react";
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
