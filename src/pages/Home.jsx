import { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/api/services?limit=6")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load services"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="rounded-3xl p-10 bg-gradient-to-r from-primary/10 to-base-100 border">
        <h1 className="text-4xl font-extrabold leading-tight">
          Book trusted home services in minutes.
        </h1>
        <p className="mt-3 text-base opacity-80 max-w-2xl">
          Electricians, plumbers, cleaners, AC repair and more — all in one place.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <Link to="/services" className="btn btn-primary">
            Explore Services
          </Link>
          <Link to="/register" className="btn btn-outline">
            Create Account
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold">Popular Services</h2>
            <p className="opacity-70 text-sm mt-1">
              Top picks from our marketplace.
            </p>
          </div>
          <Link to="/services" className="btn btn-sm btn-primary">
            Show All
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s._id}
                to={`/services/${s._id}`}
                className="card bg-base-100 shadow hover:shadow-lg transition"
              >
                <figure className="h-44">
                  <img
                    src={s.imageURL}
                    alt={s.serviceName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{s.serviceName}</h3>
                  <p className="text-sm opacity-70">{s.category}</p>
                  <div className="mt-2 font-bold text-primary">${s.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
