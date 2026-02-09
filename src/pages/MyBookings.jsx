import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axiosPublic from "../api/axiosPublic";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    axiosPublic
      .get(`/api/bookings?email=${encodeURIComponent(user.email)}`)
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const cancelBooking = async (id) => {
    const ok = confirm("Cancel this booking?");
    if (!ok) return;

    try {
      await axiosPublic.delete(`/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled");
    } catch {
      toast.error("Cancel failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      <p className="opacity-70 mt-2">Your booked services list.</p>

      {bookings.length === 0 ? (
        <div className="mt-10 text-center opacity-70">No bookings yet.</div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Booking Date</th>
                <th>ServiceId</th>
                <th>Price</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.bookingDate}</td>
                  <td className="text-xs opacity-70">{b.serviceId}</td>
                  <td className="font-bold text-primary">${b.price}</td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-error" onClick={() => cancelBooking(b._id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
