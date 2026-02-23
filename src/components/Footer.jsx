import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className=" border-t dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-2xl text-gray-900 dark:text-gray-100 grid place-items-center font-black">
                <img src="/assets/maintenance.png" alt="logo" className="w-8 rounded " />
              </div>
              <div className="leading-tight">
                <div className="text-xl font-bold text-teal-600 dark:text-teal-400">
                  HomeHero
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 -mt-0.5">
                  Home services, fast
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 sm:mb-0">
              Trusted professionals for cleaning, plumbing, electrical, and more.
              Book in minutes and get it done right.
            </p>
            <div className="flex items-center gap-3 mt-4 sm:mt-2">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl border text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800 grid place-items-center hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-xl border text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800 grid place-items-center hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-500 transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl border text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800 grid place-items-center hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-500 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl border text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800 grid place-items-center hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-500 transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 tracking-wide mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/services">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/services">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/services">
                  Electrical
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/services">
                  Painting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300 transition" to="/">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 tracking-wide mb-4">
              Get Updates
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Receive service offers and new provider updates.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 border input input-bordered bg-white dark:bg-gray-800 rounded-lg"
              />
              <button className="btn bg-teal-600 hover:bg-teal-700 text-gray-900 dark:text-gray-100 border-none px-6 py-2 rounded-lg mt-2 sm:mt-0">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
          <p>
            © {year} <span className="font-semibold text-slate-900 dark:text-gray-100">HomeHero</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              className="hover:text-teal-700 dark:hover:text-teal-300 transition"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              Support
            </a>
            <a
              className="hover:text-teal-700 dark:hover:text-teal-300 transition"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}