import { useState } from 'react';
import toast from 'react-hot-toast';
import  useAuth  from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Name is required');

    setUpdating(true);
    try {
      await updateUserProfile(name.trim(), photoURL.trim());
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading) return <LoadingSpinner label="Loading profile..." />;

  if (!user) return (
    <div className="text-center py-20 text-xl text-gray-600 dark:text-gray-400">
      Please login to view your profile
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Your Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left - Photo & Basic Info */}
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=4f46e5&color=fff&size=128`}
              alt={user.displayName || 'User'}
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600 shadow-xl"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {user.emailVerified ? 'Verified' : 'Unverified'}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {user.displayName || 'User'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {user.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Login: {user.metadata?.lastSignInTime 
              ? new Date(user.metadata.lastSignInTime).toLocaleString() 
              : 'N/A'}
          </p>
        </div>

        {/* Right - Update Form */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Update Profile
          </h3>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photo URL (optional)
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {photoURL && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={photoURL}
                    alt="Preview"
                    className="w-32 h-32 rounded-lg object-cover shadow-md"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128?text=Invalid+URL';
                    }}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={updating}
              className={`w-full px-6 py-4 rounded-lg font-bold text-white transition text-lg ${
                updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}