import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosPublic";
import useAuth from "../hooks/useAuth";
import { createBooking } from "../api/bookings";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/services/${id}`);
        if (alive) setService(res.data);
      } catch (e) {
        toast.error("Failed to load service");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => (alive = false);
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();

    // requirement: unauthenticated -> go login then back
    if (!user) {
      return navigate("/login", { state: { from: location }, replace: true });
    }

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const bookingDate = form.bookingDate.value;

    try {
      await createBooking({
        userName: name,
        userEmail: email,
        bookingDate,
        price: service.price,
        serviceId: service._id,
        serviceName: service.serviceName,
        serviceImage: service.imageURL,
        category: service.category,
        providerName: service.providerName,
        providerEmail: service.providerEmail,
        status: "pending",
      });

      toast.success("Booking successful!");
      form.reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <Link to="/services" className="btn btn-primary mt-6">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <img
        src={service.imageURL}
        alt={service.serviceName}
        className="w-full h-80 object-cover rounded-2xl"
      />

      <div>
        <h1 className="text-3xl font-extrabold">{service.serviceName}</h1>
        <p className="opacity-70 mt-2">{service.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge badge-outline">{service.category}</span>
          <span className="badge badge-outline">Provider: {service.providerName}</span>
        </div>

        <div className="mt-4 text-3xl font-extrabold text-teal-700">
          ${service.price}
        </div>

        {/* ✅ Book Consultation Form */}
        <div className="mt-8 card bg-base-100 border">
          <div className="card-body">
            <h2 className="card-title">Book Consultation</h2>
            <p className="text-sm opacity-70">
              Fill the form to book this service.
            </p>

            <form onSubmit={handleBook} className="mt-4 space-y-3">
              <input
                name="name"
                className="input input-bordered w-full"
                placeholder="Name"
                defaultValue={user?.displayName || ""}
                required
              />

              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                defaultValue={user?.email || ""}
                required
              />

              <input
                name="bookingDate"
                type="date"
                className="input input-bordered w-full"
                required
              />

              <button className="btn btn-primary w-full" type="submit">
                Book Now
              </button>
            </form>

            {!user && (
              <p className="text-sm opacity-70 mt-3">
                Please login to book.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
