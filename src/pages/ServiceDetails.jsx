import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookingModal from '../components/BookingModal';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../hooks/useAuth';

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
      } catch (error) {
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleBook = async (bookingData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, bookingData);
      toast.success('Booking successful!');
      setModalOpen(false);
    } catch (error) {
      toast.error('Booking failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!service) return <div className="text-center py-20 text-xl">Service not found</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
          <p className="text-2xl font-semibold text-indigo-600 mb-4">${service.price}</p>
          <p className="text-lg mb-6">{service.description}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Category: <span className="font-medium">{service.category}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Provider: <span className="font-medium">{service.providerName}</span>
          </p>

          <button
            onClick={() => setModalOpen(true)}
            disabled={service.providerEmail === user?.email}
            className={`px-8 py-4 rounded-lg font-bold text-white transition ${
              service.providerEmail === user?.email
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {service.providerEmail === user?.email ? "Can't Book Your Own Service" : 'Book Now'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Reviews</h2>
        {service.reviews?.length > 0 ? (
          <div className="space-y-6">
            {service.reviews.map((rev, index) => (
              <div key={index} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <p className="font-semibold">{rev.rating} Stars</p>
                <p>{rev.comment}</p>
                <p className="text-sm text-gray-500 mt-2">By {rev.userEmail}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
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