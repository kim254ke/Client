// config/api.js (FRONTEND)

// BEFORE: export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-p4ly.onrender.com/api";
// ---------------------------------------------------------------------------------------------------------------------

// AFTER: Remove the "/api" part from the fallback URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-p4ly.onrender.com";

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://backend-p4ly.onrender.com";

console.log("🔗 API Base URL:", API_BASE_URL);
console.log("🔌 Socket URL:", SOCKET_URL);