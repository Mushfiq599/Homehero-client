import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user.displayName || '');
  const [photo, setPhoto] = useState(user.photoURL || '');

  const handleUpdate = async () => {
    try {
      await updateUserProfile(name, photo);
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Profile</h2>
      <div className="max-w-md mx-auto">
        <p>Email: {user.email}</p>
        <p>Last Login: {user.metadata.lastSignInTime}</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input mb-4" />
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" className="input mb-4" />
        <button onClick={handleUpdate} className="btn btn-primary w-full">Update</button>
      </div>
    </div>
  );
}