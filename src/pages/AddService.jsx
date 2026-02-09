import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AddService() {
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '', image: '' });
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/services`, {
        ...formData,
        providerName: user.displayName,
        providerEmail: user.email
      });
      toast.success('Service added');
    } catch (error) {
      toast.error('Add failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Add Service</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Service Name" className="input" required />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="input" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="input" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input h-32" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="input" required />
        <button type="submit" className="btn btn-primary w-full">Add</button>
      </form>
    </div>
  );
}