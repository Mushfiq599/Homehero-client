import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  the [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateUserProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return toast.error('Password must be 6+ chars with upper and lower case');
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateUserProfile(name, photo);
      toast.success('Registered successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      await updateUserProfile(name, photo);
      toast.success('Registered with Google');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Register</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input mb-4" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input mb-4" required />
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" className="input mb-4" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input mb-4" required />
        <button type="submit" className="btn btn-primary w-full">Register</button>
        <button onClick={handleGoogle} className="btn btn-secondary w-full mt-4">Google Register</button>
      </form>
    </div>
  );
}