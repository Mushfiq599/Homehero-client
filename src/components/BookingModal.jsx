import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function BookingModal({ isOpen, onClose, service, onBook }) {
  const { user } = useAuth();
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({
      userEmail: user.email,
      serviceId: service._id,
      bookingDate: date,
      price: service.price
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <h2>Book {service.name}</h2>
      <form onSubmit={handleSubmit}>
        <input value={user.email} readOnly />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
        <button onClick={onClose} className="btn btn-secondary">Cancel</button>
      </form>
    </Modal>
  );
}