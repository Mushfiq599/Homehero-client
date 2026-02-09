import { useEffect, useMemo, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/api/services")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load services"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) => (s.serviceName || "").toLowerCase().includes(q));
  }, [services, search]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">All Services</h1>
          <p className="opacity-70 mt-1">Browse and book services from providers.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm opacity-70">Total: {filtered.length}</div>
          <input
            className="input input-bordered input-sm"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 text-center opacity-70">No Service Found</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <div key={s._id} className="card bg-base-100 shadow">
              <figure className="h-44">
                <img src={s.imageURL} alt={s.serviceName} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{s.serviceName}</h2>
                <p className="text-sm opacity-70">{s.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-primary">${s.price}</span>
                  <Link to={`/services/${s._id}`} className="btn btn-sm btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
