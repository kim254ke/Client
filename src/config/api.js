// config/api.js (FRONTEND)

// FIX: Remove the '/api' from the fallback URL so that the base is only the server root.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-p4ly.onrender.com"; 

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://backend-p4ly.onrender.com";

console.log("🔗 API Base URL:", API_BASE_URL);
console.log("🔌 Socket URL:", SOCKET_URL);