import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteService, getServices } from "../api/services";
import Swal from 'sweetalert2';

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
  }, [user?.email]);


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete service?',
      text: 'Are you sure you want to delete this service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No',
      reverseButtons: true,
      background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
    });

    if (!result.isConfirmed) return;

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

        <Link to="/add-service" className="btn btn-secondary btn-sm">
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
            <div key={s._id} className="card bg-primary border">
              <div className="card-body">
                <div className="flex gap-4">
                  <img
                    src={s.imageURL}
                    alt={s.serviceName}
                    className="w-48 h-48 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl">{s.serviceName}</h3>
                    <div className="text-base opacity-70">{s.category}</div>
                    <div className="mt-2 font-extrabold text-lg text-teal-700">
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
                    className="btn btn-outline hover:bg-gray-400 btn-sm border"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn bg-red-600 hover:bg-red-700 btn-sm"
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
