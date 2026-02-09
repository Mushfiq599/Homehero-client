import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Register() {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (pw) => {
    if (pw.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const errMsg = validatePassword(password);
    if (errMsg) {
      toast.error(errMsg);
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      toast.success("Account created!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Logged in!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="opacity-70 mt-2">Create your HomeHero account.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" required />
        <input name="photo" type="url" placeholder="Photo URL" className="input input-bordered w-full" required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />

        <div className="join w-full">
          <input
            name="password"
            type={show ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered join-item w-full"
            required
          />
          <button type="button" className="btn join-item" onClick={() => setShow((p) => !p)}>
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <button className="btn btn-primary w-full" disabled={loading} type="submit">
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button type="button" onClick={handleGoogle} className="btn btn-outline w-full" disabled={loading}>
          Continue with Google
        </button>

        <p className="text-sm opacity-70">
          Already have an account?{" "}
          <Link className="text-primary font-medium" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}


