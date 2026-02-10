import axios from "axios";

// If VITE_API_URL is set -> use it
// Otherwise fallback to localhost server
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  // only needed if you use cookies (JWT cookie etc.)
  // withCredentials: true,
});

export default api;
