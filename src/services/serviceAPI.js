// serviceRoutes.js (or similar file)

import axios from "axios";
import { API_BASE_URL } from "../config/api";

const SERVICES_URL = `${API_BASE_URL}/api/services`; // Correct Prefix

export const getServices = async () => {
  // Request is now GET https://backend-fv82.onrender.com/api/services (Fixed 404!)
  const response = await axios.get(SERVICES_URL); 
  return response.data;
};

export const getServicesByCategory = async (category) => {
  const response = await axios.get(`${SERVICES_URL}/category/${category}`);
  return response.data;
};

export const createService = async (service, token) => {
  const response = await axios.post(SERVICES_URL, service, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};