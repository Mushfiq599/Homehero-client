import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axiosPublic from "../api/axiosPublic";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyServices() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageURL: "",
  });

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    axiosPublic
      .get(`/api/services?email=${encodeURIComponent(user.email)}`)
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load my services"))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (id) => {
    const ok = confirm("Delete this service?");
    if (!ok) return;

    try {
      await axiosPublic.delete(`/api/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const openEdit = (s) => {
    setEditing(s);
    setEditData({
      serviceName: s.serviceName,
      category: s.category,
      price: s.price,
      description: s.description,
      imageURL: s.imageURL,
    });
    document.getElementById("edit_modal").showModal();
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.patch(`/api/services/${editing._id}`, {
        ...editData,
        price: Number(editData.price),
      });

      setServices((prev) =>
        prev.map((x) =>
          x._id === editing._id
            ? { ...x, ...editData, price: Number(editData.price) }
            : x
        )
      );

      toast.success("Updated!");
      document.getElementById("edit_modal").close();
      setEditing(null);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">My Services</h1>
      <p className="opacity-70 mt-2">Manage your published services.</p>

      {services.length === 0 ? (
        <div className="mt-10 text-center opacity-70">No services yet.</div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td className="font-medium">{s.serviceName}</td>
                  <td>{s.category}</td>
                  <td className="font-bold text-primary">${s.price}</td>
                  <td className="text-right space-x-2">
                    <button className="btn btn-sm btn-secondary" onClick={() => openEdit(s)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(s._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Service</h3>

          <form onSubmit={saveEdit} className="mt-4 space-y-3">
            <input className="input input-bordered w-full" value={editData.serviceName}
              onChange={(e) => setEditData({ ...editData, serviceName: e.target.value })} placeholder="Service Name" />

            <input className="input input-bordered w-full" value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })} placeholder="Category" />

            <input className="input input-bordered w-full" type="number" value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: e.target.value })} placeholder="Price" />

            <input className="input input-bordered w-full" value={editData.imageURL}
              onChange={(e) => setEditData({ ...editData, imageURL: e.target.value })} placeholder="Image URL" />

            <textarea className="textarea textarea-bordered w-full" value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Description" />

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => document.getElementById("edit_modal").close()}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
