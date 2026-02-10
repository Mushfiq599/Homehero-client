import api from "./axiosPublic";

export async function getServices(params = {}) {
  const res = await api.get("/api/services", { params });
  return res.data;
}
