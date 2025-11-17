// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Card from "../../components/Card/Card";
// import styles from "./PotsPlanters.module.css";
// import config from "../../config/apiconfig";
// import Pagination from "../../components/Pagination/Pagination";
// import Accordion from "../../components/Accordion/Accordion";
// import banner2 from "../../assets/images/banner/banner2.jpg";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const PotsPlanters = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   const { category } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//     const headers = token
//       ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
//       : { "Content-Type": "application/json" };

//     axios
//       .get(`${config.BASE_URL}/api/AllProduct`, { headers })
//       .then((res) => setProducts(res.data))
//       .catch(() => setProducts([]));
//   }, []);

//   const filteredProducts = category
//     ? products.filter(
//         (p) => p.category.toLowerCase() === category.toLowerCase()
//       )
//     : products;

//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

//     // AOS Init
//         useEffect(() => {
//           AOS.init({
//             duration: 500,
//             offset: 100,
//             easing: "ease-in-out",
//             delay: 0,
//             once: true,
//           });
//         }, []);

//   return (
//     <>
//       <div className={styles.potsBanner} data-aos="fade-up">
//         <img className={styles.potsBannerImg} src={banner2} alt="Pots Banner" />
//       </div>

//       <div className={styles.breadcrumb} data-aos="fade-up">
//         <a href="/">Home</a> / <span>Pots & Planters</span>
//       </div>
//       <h1 className={styles.heading} data-aos="zoom-in-up">
//         {category ? category.replace("-", " ") : "Pots & Planters"}
//       </h1>



//       <div className={styles.potsGrid}>
//         {currentProducts.length > 0 ? (
//           currentProducts.map((product) => (
//             <Card
//               key={product.id}
//               id={product.id}
//               title={product.name}
//               category={product.category}
//               image={product.variants?.[0]?.imageUrls?.[0] || ""}
//               price={product.variants?.[0]?.price}
//               discount={product.variants?.[0]?.discountedPrice}
//               onClick={() => navigate(`/product/${product.id}`)} // Navigate on click
//             />
//           ))
//         ) : (
//           <p>No products found for this category.</p>
//         )}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
//         onNext={() => setCurrentPage((p) => p + 1)}
//         onPrev={() => setCurrentPage((p) => p - 1)}
//       />

//       {/* Accordian */}
//       <div className={styles.accordion_container}>
//         <h2 className={styles.title} data-aos="zoom-in-up">FAQ's</h2>
//         <div className={styles.accordion}>
//           <Accordion
//             title="🌿 What are the best indoor plants?"
//             content="Some of the best indoor plants are Snake Plant, Pothos, Peace Lily, and ZZ Plant."
//           />
//           <Accordion
//             title="☀️ How much sunlight do plants need?"
//             content="Most plants need at least 4-6 hours of indirect sunlight. Some plants, like succulents, need direct sunlight."
//           />
//           <Accordion
//             title="💧 How often should I water my plants?"
//             content="It depends on the plant type! Most indoor plants need watering once a week, while succulents need less."
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default PotsPlanters;


// ===========================================



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import styles from "./PotsPlanters.module.css";
import config from "../../config/apiconfig";
import Pagination from "../../components/Pagination/Pagination";
import Accordion from "../../components/Accordion/Accordion";
import banner2 from "../../assets/images/banner/banner2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const PotsPlanters = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const { category } = useParams();
  const navigate = useNavigate();
  const [potProduct, setPotProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, { headers });
        console.log("API Response:", response.data);
        setPotProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setPotProduct([]);
      }
    }
    fetchProducts();
  }, [token]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Filter products
  const filteredProducts = category
    ? potProduct.filter((p) =>
        // p.category?.toLowerCase() === category.toLowerCase()
    p.category?.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
      )
    : potProduct.filter((p) =>
        p.category?.toLowerCase().includes("pot") ||
        p.category?.toLowerCase().includes("planter")
      );

    

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Initialize AOS animations
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
      <div className={styles.potsBanner} data-aos="fade-up">
        <img className={styles.potsBannerImg} src={banner2} alt="Pots Banner" />
      </div>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumb} data-aos="fade-up">
        <a href="/">Home</a> / <span>Pots & Planters</span>
      </div>

      {/* <h1 className={styles.heading} data-aos="zoom-in-up">
        {category ? category.replace("-", " ") : "Pots & Planters"}
      </h1> */}

<h1 className={styles.heading} data-aos="zoom-in-up">
  {category
    ? category
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Pots & Planters"}
</h1>


      {/* Products */}
      <div className={styles.potsGrid}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              category={product.category}
              image={product.variants?.[0]?.imageUrls?.[0] || ""}
              price={product.variants?.[0]?.price}
              discount={product.variants?.[0]?.discountedPrice}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))
        ) : (
          <p className={styles.noProducts}>No products found for this category.</p>
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
            title="🌿 What materials are pots made of?"
            content="Pots and planters are made from ceramic, plastic, clay, metal, and eco-friendly materials."
          />
          <Accordion
            title="☀️ Are pots suitable for outdoor use?"
            content="Yes! Choose pots that are weather-resistant and have proper drainage for outdoor spaces."
          />
          <Accordion
            title="💧 Do pots need drainage holes?"
            content="Yes, most plants thrive better in pots with drainage holes to prevent root rot."
          />
        </div>
      </div>
    </>
  );
};

export default PotsPlanters;

