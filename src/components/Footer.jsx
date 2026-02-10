import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t ">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              {/* Logo (you can replace with <img src="/logo.png" />) */}
              <div className="w-10 h-10 rounded-2xl text-white grid place-items-center font-black">
                <img src="/public/maintenance.png" alt="logo" className="w-8 rounded "/>
              </div>
              <div className="leading-tight">
                <div className=" text-xl font-bold text-teal-600">
                  
                  HomeHero
                </div>
                <div className="text-xs text-slate-600 -mt-0.5">
                  Home services, fast
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Trusted professionals for cleaning, plumbing, electrical, and more.
              Book in minutes and get it done right.
            </p>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl border text-teal-600 bg-white grid place-items-center hover:border-teal-600 hover:text-teal-700 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-xl border text-teal-600 bg-white grid place-items-center hover:border-teal-600 hover:text-teal-700 transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl border text-teal-600 bg-white grid place-items-center hover:border-teal-600 hover:text-teal-700 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl border text-teal-600 bg-white grid place-items-center hover:border-teal-600 hover:text-teal-700 transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-teal-600 tracking-wide">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link className="hover:text-teal-700 transition" to="/services">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 transition" to="/services">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 transition" to="/services">
                  Electrical
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 transition" to="/services">
                  Painting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-teal-600 tracking-wide">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link className="hover:text-teal-700 transition" to="/">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 transition" to="/">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 transition" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-teal-700 transition" to="/">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-sm font-bold text-teal-600 tracking-wide">
              Get Updates
            </h3>
            <p className="mt-4 text-sm text-slate-600">
              Receive service offers and new provider updates.
            </p>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered w-full bg-white"
              />
              <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none px-3">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            © {year} <span className="font-semibold text-slate-900">HomeHero</span>. All rights reserved.
          </p>

          <div className="text-sm text-slate-600 flex items-center gap-4">
            <a
              className="hover:text-teal-700 transition"
              href="https://example.com"
              target="_blank"
              rel="noreferrer"
            >
              Support
            </a>
            <a
              className="hover:text-teal-700 transition"
              href="https://example.com"
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

