import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateUserProfile(name, photo);
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="mt-6 card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img src={user.photoURL} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-base-200" />
            )}
            <div>
              <div className="font-semibold">{user?.displayName || "User"}</div>
              <div className="text-sm opacity-70">{user?.email}</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input className="input input-bordered" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" />
          </div>

          <button className="btn btn-primary mt-4" onClick={handleUpdate} disabled={saving}>
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
