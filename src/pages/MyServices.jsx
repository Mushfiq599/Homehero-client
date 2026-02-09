import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function MyServices() {
  const [services, setServices] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/services`, { params: { email: user.email } })
      .then(res => setServices(res.data))
      .catch(err => toast.error('Failed to load services'));
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/services/${id}`);
      setServices(services.filter(s => s._id !== id));
      toast.success('Deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  // Add update function similar to delete

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">My Services</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>${s.price}</td>
              <td>
                <button className="btn btn-secondary mr-2">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}