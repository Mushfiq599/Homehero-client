import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex gap-2 text-teal-600 text-xl font-bold">
              <img src="/assets/maintenance.png" alt="logo" className="w-8 rounded" />
              HomeHero
            </Link>
          <Link to="/services" className="text-gray-700">Services</Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=60"
            alt="404"
            className="w-full h-64 object-cover rounded-2xl"
          />
          <h1 className="mt-4 text-4xl font-extrabold text-primary">404</h1>
          <p className="opacity-70 mt-2">
            Page {err?.statusText || err?.message || ""}
          </p>
          <Link to="/" className="btn btn-secondary mt-4">Back to Home</Link>
        </div>
      </div>

      <div className="border-t text-center text-xs opacity-60 py-6">
        © {new Date().getFullYear()} HomeHero
      </div>
    </div>
  );
}
