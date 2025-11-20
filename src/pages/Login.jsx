import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as loginUserAPI } from "../services/authAPI";
import { getUserBookings } from "../services/bookingAPI";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUserAPI({ email, password });
      loginUser(data.user, data.token);

      // check if user has previous bookings
      const bookings = await getUserBookings(data.user._id, data.token);
      if (bookings.length > 0) {
        navigate("/stylists"); // redirect to stylists if bookings exist
      } else {
        navigate("/"); // otherwise, go to home
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 dark:bg-purple-700 text-white py-2 rounded hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-red-600 dark:text-red-400">{message}</p>}
    </div>
  );
}
