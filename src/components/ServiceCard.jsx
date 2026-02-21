import { Link, useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth'; // adjust path if needed
import toast from 'react-hot-toast';

export default function ServiceCard({ service }) {
  const { user } = useAuth(); // get current user 
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    if (!user) {
      e.preventDefault(); // prevent navigation
      toast.error("Please login to view service details");
      navigate('/login');
    return;
    }
  };

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <img 
        src={service.image} 
        alt={service.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {service.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {service.category}
        </p>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
          ${service.price}
        </p>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
          {service.description}
        </p>

        {/* Protected Link */}
        {user ? (
          <Link
            to={`/services/${service._id}`}
            className="btn btn-primary mt-auto w-full text-center"
          >
            View Details
          </Link>
        ) : (
          <button
            onClick={handleViewDetails}
            className="btn btn-primary mt-auto w-full text-center opacity-70 cursor-pointer"
          >
            View Details 
          </button>
        )}
      </div>
    </div>
  );
}