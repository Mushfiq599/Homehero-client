import { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

Modal.setAppElement('#root');

export default function BookingModal({ isOpen, onClose, service, onBook }) {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return toast.error('Please select a date');

    setLoading(true);
    try {
      await onBook({
        userEmail: user.email,
        serviceId: service._id,
        bookingDate: date,
        price: service.price,
      });
      toast.success('Booking confirmed!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-xl p-8 max-w-lg mx-auto mt-20 outline-none max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-900 dark:text-gray-100">
        Book {service.name}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Email (read-only)
          </label>
          <input
            value={user.email}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Preferred Booking Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
            min={new Date().toISOString().split('T')[0]} // can't choose past date
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || service.providerEmail === user.email}
            className={`px-6 py-3 rounded-lg text-gray-900 dark:text-gray-100 font-medium transition ${
              loading || service.providerEmail === user.email
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>

        {service.providerEmail === user.email && (
          <p className="text-red-600 text-center mt-4 font-medium">
            You cannot book your own service
          </p>
        )}
      </form>
    </Modal>
  );
}