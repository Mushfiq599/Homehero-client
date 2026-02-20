import { useEffect, useMemo, useState } from "react";
import { getServices } from "../api/services";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) => s.title?.toLowerCase().includes(q));
  }, [services, search]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getServices();
        if (alive) setServices(data);
      } catch (e) {
        if (alive) setErr(e?.message || "Failed to load services.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => (alive = false);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold">All Services</h1>
          <p className="opacity-70 mt-1">Browse and book what you need.</p>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <div className="text-sm opacity-70">
            Total: <span className="font-semibold">{services.length}</span>
          </div>
          <input
            className="input input-bordered w-full sm:w-72"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <LoadingSpinner label="Loading services..." />}
      {err && !loading && <ErrorState message={err} />}

      {!loading && !err && (
        <>
          {filtered.length === 0 ? (
            <div className="py-12 text-center opacity-70">No Service Found</div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}