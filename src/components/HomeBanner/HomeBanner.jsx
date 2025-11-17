import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./HomeBanner.module.css"; // Create a separate CSS module for styling

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  // const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
  // ✅ Improved Token Handling
  const rawTokenData = localStorage.getItem("ecommerce_login");
  let tokenData;
  try {
    tokenData = rawTokenData && rawTokenData !== "undefined"
      ? JSON.parse(rawTokenData)
      : null;
  } catch (error) {
    console.error("Invalid token data in localStorage:", rawTokenData);
    tokenData = null;
  }

  const token = tokenData?.jwtToken || ""; // Ensure token is always defined
  console.log("Token in HomeBanner:", token); // For debugging

  useEffect(() => {
    async function getAllBanners() {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
          headers: {
            Authorization: `Bearer ${tokenData}`,
            "Content-Type": "application/json",
          },
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          const bannerUrls = response.data
            .map((banner) => banner.url)
            .filter(Boolean); // Ensure no null values
          setBanners(bannerUrls);
        } else {
          console.warn("No banners found.");
          setBanners([]);
        }
      } catch (error) {
        console.error("Error fetching banners:", error.response?.data || error.message);
        setBanners([]);
      }
    }
    getAllBanners();
  }, [tokenData]);

  if (!banners.length) {
    return <div className={styles.noBanner}>No banners available at the moment.</div>;
  }

  return (
    <div className={styles.bannerWrapper}>
      {banners.map((banner, index) => (
        <img key={index} src={banner} alt={`Banner ${index + 1}`} className={styles.bannerImage} />
      ))}
    </div>
  );
};

export default HomeBanner;
