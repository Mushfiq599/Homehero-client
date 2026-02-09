import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/services/${id}`)
      .then(res => setService(res.data))
      .catch(err => toast.error('Failed to load service'));
  }, [id]);

  const handleBook = async (bookingData) => {
    if (service.providerEmail === user.email) return toast.error('Cannot book own service');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, bookingData);
      toast.success('Booked successfully');
      setModalOpen(false);
    } catch (error) {
      toast.error('Booking failed');
    }
  };

  if (!service) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8"> {service.name} </h2>
      <img src={service.image} alt={service.name} className="w-full h-64 object-cover mb-8" />
      <p className="text-xl mb-4">${service.price}</p>
      <p className="mb-4">{service.description}</p>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary" disabled={service.providerEmail === user?.email}>Book Now</button>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} service={service} onBook={handleBook} />
      
      {/* Reviews */}
      <h3 className="text-3xl font-bold mt-12 mb-4">Reviews</h3>
      {service.reviews?.map((rev, i) => (
        <p key={i} className="mb-4"> {rev.rating} stars: {rev.comment} </p>
      ))}
    </div>
  );
}