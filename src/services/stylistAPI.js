import axios from "axios";
import { API_BASE_URL } from "../config/api";

// const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/stylists`;

export const getStylists = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getStylistById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createStylist = async (stylist, token) => {
  const response = await axios.post(API_BASE_URL, stylist, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
