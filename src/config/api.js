// config/api.js - Create this file in your frontend src folder

// Simple and clean - just use what's provided in env vars
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

console.log("🔗 API Base URL:", API_BASE_URL);
console.log("🔌 Socket URL:", SOCKET_URL);