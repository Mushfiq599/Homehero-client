import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/services`)
      .then(res => setServices(res.data.slice(0, 6)))
      .catch(err => toast.error('Failed to load services'));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Hero Slider */}
      <Slider {...sliderSettings}>
        <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: 'url(/assets/hero1.jpg)'}}>
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-6">
            <h1 className="text-5xl font-bold mb-4">Find Trusted Electricians</h1>
            <p className="text-xl mb-6">Fast and reliable electrical services</p>
            <Link to="/services" className="btn btn-primary">Explore</Link>
          </div>
        </div>
        <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: 'url(/assets/hero2.jpg)'}}>
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-6">
            <h1 className="text-5xl font-bold mb-4">Expert Plumbers Near You</h1>
            <p className="text-xl mb-6">Quality plumbing solutions</p>
            <Link to="/services" className="btn btn-primary">Explore</Link>
          </div>
        </div>
        <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: 'url(/assets/hero3.jpg)'}}>
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-6">
            <h1 className="text-5xl font-bold mb-4">Professional Cleaning Services</h1>
            <p className="text-xl mb-6">Spotless cleaning for your home</p>
            <Link to="/services" className="btn btn-primary">Explore</Link>
          </div>
        </div>
      </Slider>

      {/* Dynamic Services */}
      <motion.div initial={ { opacity: 0 } } animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(service => <ServiceCard key={service._id} service={service} />)}
          </div>
        </div>
      </motion.div>

      {/* Static Sections */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <p className="text-xl text-center">Reliable, affordable, and trusted services.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Customer Testimonials</h2>
          <p className="text-xl text-center"> "Great service!" - John Doe</p>
        </div>
      </section>
    </div>
  );
}