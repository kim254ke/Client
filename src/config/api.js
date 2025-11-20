// config/api.js

// API_BASE_URL now only points to the server root: https://backend-fv82.onrender.com
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-fv82.onrender.com";

// SOCKET_URL remains correct
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://backend-fv82.onrender.com";

console.log("🔗 API Base URL:", API_BASE_URL);
console.log("🔌 Socket URL:", SOCKET_URL);