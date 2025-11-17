import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
  // AOS Init
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      delay: 0,
      once: true,
    });
  }, []);

  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <section className="flex flex-col min-h-screen" data-aos="fade-up">
      {/* <Navbar /> */}
      {!shouldHideLayout && <Navbar />}
      <main className={
          shouldHideLayout
            ? "flex-grow flex items-center justify-center bg-white" // Center content like login
            : "flex-grow container mx-auto px-6 py-8" // Default page layout
        }>
        <Outlet />
      </main>
      {/* <Footer /> */}
      {!shouldHideLayout && <Footer />}
    </section>
  );
};

export default MainLayout;
