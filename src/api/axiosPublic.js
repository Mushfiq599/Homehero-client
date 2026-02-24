import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "https://homehero-server.vercel.app";
const api = axios.create({
  baseURL,
});

export default api;
