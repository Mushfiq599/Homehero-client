import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getServices } from "../api/services";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getServices({ limit: 6 });
        if (alive) setServices(data);
      } catch (e) {
        const msg = e?.message || "Failed to load services";
        if (alive) {
          setErr(msg);
          toast.error(msg); // one toast only
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ✅ HERO CAROUSEL */}
      <div className="carousel w-full h-[420px] rounded-2xl overflow-hidden">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=60"
            className="w-full object-cover"
            alt="Home services"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book trusted home services
              </h1>
              <p className="mb-6 max-w-xl opacity-90">
                Electricians, plumbers, cleaners and more — all in one place.
              </p>
              <div className="flex gap-3">
                <Link to="/services" className="btn btn-primary">
                  Explore Services
                </Link>
                <Link to="/register" className="btn btn-outline text-white">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 bottom-5 flex justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=60"
            className="w-full object-cover"
            alt="Professionals"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Verified professionals
              </h1>
              <p className="mb-6 max-w-xl opacity-90">
                Skilled experts with ratings and reviews you can trust.
              </p>
            </div>
          </div>
          <div className="absolute left-5 right-5 bottom-5 flex justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1597099971277-ec33fd0b89e5?auto=format&fit=crop&w=1600&q=60"
            className="w-full object-cover"
            alt="Fast booking"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fast & hassle-free booking
              </h1>
              <p className="mb-6 max-w-xl opacity-90">
                Book services in minutes from your home.
              </p>
            </div>
          </div>
          <div className="absolute left-5 right-5 bottom-5 flex justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      {/* ✅ POPULAR SERVICES */}
      <section className="mt-12" data-aos="fade-up">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-extrabold">Popular Services</h2>
            <p className="opacity-70 text-sm mt-1">
              Top picks from our marketplace.
            </p>
          </div>
          <Link to="/services" className="btn btn-outline btn-sm">
            Show All
          </Link>
        </div>

        {loading && <LoadingSpinner label="Loading services..." />}
        {err && !loading && <ErrorState message={err} />}

        {!loading && !err && (
          <div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {services.map((s) => (
              <ServiceCard key={s._id} s={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
