import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ServiceCard from '../components/ServiceCard';
import axiosPublic from '../api/axiosPublic';

export default function Services() {
  const [services, setServices] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const params = {};
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    axiosPublic.get(`${import.meta.env.VITE_API_URL}/api/services`, { params })
      .then(res => setServices(res.data))
      .catch(err => toast.error('Failed to load services'));
  }, [minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">All Services</h2>
      <div className="flex space-x-4 mb-8">
        <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price" className="input" />
        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" className="input" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(service => <ServiceCard key={service._id} service={service} />)}
      </div>
    </div>
  );
}