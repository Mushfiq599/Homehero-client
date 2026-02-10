import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { getServiceById, updateService } from "../api/services";
import useAuth from "../hooks/useAuth";

export default function UpdateService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getServiceById(id);
        if (alive) setService(data);
      } catch {
        toast.error("Failed to load service");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => (alive = false);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const payload = {
      serviceName: form.serviceName.value.trim(),
      category: form.category.value.trim(),
      price: Number(form.price.value),
      description: form.description.value.trim(),
      imageURL: form.imageURL.value.trim(),
    };

    try {
      await updateService(id, payload);
      toast.success("Service updated");
      navigate("/my-services");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <LoadingSpinner label="Loading service..." />;
  if (!service) return <div className="p-10 text-center">Not found</div>;

  // Optional: prevent editing others’ services (client-side check)
  if (user?.email && service?.providerEmail && user.email !== service.providerEmail) {
    return <div className="p-10 text-center">Unauthorized</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold">Update Service</h1>
      <p className="opacity-70 mt-1">Edit your service details.</p>

      <form onSubmit={handleSubmit} className="mt-6 card bg-base-100 border">
        <div className="card-body space-y-3">
          <input
            name="serviceName"
            defaultValue={service.serviceName}
            className="input input-bordered w-full"
            placeholder="Service Name"
            required
          />
          <input
            name="category"
            defaultValue={service.category}
            className="input input-bordered w-full"
            placeholder="Category"
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={service.price}
            className="input input-bordered w-full"
            placeholder="Price"
            required
          />
          <input
            name="imageURL"
            defaultValue={service.imageURL}
            className="input input-bordered w-full"
            placeholder="Image URL"
            required
          />
          <textarea
            name="description"
            defaultValue={service.description}
            className="textarea textarea-bordered w-full min-h-[140px]"
            placeholder="Description"
            required
          />

          <button className="btn btn-primary w-full" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
