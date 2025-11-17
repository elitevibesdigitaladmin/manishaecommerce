// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
// import axios from "axios";
// import Card from "../../components/Card/Card";
// import styles from "./Plants.module.css";
// import config from "../../config/apiconfig";
// import Accordion from "../../components/Accordion/Accordion";
// import Pagination from "../../components/Pagination/Pagination";
// import banner1 from "../../assets/images/banner/banner1.jpg";
// import video from "../../assets/videos/plant-video.mp4";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Plants = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   const { category } = useParams();
//   const navigate = useNavigate(); // Add this
//   const [plantProduct, setPlantProduct] = useState([]);
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Fetch Plant Products
//   useEffect(() => {
//     async function fetchPlants() {
//       try {
//         // Conditionally set headers based on token availability
//         const headers = token
//           ? {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             }
//           : { "Content-Type": "application/json" };

//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers,
//         });
//         console.log("API Response:", response.data);
//         setPlantProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//         // Optionally, you can handle error if needed
//         setPlantProduct([]);
//       }
//     }
//     fetchPlants();
//   }, [token]);

//   const filteredPlants = category
//     ? plantProduct.filter(
//         (plant) => plant.category.toLowerCase() === category.toLowerCase()
//       )
//     : plantProduct;

//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const plants = filteredPlants.slice(indexOfFirst, indexOfLast);

//   // AOS Init
//   useEffect(() => {
//     AOS.init({
//       duration: 500,
//       offset: 100,
//       easing: "ease-in-out",
//       delay: 0,
//       once: true,
//     });
//   }, []);

//   return (
//     <>
//       {/* Banner */}
//       <div className={styles.plantsBanner} data-aos="fade-up">
//         {/* img */}
//         <img
//           className={styles.plantsBannerImg}
//           src={banner1}
//           alt="Plant Banner"
//         />

//         {/* video */}
//         {/* <video
//           src={video}
//           className={styles.plantsBannerImg}
//           autoPlay
//           muted
//           loop
//           playsInline
//         /> */}

//         {/* Overlay banner content */}
//         {/* <div className={styles.videoOverlayContent}>
//           <h1>Green Gifts</h1>
//           <p>Eco-friendly living starts here 🌿</p>
//         </div> */}
//       </div>

//       {/* Breadcrumbs */}
//       <div className={styles.breadcrumb} data-aos="fade-up">
//         <a href="/">Home</a> / <span>Plants</span>
//       </div>
//       <h1 className={styles.heading} data-aos="zoom-in-up">
//         {category ? category.replace("-", " ") : "All Plants"}
//       </h1>

//       {/* Products */}

//       <div className={styles.plantsGrid}>
//         {plants.length > 0 ? (
//           plants.map((parentPlant) => (
//             <Card
//               key={parentPlant.id}
//               id={parentPlant.id}
//               title={parentPlant.name}
//               category={parentPlant.category}
//               image={parentPlant.variants?.[0]?.imageUrls?.[0] || ""}
//               price={parentPlant.variants?.[0]?.price}
//               discount={parentPlant.variants?.[0]?.discountedPrice}
//               onClick={() => navigate(`/product/${product.id}`)} // Navigate on click
//             />
//           ))
//         ) : (
//           <p>No products found for this category.</p>
//         )}
//       </div>

//       {/* Pagination */}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(filteredPlants.length / productsPerPage)}
//         onNext={() => setCurrentPage((p) => p + 1)}
//         onPrev={() => setCurrentPage((p) => p - 1)}
//       />

//       {/* Accordian */}
//       <div className={styles.accordion_container}>
//         <h2 className={styles.title} data-aos="zoom-in-up">
//           FAQ's
//         </h2>
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

// export default Plants;

// ------------------------------------------------------------------


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import styles from "./Plants.module.css";
import config from "../../config/apiconfig";
import Accordion from "../../components/Accordion/Accordion";
import Pagination from "../../components/Pagination/Pagination";
import banner1 from "../../assets/images/banner/banner1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Plants = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;
  const { category } = useParams();
  const navigate = useNavigate();

  const [plantProduct, setPlantProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch all products
  useEffect(() => {
    async function fetchPlants() {
      try {
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, { headers });
        console.log("API Response:", response.data);
        setPlantProduct(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlantProduct([]);
      }
    }
    fetchPlants();
  }, [token]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Filter products
  // const filteredPlants = category
  //   ? plantProduct.filter((plant) =>
  //       plant.category?.toLowerCase() === category.toLowerCase()
  //     )
  //   : plantProduct.filter((plant) =>
  //       plant.category?.toLowerCase().includes("plant")
  //     );

      const filteredPlants = category
  ? plantProduct.filter((plant) =>
      plant.category?.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
    )
  : plantProduct.filter((plant) =>
      plant.category?.toLowerCase().includes("plant")
    );


  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const plants = filteredPlants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPlants.length / productsPerPage);

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
      <div className={styles.plantsBanner} data-aos="fade-up">
        <img
          className={styles.plantsBannerImg}
          src={banner1}
          alt="Plant Banner"
        />
      </div>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumb} data-aos="fade-up">
        <a href="/">Home</a> / <span>Plants</span>
      </div>

      {/* <h1 className={styles.heading} data-aos="zoom-in-up">
        {category ? category.replace("-", " ") : "All Plants"}
      </h1> */}

      <h1 className={styles.heading} data-aos="zoom-in-up">
  {category
    ? category
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Plants"}
</h1>


      {/* Products */}
      <div className={styles.plantsGrid}>
        {plants.length > 0 ? (
          plants.map((parentPlant) => (
            <Card
              key={parentPlant.id}
              id={parentPlant.id}
              title={parentPlant.name}
              category={parentPlant.category}
              // image={parentPlant.variants?.[0]?.imageUrls?.[0] || ""}
              image={
                parentPlant.variants?.[0]?.imageUrls?.[0] ||
                parentPlant.terrariumImg ||
                "https://via.placeholder.com/150"
              }
              // price={parentPlant.variants?.[0]?.price}
              price={
                parentPlant.variants?.[0]?.price ??
                parentPlant.terrariumPrice ??
                "N/A"
              }
              // discount={parentPlant.variants?.[0]?.discountedPrice}
              discount={
                parentPlant.variants?.[0]?.discountedPrice ??
                (parentPlant.terrariumPrice ? parentPlant.terrariumPrice : null)
              }
              onClick={() => navigate(`/product/${parentPlant.id}`)}
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
            title="🌿 What are the best indoor plants?"
            content="Some of the best indoor plants are Snake Plant, Pothos, Peace Lily, and ZZ Plant."
          />
          <Accordion
            title="☀️ How much sunlight do plants need?"
            content="Most plants need at least 4-6 hours of indirect sunlight. Some plants, like succulents, need direct sunlight."
          />
          <Accordion
            title="💧 How often should I water my plants?"
            content="It depends on the plant type! Most indoor plants need watering once a week, while succulents need less."
          />
        </div>
      </div>
    </>
  );
};

export default Plants;
