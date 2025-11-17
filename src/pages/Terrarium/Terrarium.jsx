import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import styles from "./Terrarium.module.css";  
import config from "../../config/apiconfig";
import Pagination from "../../components/Pagination/Pagination";
import Accordion from "../../components/Accordion/Accordion";
import banner5 from "../../assets/images/banner/banner5.jpg" ;
import AOS from "aos";
import "aos/dist/aos.css";

const Terrarium = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch all Terrarium products
  useEffect(() => {
    async function fetchTerrarium() {
      try {
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, { headers });
        console.log("API Response (Terrarium):", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching terrarium products:", error);
        setProducts([]);
      }
    }
    fetchTerrarium();
  }, [token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Filter only Terrarium products
  // const filteredProducts = products.filter(
  //   (product) => product.category?.toLowerCase() === "terrarium"
  // );

  const filteredProducts = products.filter(
    (product) =>
      product.category?.toLowerCase().includes("terrarium") ||
      product.type?.toLowerCase() === "terrarium"
  );

  
  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      delay: 0,
      once: true,
    });
  }, []);

  return (
    <>
      {/* Banner */}
      <div className={styles.terrariumBanner} data-aos="fade-up">
        <img className={styles.terrariumBannerImg} src={banner5} alt="Terrarium Banner" />
      </div>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumb} data-aos="fade-up">
        <a href="/">Home</a> / <span>Terrarium</span>
      </div>

      {/* Heading */}
      <h1 className={styles.heading} data-aos="zoom-in-up">
        Terrarium
      </h1>

      {/* Products */}
      <div className={styles.terrariumGrid}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              category={product.category}
              image={product.terrariumImg || ""}
              price={product.terrariumPrice || 0}
              discount={product.terrariumPrice}  // You can add discount if needed
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))
        ) : (
          <p className={styles.noProducts}>No terrarium products found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={() => setCurrentPage((p) => p + 1)}
          onPrev={() => setCurrentPage((p) => p - 1)}
        />
      )}

      {/* Accordion */}
      <div className={styles.accordion_container}>
        <h2 className={styles.title} data-aos="zoom-in-up">
          FAQ's
        </h2>
        <div className={styles.accordion}>
          <Accordion
            title="🌱 What is a Terrarium?"
            content="A terrarium is a mini ecosystem inside a glass container, perfect for home decor."
          />
          <Accordion
            title="💧 How to take care of Terrariums?"
            content="Minimal watering is needed! They recycle moisture inside the container."
          />
          <Accordion
            title="🌞 Do Terrariums need sunlight?"
            content="Yes, but indirect light is best to avoid overheating."
          />
        </div>
      </div>
    </>
  );
};

export default Terrarium;
