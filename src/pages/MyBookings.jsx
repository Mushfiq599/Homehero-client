import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteBooking, getMyBookings } from "../api/bookings";

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getMyBookings(user?.email);
        if (alive) setBookings(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load bookings");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => (alive = false);
  }, [user?.email]);

  const handleCancel = async (id) => {
    const ok = confirm("Cancel this booking?");
    if (!ok) return;

    try {
      await deleteBooking(id);
      toast.success("Booking cancelled");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Cancel failed");
    }
  };

  if (loading) return <LoadingSpinner label="Loading bookings..." />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold">My Bookings</h1>
      <p className="opacity-70 mt-1">All your booked services appear here.</p>

      {bookings.length === 0 ? (
        <div className="mt-10 text-center opacity-70">No bookings found.</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((b) => (
            <div key={b._id} className="card bg-base-100 border">
              <div className="card-body">
                <div className="flex gap-4">
                  <img
                    src={b.serviceImage}
                    alt={b.serviceName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{b.serviceName}</h3>
                    <div className="text-sm opacity-70">{b.category}</div>
                    <div className="mt-1 font-bold text-teal-700">${b.price}</div>
                    <div className="mt-2 badge badge-outline">{b.status}</div>
                    <div className="text-xs opacity-60 mt-1">
                      Date: {b.bookingDate}
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="btn btn-outline btn-sm"
                  >
                    Cancel
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
