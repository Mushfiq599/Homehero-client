import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
  const { signIn, googleSignIn, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    const email = document.querySelector('input[name="email"]')?.value?.trim();
    if (!email) return toast.error("Type your email first");
    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
      window.open("https://mail.google.com", "_blank");
    } catch (err) {
      toast.error(err?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="opacity-70 mt-2">Welcome back. Please login to continue.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={handleGoogle} className="btn btn-outline w-full" disabled={loading}>
          Continue with Google
        </button>

        <button type="button" onClick={handleForgot} className="btn btn-ghost w-full">
          Forgot Password
        </button>

        <p className="text-sm opacity-70">
          New here?{" "}
          <Link className="text-primary font-medium" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
