import api from "./axiosPublic";

export async function createBooking(payload) {
  const res = await api.post("/api/bookings", payload);
  return res.data;
}

export async function getMyBookings(email) {
  const res = await api.get("/api/bookings", { params: { email } });
  return res.data;
}

export async function deleteBooking(id) {
  const res = await api.delete(`/api/bookings/${id}`);
  return res.data;
}
