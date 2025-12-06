// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Card from "../../components/Card/Card";
// import styles from "./Terrarium.module.css";  
// import config from "../../config/apiconfig";
// import Pagination from "../../components/Pagination/Pagination";
// import Accordion from "../../components/Accordion/Accordion";
// import banner5 from "../../assets/images/banner/banner5.jpg";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Terrarium = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Fetch all products
//   useEffect(() => {
//     async function fetchTerrarium() {
//       try {
//         const headers = token
//           ? {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           : { "Content-Type": "application/json" };

//         const response = await axios.get(`${config.BASE_URL}/api/product/all`, { headers });
//         console.log("API Response (Terrarium):", response.data);

//         // Filter only products with productType TERRARIUM
//         const terrariumProducts = response.data.filter(
//           (p) => p.productType?.toString().trim().toLowerCase() === "terrarium"
//         );

//         setProducts(terrariumProducts);
//       } catch (error) {
//         console.error("Error fetching terrarium products:", error);
//         setProducts([]);
//       }
//     }
//     fetchTerrarium();
//   }, [token]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, []);

//   // Pagination logic
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = products.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   useEffect(() => {
//     AOS.init({
//       duration: 500,
//       offset: 100,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   return (
//     <>
//       {/* Banner */}
//       <div className={styles.terrariumBanner} data-aos="fade-up">
//         <img className={styles.terrariumBannerImg} src={banner5} alt="Terrarium Banner" />
//       </div>

//       {/* Breadcrumbs */}
//       <div className={styles.breadcrumb} data-aos="fade-up">
//         <a href="/">Home</a> / <span>Terrarium</span>
//       </div>

//       {/* Heading */}
//       <h1 className={styles.heading} data-aos="zoom-in-up">
//         Terrarium
//       </h1>

//       {/* Products */}
//       <div className={styles.terrariumGrid}>
//         {currentProducts.length > 0 ? (
//           currentProducts.map((product) => (
//             <Card
//               key={product.id}
//               id={product.id}
//               title={product.name}
//               category={product.category}
//               image={product.variants?.[0]?.images?.[0] || ""}
//               price={product.variants?.[0]?.price || 0}
//               discount={product.variants?.[0]?.discountedPrice || 0}
//               onClick={() => navigate(`/product/${product.id}`)}
//             />
//           ))
//         ) : (
//           <p className={styles.noProducts}>No terrarium products found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onNext={() => setCurrentPage((p) => p + 1)}
//           onPrev={() => setCurrentPage((p) => p - 1)}
//         />
//       )}

//       {/* FAQ Accordion */}
//       <div className={styles.accordion_container}>
//         <h2 className={styles.title} data-aos="zoom-in-up">
//           FAQ's
//         </h2>
//         <div className={styles.accordion}>
//           <Accordion
//             title="🌱 What is a Terrarium?"
//             content="A terrarium is a mini ecosystem inside a glass container, perfect for home decor."
//           />
//           <Accordion
//             title="💧 How to take care of Terrariums?"
//             content="Minimal watering is needed! They recycle moisture inside the container."
//           />
//           <Accordion
//             title="🌞 Do Terrariums need sunlight?"
//             content="Yes, but indirect light is best to avoid overheating."
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Terrarium;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import Pagination from "../../components/Pagination/Pagination";
import banner5 from "../../assets/images/banner/banner5.jpg";
import "./TerrariumPage.css"; // <-- add CSS

const TerrariumPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/product/all`)
      .then((res) => res.json())
      .then((data) => {
        const terrariumProducts = data.filter(
          (p) => p.productType?.toUpperCase() === "TERRARIUM"
        );
        setProducts(terrariumProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="terrarium-container">

      {/* Banner */}
      <img src={banner5} alt="Terrarium Banner" className="terrarium-banner" />

      {/* Heading */}
      <h2 className="terrarium-heading">Terrariums</h2>

      {/* Product Grid */}
      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const variant = product.variants[0];
            const image = variant?.images?.[0] || product.terrariumImg;

            return (
              <div
                className="product-card"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <span className="sale-badge">SALE</span>

                {image ? (
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={product.name}
                    className="product-img"
                  />
                ) : (
                  <div className="product-img" style={{ background: "#eee" }}>
                    No Image
                  </div>
                )}

                <h3 className="product-title">{product.name}</h3>

                <div className="price-section">
                  <span className="price-new">₹{variant.discountedPrice}</span>
                  <span className="price-old">₹{variant.price}</span>
                </div>

                <button
                  className="details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  View Details
                </button>
              </div>
            );
          })
        ) : (
          <p>No terrarium products found.</p>
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
    </div>
  );
};

export default TerrariumPage;
