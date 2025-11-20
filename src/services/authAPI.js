import axios from "axios";
import { API_BASE_URL } from "../config/api";


// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/register`, userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/login`, userData);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
