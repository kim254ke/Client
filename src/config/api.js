// config/api.js - Create this file in your frontend src folder

// Remove /api from here since it's already in the env var OR in the routes
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, '') + '/api'  // Normalize
  : "http://localhost:5000/api";

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

console.log("🔗 API Base URL:", API_BASE_URL);
console.log("🔌 Socket URL:", SOCKET_URL);