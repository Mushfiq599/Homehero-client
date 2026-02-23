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
          Authorization: `Bearer ${await user.getIdToken()}`
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
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={service.imageURL}
            alt={service.serviceName}
            className="w-full h-[400px] md:h-[500px] lg:h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {service.category}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {service.serviceName}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-4xl font-extrabold text-teal-600 dark:text-teal-400">
                ${service.price}
              </p>
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {service.category}
              </span>
            </div>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
              {service.description}
            </p>

            <div className="space-y-3 mb-10">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-gray-100">Provider:</span> {service.providerName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-gray-100">Email:</span> {service.providerEmail}
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              disabled={service.providerEmail === user?.email || !user}
              className={`w-full px-10 py-5 rounded-xl font-bold text-lg transition shadow-xl ${
                service.providerEmail === user?.email || !user
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {service.providerEmail === user?.email
                ? "Can't Book Your Own Service"
                : !user
                ? "Login to Book"
                : 'Book Now'}
            </button>

            {!user && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                Please login to book this service
              </p>
            )}
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
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
                <p className="italic mb-3 text-gray-700 dark:text-gray-300">"{rev.comment}"</p>
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
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={service}
        onBook={handleBook}
      />
    </div>
  );
}