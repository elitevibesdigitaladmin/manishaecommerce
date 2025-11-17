import { useState, useEffect } from "react";
import styles from "./Offers.module.css";
import config from "../../config/apiconfig";
import axios from "axios";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import banner1 from "../../assets/images/banner/banner1.jpg";

const Offers = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers,
        });
        console.log("API Response:", response.data);
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlants([]);
      }
    }
    fetchPlants();
  }, [token]);

  return (
    <>
      {/* Banner */}
      <div className={styles.offerBanner} data-aos="fade-up">
        <img
          className={styles.offerBannerImg}
          src={banner1}
          alt="Plant Banner"
        />
      </div>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumb} data-aos="fade-up">
        <a href="/">Home</a> / <span>Offers</span>
      </div>

    

      <h1 className={styles.heading} data-aos="zoom-in-up">
        Offer Products
      </h1>

      {/* Products */}
      <div className={styles.offerGrid}>
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
          <p className={styles.noProducts}>
            No products found for this category.
          </p>
        )}
      </div>
    </>

    // <div className={styles.offerContainer}>
    //   <h2>Offer Products</h2>

    //   {/* Offer Products */}

    //   <div className={styles.plantsGrid}>
    //     {plants.length > 0 ? (
    //       plants.map((parentPlant) => (
    //         <Card
    //           key={parentPlant.id}
    //           id={parentPlant.id}
    //           title={parentPlant.name}
    //           category={parentPlant.category}
    //           // image={parentPlant.variants?.[0]?.imageUrls?.[0] || ""}
    //           image={
    //             parentPlant.variants?.[0]?.imageUrls?.[0] ||
    //             parentPlant.terrariumImg ||
    //             "https://via.placeholder.com/150"
    //           }
    //           // price={parentPlant.variants?.[0]?.price}
    //           price={
    //             parentPlant.variants?.[0]?.price ??
    //             parentPlant.terrariumPrice ??
    //             "N/A"
    //           }
    //           // discount={parentPlant.variants?.[0]?.discountedPrice}
    //           discount={
    //             parentPlant.variants?.[0]?.discountedPrice ??
    //             (parentPlant.terrariumPrice ? parentPlant.terrariumPrice : null)
    //           }
    //           onClick={() => navigate(`/product/${parentPlant.id}`)}
    //         />
    //       ))
    //     ) : (
    //       <p className={styles.noProducts}>No products found for this category.</p>
    //     )}
    //   </div>
    // </div>
  );
};

export default Offers;
