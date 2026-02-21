import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";

export default function MainLayout() {
  return (
    <>
      <Header />
      <PageLoader />
      <main className="min-h-[calc(100vh-200px)]  ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

