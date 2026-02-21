import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useTheme from "../hooks/useTheme";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "font-semibold text-teal-600" : ""
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="navbar px-0">

          <div className="navbar-start">

            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow"
              >
                <NavItem to="/">Home</NavItem>
                <NavItem to="/services">Services</NavItem>

                {user && (
                  <>
                    <NavItem to="/add-service">Add Service</NavItem>
                    <NavItem to="/my-services">My Services</NavItem>
                    <NavItem to="/my-bookings">My Bookings</NavItem>
                    <NavItem to="/profile">Profile</NavItem>
                  </>
                )}

                <li className="mt-2">
                  <button
                    className="btn btn-sm w-full"
                    onClick={toggleTheme}
                  >
                    Switch to {theme === "light" ? "Dark" : "Light"}
                  </button>
                </li>

                {!user ? (
                  <li className="mt-2 flex gap-2">
                    <Link className="btn btn-secondary btn-sm flex-1" to="/login">
                      Login
                    </Link>
                    <Link className="btn btn-outline btn-accent btn-sm flex-1" to="/register">
                      Register
                    </Link>
                  </li>
                ) : (
                  <li className="mt-2">
                    <button onClick={handleLogout} className="btn btn-secondary btn-sm w-full">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <Link to="/" className="flex gap-2 text-teal-600 text-xl font-bold">
              <img src="/maintenance.png" alt="logo" className="w-8 rounded" />
              HomeHero
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/services">Services</NavItem>

              {user && (
                <>
                  <NavItem to="/add-service">Add Service</NavItem>
                  <NavItem to="/my-services">My Services</NavItem>
                  <NavItem to="/my-bookings">My Bookings</NavItem>
                  <NavItem to="/profile">Profile</NavItem>
                </>
              )}
            </ul>
          </div>

          <div className="navbar-end gap-4 items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full  transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <IoMdSunny />
                :
                <FaMoon />
              }
            </button>

            {!user ? (
              <div className="hidden lg:flex gap-2">
                <Link className="btn btn-secondary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline btn-accent" to="/register">
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-9 rounded-full">
                      <img
                        src={user.photoURL || "https://i.ibb.co/9H0d0xF/user.png"}
                        alt="user"
                      />
                    </div>
                  </div>
                  <div className="text-sm leading-tight">
                    <div className="font-semibold">{user.displayName || "User"}</div>
                    <div className="opacity-70 text-xs">{user.email}</div>
                  </div>
                </div>

                <button onClick={handleLogout} className="btn btn-secondary ">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}