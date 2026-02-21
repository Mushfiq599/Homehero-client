import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Hero slides (use your own images later)
const slides = [
  {
    image: "https://lirp.cdn-website.com/2914e64f/dms3rep/multi/opt/5+Important+Plumbing+Services+You+Should+Know+About-1920w.jpg",
    headline: "Fast & Reliable Plumbing",
    details: "Emergency fixes, installations, and more — same-day service",
  },
  {
    image: "https://gacservices.com/wp-content/uploads/2018/01/electrician-working-on-electrical-panel-circuit-breaker-box.jpg",
    headline: "Expert Electricians",
    details: "Wiring, repairs, lighting — certified & safe professionals",
  },
  {
    image: "https://tripledscleaningservices.com/wp-content/uploads/2025/01/AdobeStock_331709911.jpg",
    headline: "Professional Cleaning",
    details: "Deep cleaning for homes & offices — spotless results",
  },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/services`);
        setServices(res.data.slice(0, 6)); // take only first 6
      } catch (err) {
        toast.error('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">

      {/* Hero Slider */}
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[500px] md:h-[700px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-gray-900 dark:text-gray-100 text-center px-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-extrabold mb-6"
                >
                  {slide.headline}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-lg md:text-2xl mb-10 max-w-3xl"
                >
                  {slide.details}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    to="/services"
                    className="inline-block px-10 py-5 bg-white dark:bg-gray-800 text-indigo-700 font-bold text-lg rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-xl"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* 6 Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white dark:bg-gray-800 dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-900 dark:text-gray-100">
            Our Services
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
            </div>
          ) : services.length === 0 ? (
            <p className="text-center text-xl text-gray-600 dark:text-gray-400">
              No services available yet
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Static Section 1: Why Choose Us */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-900 dark:text-gray-100">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">Trusted Professionals</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Verified and rated service providers
              </p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">Fast Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book in minutes, get help today
              </p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">Affordable Rates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transparent pricing, no hidden fees
              </p>
            </div>
          </div>
        </div>
      </section>


{/* Static Section 2: Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-900 dark:text-gray-100">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md">
              <p className="text-lg italic mb-4">
                "Fast response and excellent service! Highly recommend."
              </p>
              <p className="font-semibold">— Sarah Ahmed</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md">
              <p className="text-lg italic mb-4">
                "The plumber was professional and fixed everything quickly."
              </p>
              <p className="font-semibold">— Rahim Khan</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

     

      
  