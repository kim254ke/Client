import axios from "axios";

const API_URL = "http://localhost:5000/api/services";

export const getServices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getServicesByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/category/${category}`);
  return response.data;
};

export const createService = async (service, token) => {
  const response = await axios.post(API_URL, service, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
