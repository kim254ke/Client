import axios from "axios";

// Since your backend runs on port 5000 (from server.js)
const API_URL = "http://localhost:5000/api";

// Get all bookings for a user
export const getUserBookings = async (userId, token) => {
  const res = await axios.get(`${API_URL}/bookings/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new booking
export const createBooking = async (bookingData, token) => {
  const res = await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update a booking (reschedule)
export const updateBooking = async (booking, token) => {
  const res = await axios.put(`${API_URL}/bookings/${booking._id}`, booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete / cancel a booking
export const deleteBooking = async (bookingId, token) => {
  const res = await axios.delete(`${API_URL}/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};