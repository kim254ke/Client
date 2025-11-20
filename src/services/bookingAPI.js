// bookingRoutes.js (or similar file)

import axios from "axios";
import { API_BASE_URL } from "../config/api";

const BOOKINGS_URL = `${API_BASE_URL}/api/bookings`; // Correct Prefix

// Get all bookings for a user
export const getUserBookings = async (userId, token) => {
  // Adjusted to use the specific base URL for bookings
  const res = await axios.get(`${BOOKINGS_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new booking
export const createBooking = async (bookingData, token) => {
  // Uses the base URL: .../api/bookings
  const res = await axios.post(BOOKINGS_URL, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update a booking (reschedule)
export const updateBooking = async (booking, token) => {
  const res = await axios.put(`${BOOKINGS_URL}/${booking._id}`, booking, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete / cancel a booking
export const deleteBooking = async (bookingId, token) => {
  const res = await axios.delete(`${BOOKINGS_URL}/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};