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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const filtered = useMemo(() => {
    let result = services;

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((s) => s.serviceName?.toLowerCase().includes(q));
    }

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    if (min !== null) {
      result = result.filter((s) => s.price >= min);
    }
    if (max !== null) {
      result = result.filter((s) => s.price <= max);
    }

    return result;
  }, [services, search, minPrice, maxPrice]);

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
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            All Services
          </h1>
          <p className="opacity-70 mt-1 text-gray-600 dark:text-gray-400">
            Browse and book what you need.
          </p>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="text-sm opacity-70 whitespace-nowrap">
            Total: <span className="font-semibold">{filtered.length}</span>
          </div>

          <input
            className="input input-bordered w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pl-2"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered w-full sm:w-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pl-2"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered w-full sm:w-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pl-2"
          />
        </div>
      </div>
      {loading && <LoadingSpinner label="Loading services..." />}
      {err && !loading && <ErrorState message={err} />}
      {!loading && !err && (
        <>
          {filtered.length === 0 ? (
            <div className="py-16 text-center opacity-70 text-gray-600 dark:text-gray-400">
              {search.trim() || minPrice || maxPrice
                ? "No services match your search or price range"
                : "No services available at the moment"}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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