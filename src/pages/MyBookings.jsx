import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        toast.error('Please login to view bookings');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`, {
          params: { email: user.email },
        });
        setBookings(res.data || []);
      } catch (err) {
        console.error('Bookings fetch error:', err);
        toast.error(err.response?.data?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email]);

  const handleCancel = async (id) => {
  const result = await Swal.fire({
    title: 'Cancel Booking?',
    text: 'Are you sure you want to cancel this booking?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444', 
    cancelButtonColor: '#6b7280', 
    confirmButtonText: 'Yes, Cancel',
    cancelButtonText: 'No',
    reverseButtons: true,
    background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
    color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827',
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
    setBookings((prev) => prev.filter((b) => b._id !== id));
    toast.success('Booking cancelled successfully');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Cancel failed');
  }
};

  if (loading) return <LoadingSpinner label="Loading bookings..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
        My Bookings
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        All your booked services appear here.
      </p>

      {bookings.length === 0 ? (
        <div className="mt-10 text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            You have no bookings yet.
          </p>
          <Link
            to="/services"
            className="inline-block px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition shadow-md"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-4 mb-5">
                  <img
                    src={booking.image || 'https://via.placeholder.com/80?text=No+Image'}
                    alt={booking.name || 'Service'}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80?text=Image+Error';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                      {booking.name || 'Service'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {booking.category || 'Uncategorized'}
                    </p>
                    <p className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                      ${booking.price}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      Date: {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-teal-600 dark:bg-teal-400 dark:text-teal-800 text-xs font-medium rounded-full">
                      {booking.status || 'Confirmed'}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    Cancel Booking
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