import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import  useAuth  from '../hooks/useAuth';
import BookingModal from '../components/BookingModal';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/services/${id}`);
        setService(res.data);
      } catch (err) {
        toast.error('Failed to load service');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleBook = async (bookingData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}` // optional if using token auth
        }
      });
      toast.success('Booking successful!');
      setModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!service) return (
    <div className="text-center py-20 text-xl text-gray-600 dark:text-gray-400">
      Service not found
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Image & Quick Info */}
        <div>
          <img
            src={service.imageURL}
            alt={service.name}
            className="w-full h-96 object-cover rounded-xl shadow-xl"
          />
          <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
            <p className="text-3xl font-bold text-indigo-600 mb-4">${service.price}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Category: <span className="font-medium">{service.category}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Provider: <span className="font-medium">{service.providerName}</span>
            </p>
          </div>
        </div>

        {/* Right - Description & Book Button */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {service.name}
          </h1>
          <p className="text-lg mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
            {service.description}
          </p>

          <button
            onClick={() => setModalOpen(true)}
            disabled={service.providerEmail === user?.email || !user}
            className={`w-full md:w-auto px-10 py-4 rounded-lg font-bold text-white transition text-lg ${
              service.providerEmail === user?.email || !user
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {service.providerEmail === user?.email
              ? "Can't Book Your Own Service"
              : !user
              ? "Login to Book"
              : 'Book Now'}
          </button>

          {!user && (
            <p className="text-sm text-gray-500 mt-3">
              Please login to book this service
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Customer Reviews
        </h2>
        {service.reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.reviews.map((rev, index) => (
              <div key={index} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                  <span className="ml-2 font-bold">{rev.rating}/5</span>
                </div>
                <p className="italic mb-3">"{rev.comment}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {rev.userEmail.split('@')[0]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
            No reviews yet. Be the first to book and review!
          </p>
        )}
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={service}
        onBook={handleBook}
      />
    </div>
  );
}