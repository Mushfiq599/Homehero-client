import { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/api/services?limit=6")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load services"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="w-full">
        <div className="carousel w-full h-[420px] rounded-2xl overflow-hidden">

          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
              className="w-full object-cover"
              alt="Home services"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="max-w-6xl mx-auto px-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Book trusted home services
                </h1>
                <p className="mb-6 max-w-xl">
                  Electricians, plumbers, cleaners and more — all in one place.
                </p>
                <div className="flex gap-3">
                  <a href="/services" className="btn btn-primary">Explore Services</a>
                  <a href="/register" className="btn btn-outline text-white">Get Started</a>
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
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              className="w-full object-cover"
              alt="Professionals"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="max-w-6xl mx-auto px-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Verified professionals
                </h1>
                <p className="mb-6 max-w-xl">
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
              src="https://images.unsplash.com/photo-1597099971277-ec33fd0b89e5"
              className="w-full object-cover"
              alt="Fast booking"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="max-w-6xl mx-auto px-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Fast & hassle-free booking
                </h1>
                <p className="mb-6 max-w-xl">
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
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div data-aos="fade-up">
            <h2 className="text-2xl font-bold">Popular Services</h2>
            <p className="opacity-70 text-sm mt-1">
              Top picks from our marketplace.
            </p>
          </div>
          <Link to="/services" className="btn btn-sm btn-primary">
            Show All
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-aos="fade-up"
            data-aos-delay="150"
          >

            {services.map((s) => (
              <Link
                key={s._id}
                to={`/services/${s._id}`}
                className="card bg-base-100 shadow hover:shadow-lg transition"
                data-aos="zoom-in"
              >
                <figure className="h-44">
                  <img
                    src={s.imageURL}
                    alt={s.serviceName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body" >
                  <h3 className="card-title">{s.serviceName}</h3>
                  <p className="text-sm opacity-70">{s.category}</p>
                  <div className="mt-2 font-bold text-primary">${s.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
