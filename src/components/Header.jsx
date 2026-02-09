import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, logOut } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "btn btn-sm btn-ghost font-semibold text-primary"
      : "btn btn-sm btn-ghost";

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            HomeHero
          </Link>
        </div>

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
              <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>

              {user && (
                <>
                  <li><NavLink to="/add-service" className={linkClass}>Add Service</NavLink></li>
                  <li><NavLink to="/my-services" className={linkClass}>My Services</NavLink></li>
                  <li><NavLink to="/my-bookings" className={linkClass}>My Bookings</NavLink></li>
                  <li><NavLink to="/profile" className={linkClass}>Profile</NavLink></li>
                </>
              )}

              {!user ? (
                <>
                  <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
                  <li><NavLink to="/register" className={linkClass}>Register</NavLink></li>
                </>
              ) : (
                <li><button className="btn btn-sm btn-outline" onClick={logOut}>Logout</button></li>
              )}
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/services" className={linkClass}>Services</NavLink>

            {user && (
              <>
                <NavLink to="/add-service" className={linkClass}>Add Service</NavLink>
                <NavLink to="/my-services" className={linkClass}>My Services</NavLink>
                <NavLink to="/my-bookings" className={linkClass}>My Bookings</NavLink>
                <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              </>
            )}
          </div>

          {!user ? (
            <div className="hidden lg:flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-base-200" />
                )}
                <span className="text-sm font-medium">
                  {user.displayName || "User"}
                </span>
              </div>
              <button className="btn btn-sm btn-outline" onClick={logOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
