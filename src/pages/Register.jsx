import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-base-100">
      <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-xl border border-base-200 p-6 sm:p-7">
        {/* Title */}
        <p className="text-center text-2xl font-extrabold tracking-tight">
          Create account
        </p>
        <p className="text-center text-xs opacity-70 mt-2">
          Create your first account with HomeHero
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full rounded-full border border-base-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />

          <input
            name="photo"
            type="url"
            placeholder="Photo URL"
            className="w-full rounded-full border border-base-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-base-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />

          {/* Password + toggle */}
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-full border border-base-300 px-4 py-3 pr-24 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <button
                          type="button"
                          onClick={() => setShow((p) => !p)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 pr-3"
                        >
                          {show ? <FaEyeSlash /> : <FaEye />}
                        </button>
          </div>

          {/* Submit */}
          <button
            className="w-full rounded-full py-3 font-semibold text-white bg-teal-600 hover:bg-teal-700 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-4 text-[11px] text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-extrabold underline underline-offset-2 decoration-teal-600 text-teal-700"
          >
            Log in
          </Link>
        </p>

        {/* Social buttons */}
        <div className="mt-6 flex flex-col gap-3">
          

          {/* Google (real) */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full rounded-full py-3 px-4 bg-white border-2 border-gray-400 shadow flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            disabled={loading}
          >
            {/* Google icon */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
