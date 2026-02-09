import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-8xl font-bold text-indigo-600">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <Link to="/" className="btn btn-primary mt-8">Back to Home</Link>
    </div>
  );
}