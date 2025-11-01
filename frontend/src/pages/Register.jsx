import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser({ name, email, password });
      login(data.token, data);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-indigo-100 to-pink-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-2xl border-t-4 border-teal-400">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">Register</h2>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-7">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-teal-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-teal-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-teal-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 via-indigo-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow hover:scale-105 transition-all"
          >
            Register
          </button>
        </form>
        <p className="mt-5 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
