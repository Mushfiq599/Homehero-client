import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Header() {
  const { user, logOut } = useAuth();

  const navClass = ({ isActive }) =>
    isActive
      ? "px-3 py-2 rounded-lg text-sm font-semibold bg-primary/10 text-primary"
      : "px-3 py-2 rounded-lg text-sm font-medium hover:bg-base-200 transition";

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  const MenuLinks = () => (
    <>
      <NavLink to="/" className={navClass}>Home</NavLink>
      <NavLink to="/services" className={navClass}>Services</NavLink>

      {user && (
        <>
          <NavLink to="/add-service" className={navClass}>Add Service</NavLink>
          <NavLink to="/my-services" className={navClass}>My Services</NavLink>
          <NavLink to="/my-bookings" className={navClass}>My Bookings</NavLink>
          <NavLink to="/profile" className={navClass}>Profile</NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="navbar px-0">
          {/* Left: Brand */}
          <div className="navbar-start">
            {/* Mobile menu */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>

              <div tabIndex={0} className="dropdown-content mt-3 w-72 rounded-2xl border bg-base-100 shadow-xl p-3">
                <div className="flex flex-col gap-1">
                  <MenuLinks />

                  <div className="divider my-2" />

                  {!user ? (
                    <div className="flex gap-2">
                      <Link to="/login" className="btn btn-outline btn-sm flex-1">Login</Link>
                      <Link to="/register" className="btn btn-primary btn-sm flex-1">Register</Link>
                    </div>
                  ) : (
                    <button onClick={handleLogout} className="btn btn-outline btn-sm w-full">
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-primary/15 grid place-items-center border border-primary/20 group-hover:bg-primary/20 transition">
                <span className="text-primary font-black text-lg">H</span>
              </div>
              <div className="leading-tight">
                <div className="text-lg font-extrabold tracking-tight">HomeHero</div>
                <div className="text-xs opacity-70 -mt-0.5">Home services, fast</div>
              </div>
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <div className="navbar-center hidden lg:flex">
            <nav className="flex items-center gap-1 rounded-2xl bg-base-200/60 p-1">
              <MenuLinks />
            </nav>
          </div>

          {/* Right: Auth / User */}
          <div className="navbar-end gap-2">
            {!user ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-base-200/60">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-base-300" />
                  )}
                  <div className="leading-tight pr-1">
                    <div className="text-sm font-semibold max-w-[140px] truncate">
                      {user.displayName || "User"}
                    </div>
                    <div className="text-xs opacity-70 max-w-[140px] truncate">
                      {user.email}
                    </div>
                  </div>
                </div>

                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </div>
            )}

            {/* Mobile: quick auth icon */}
            {!user && (
              <Link to="/login" className="btn btn-ghost btn-circle lg:hidden" aria-label="Login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 7a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
