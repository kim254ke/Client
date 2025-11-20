import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/stylists`;

export const getStylists = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getStylistById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createStylist = async (stylist, token) => {
  const response = await axios.post(API_URL, stylist, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
