import React, { useState } from "react";
import { registerUser } from "../services/authAPI";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full max-w-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-gradient-slow">
          Create Your GlamHub Account
        </h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-base">
          <input
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 dark:bg-pink-500 text-white py-3 rounded-lg hover:bg-purple-700 dark:hover:bg-pink-600 transition-all font-semibold"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-purple-600 dark:text-pink-400 font-semibold">Login</Link>
        </p>

        <style>{`
          @keyframes gradient-slow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-slow {
            background-size: 200% 200%;
            animation: gradient-slow 8s ease infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
