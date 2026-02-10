import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteService, getServices } from "../api/services";

export default function MyServices() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const data = await getServices({ email: user.email });
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load your services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleDelete = async (id) => {
    const ok = confirm("Delete this service?");
    if (!ok) return;

    try {
      await deleteService(id);
      toast.success("Service deleted");
      setItems((prev) => prev.filter((s) => s._id !== id));
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <LoadingSpinner label="Loading your services..." />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold">My Services</h1>
          <p className="opacity-70 mt-1">Manage services you’ve added.</p>
        </div>

        <Link to="/add-service" className="btn btn-primary btn-sm">
          + Add Service
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center opacity-70">
          You haven’t added any services yet.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((s) => (
            <div key={s._id} className="card bg-base-100 border">
              <div className="card-body">
                <div className="flex gap-4">
                  <img
                    src={s.imageURL}
                    alt={s.serviceName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{s.serviceName}</h3>
                    <div className="text-sm opacity-70">{s.category}</div>
                    <div className="mt-1 font-extrabold text-teal-700">
                      ${s.price}
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      {s.providerEmail}
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/update-service/${s._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn btn-outline btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
