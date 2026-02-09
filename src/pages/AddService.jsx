import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axiosPublic from "../api/axiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.post("/api/services", {
        ...form,
        price: Number(form.price),
        providerName: user?.displayName || "Unknown",
        providerEmail: user?.email,
      });

      toast.success("Service added!");
      setForm({ serviceName: "", category: "", price: "", description: "", imageURL: "" });
      navigate("/my-services");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Add failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Add Service</h1>
      <p className="opacity-70 mt-2">Publish a service so customers can book you.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input input-bordered w-full" name="serviceName" placeholder="Service Name"
          value={form.serviceName} onChange={handleChange} required />

        <input className="input input-bordered w-full" name="category" placeholder="Category"
          value={form.category} onChange={handleChange} required />

        <input className="input input-bordered w-full" type="number" name="price" placeholder="Price"
          value={form.price} onChange={handleChange} required />

        <input className="input input-bordered w-full" name="imageURL" placeholder="Image URL"
          value={form.imageURL} onChange={handleChange} required />

        <textarea className="textarea textarea-bordered md:col-span-2" name="description" placeholder="Description"
          value={form.description} onChange={handleChange} required />

        <button className="btn btn-primary md:col-span-2">Add Service</button>
      </form>
    </div>
  );
}
