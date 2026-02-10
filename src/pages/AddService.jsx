import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { createService } from "../api/services"; // ✅ use api helper

export default function AddService() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first");
      return navigate("/login");
    }

    const priceNum = Number(form.price);
    if (!priceNum || priceNum <= 0) {
      toast.error("Price must be a valid number");
      return;
    }

    try {
      setLoading(true);

      await createService({
        serviceName: form.serviceName.trim(),
        category: form.category.trim(),
        price: priceNum,
        description: form.description.trim(),
        imageURL: form.imageURL.trim(),
        providerName: user?.displayName || "Provider",
        providerEmail: user?.email,
      });

      toast.success("Service added!");
      setForm({
        serviceName: "",
        category: "",
        price: "",
        description: "",
        imageURL: "",
      });

      navigate("/my-services");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Add Service</h1>
      <p className="opacity-70 mt-2">Publish a service so customers can book you.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="input input-bordered w-full"
          name="serviceName"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          name="category"
          placeholder="Category (e.g. Cleaning, Plumbing)"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          className="input input-bordered w-full"
          name="imageURL"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={handleChange}
          required
        />

        <textarea
          className="textarea textarea-bordered md:col-span-2 min-h-[140px]"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button
          className="btn btn-primary md:col-span-2"
          disabled={loading}
          type="submit"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}
