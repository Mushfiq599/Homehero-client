import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css"

AOS.init({
  duration: 800,
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);
