// authRoutes.js (or similar file)

import axios from "axios";
import { API_BASE_URL } from "../config/api";

const AUTH_URL = `${API_BASE_URL}/api/auth`; // Correct Prefix

export const registerUser = async (userData) => {
  const res = await axios.post(`${AUTH_URL}/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${AUTH_URL}/login`, userData);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${AUTH_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};