import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Logout failed');
            console.log('the error is', error)
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    HomeHero
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-indigo-600">Home</Link>
                    <Link to="/services" className="hover:text-indigo-600">Services</Link>
                    {user ? (
                        <>
                            <Link to="/my-services" className="hover:text-indigo-600">My Services</Link>
                            <Link to="/add-service" className="hover:text-indigo-600">Add Service</Link>
                            <Link to="/my-bookings" className="hover:text-indigo-600">My Bookings</Link>
                            <Link to="/profile" className="hover:text-indigo-600">Profile</Link>
                            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-indigo-600">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    Menu
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden space-y-2 px-4 pb-4">
                    <Link to="/" className="block">Home</Link>
                    <Link to="/services" className="block">Services</Link>
                    {/* Add conditional links here as above */}
                </div>
            )}
        </nav>
    );
}