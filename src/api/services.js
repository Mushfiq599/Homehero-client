import api from "./axiosPublic";

export async function getServices(params = {}) {
  const res = await api.get("/api/services", { params });
  return res.data;
}

export async function getServiceById(id) {
  const res = await api.get(`/api/services/${id}`);
  return res.data;
}

export async function createService(payload) {
  const res = await api.post("/api/services", payload);
  return res.data;
}

export async function updateService(id, payload) {
  const res = await api.patch(`/api/services/${id}`, payload);
  return res.data;
}

export async function deleteService(id) {
  const res = await api.delete(`/api/services/${id}`);
  return res.data;
}
