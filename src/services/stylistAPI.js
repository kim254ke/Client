// stylistRoutes.js (or similar file)

import axios from "axios";
import { API_BASE_URL } from "../config/api";

const STYLISTS_URL = `${API_BASE_URL}/api/stylists`; // Correct Prefix

export const getStylists = async () => {
  const response = await axios.get(STYLISTS_URL); // Calls: .../api/stylists (Fixed 404!)
  return response.data;
};

export const getStylistById = async (id) => {
  const response = await axios.get(`${STYLISTS_URL}/${id}`);
  return response.data;
};

export const createStylist = async (stylist, token) => {
  const response = await axios.post(STYLISTS_URL, stylist, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};