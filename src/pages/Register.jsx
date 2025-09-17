// src/components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState(""); // ✅ Added Name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [empID, setEmpID] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // Teacher validation
      if (role === "teacher") {
        if (!empID) {
          toast.error("Please enter Employee ID");
          setLoading(false);
          return;
        }

        const teacherRef = doc(db, "teachers", empID);
        const teacherSnap = await getDoc(teacherRef);

        if (teacherSnap.exists()) {
          const teacherData = teacherSnap.data();
          if (teacherData.registered) {
            toast.error("This teacher is already registered!");
            setLoading(false);
            return;
          }
        }
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Wait for auth state to fully propagate
      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
            unsubscribe();
          }
        });
      });

      // Add user to Firestore ✅ Now includes "name"
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        name, // ✅ Save name
        email,
        role,
        empID: role === "teacher" ? empID : null,
        createdAt: new Date(),
      });

      // Mark teacher as registered
      if (role === "teacher") {
        const teacherRef = doc(db, "teachers", empID);
        await setDoc(teacherRef, { registered: true }, { merge: true });
      }

      toast.success("Registration successful!", {
        duration: 2000,
        style: { zIndex: 9999 },
      });

      setTimeout(() => navigate("/"), 2200);
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error(err.message || "Registration failed!", { style: { zIndex: 9999 } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-600 relative">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff", zIndex: 9999 },
        }}
      />
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-5 p-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl transform transition-transform duration-400 hover:scale-105 max-w-sm w-full"
      >
        <h2 className="text-center text-gray-900 text-2xl font-bold mb-4 drop-shadow-md">
          Register
        </h2>

        {/* ✅ Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-5 py-3 rounded-full bg-gray-100 text-gray-900 shadow-inner outline-none placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 transition"
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          disabled={loading}
          className="mt-6 px-8 py-3 bg-cyan-600 text-white font-semibold rounded-full shadow-lg hover:bg-cyan-500 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-cyan-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
