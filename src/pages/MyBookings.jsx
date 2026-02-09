import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/my`, { params: { email: user.email } })
      .then(res => setBookings(res.data))
      .catch(err => toast.error('Failed to load bookings'));
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
      toast.success('Cancelled');
    } catch (error) {
      toast.error('Cancel failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">My Bookings</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.serviceId.name}</td> {/* Assume populated or fetch name */}
              <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
              <td>${b.price}</td>
              <td>
                <button onClick={() => handleCancel(b._id)} className="btn btn-danger">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}