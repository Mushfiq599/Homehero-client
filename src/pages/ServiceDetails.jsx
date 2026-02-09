import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosPublic from "../api/axiosPublic";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/api/services/${id}`)
      .then((res) => setService(res.data))
      .catch(() => toast.error("Service not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const isOwnService = useMemo(() => {
    if (!user?.email || !service?.providerEmail) return false;
    return user.email === service.providerEmail;
  }, [user?.email, service?.providerEmail]);

  if (loading) return <LoadingSpinner />;

  if (!service) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <Link to="/services" className="btn btn-outline mt-6">Back to Services</Link>
      </div>
    );
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    if (isOwnService) return toast.error("You cannot book your own service.");

    if (!bookingDate) return toast.error("Please select a booking date.");

    setSubmitting(true);
    try {
      await axiosPublic.post("/api/bookings", {
        userEmail: user.email,
        serviceId: service._id,
        bookingDate,
        price: service.price,
      });

      toast.success("Booking confirmed!");
      setBookingDate("");
      document.getElementById("book_modal").close();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link to="/services" className="btn btn-sm btn-outline">← Back</Link>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => document.getElementById("book_modal").showModal()}
          disabled={isOwnService}
          title={isOwnService ? "You cannot book your own service" : ""}
        >
          Book Now
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={service.imageURL}
          alt={service.serviceName}
          className="w-full h-80 md:h-full object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-3xl font-bold">{service.serviceName}</h1>
          <p className="opacity-70 mt-2">{service.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge badge-outline">{service.category}</span>
            <span className="badge badge-outline">Provider: {service.providerName}</span>
          </div>

          <div className="mt-6 p-5 rounded-2xl border bg-base-100">
            <div className="text-sm opacity-70">Price</div>
            <div className="text-4xl font-extrabold text-primary">${service.price}</div>
            {isOwnService && (
              <p className="mt-2 text-sm text-error">
                You can’t book your own service.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <dialog id="book_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Booking</h3>
          <p className="opacity-70 text-sm mt-1">
            Booking for: <span className="font-semibold">{service.serviceName}</span>
          </p>

          <form onSubmit={handleBooking} className="mt-4 space-y-3">
            <input
              className="input input-bordered w-full"
              value={user?.email || ""}
              readOnly
            />

            <input
              type="date"
              className="input input-bordered w-full"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />

            <button className="btn btn-primary w-full" disabled={submitting || isOwnService}>
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
