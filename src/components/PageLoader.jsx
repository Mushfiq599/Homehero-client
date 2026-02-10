import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageLoader() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 350); // small smooth load
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/20 backdrop-blur-sm">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}
