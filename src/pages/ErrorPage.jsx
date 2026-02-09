import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">HomeHero</Link>
          <Link to="/services" className="btn btn-sm btn-outline">Services</Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=60"
            alt="404"
            className="w-full h-56 object-cover rounded-2xl"
          />
          <h1 className="mt-6 text-4xl font-extrabold">404</h1>
          <p className="opacity-70 mt-2">
            Page not found. {err?.statusText || err?.message || ""}
          </p>
          <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
        </div>
      </div>

      <div className="border-t text-center text-xs opacity-60 py-6">
        © {new Date().getFullYear()} HomeHero
      </div>
    </div>
  );
}
