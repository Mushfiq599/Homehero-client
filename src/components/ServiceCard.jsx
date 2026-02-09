export default function ServiceCard({ service }) {
  return (
    <div className="card">
      <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold">{service.name}</h3>
        <p>${service.price}</p>
        <p>{service.category}</p>
        <Link to={`/services/${service._id}`} className="btn btn-primary mt-4">Details</Link>
      </div>
    </div>
  );
}