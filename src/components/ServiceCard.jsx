import { Link } from "react-router-dom";

export default function ServiceCard({ s }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-md transition">
      <figure className="h-44">
        <img
          src={s?.imageURL}
          alt={s?.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title text-lg">{s?.title}</h3>

        <div className="flex flex-wrap gap-2 text-sm opacity-75">
          <span className="badge badge-outline">Category: {s?.category}</span>
          <span className="badge badge-outline">Price: ${s?.price}</span>
        </div>

        <p className="text-sm opacity-80 line-clamp-2">{s?.description}</p>

        <div className="card-actions justify-end mt-2">
          <Link to={`/services/${s?._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
