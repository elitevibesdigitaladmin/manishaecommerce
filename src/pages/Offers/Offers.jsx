import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Offers.module.css";
import config from "../../config/apiconfig";
import axios from "axios";
import banner1 from "../../assets/images/banner/banner1.jpg";

const Offers = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [offerProducts, setOfferProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const headers = token
          ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/product/all`, { headers });

        const offers = response.data.filter((product) => {
          const variant = product.variants?.[0];
          return variant && variant.discountedPrice < variant.price;
        });

        setOfferProducts(offers);
      } catch (error) {
        console.error("Error fetching products:", error);
        setOfferProducts([]);
      }
    }

    fetchProducts();
  }, [token]);

  return (
    <>
      {/* Banner */}
      <div className={styles.offerBanner}>
        <img className={styles.offerBannerImg} src={banner1} alt="Offer Banner" />
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <a href="/">Home</a> / <span>Offers</span>
      </div>

      <h1 className={styles.heading}>Offer Products</h1>

      {/* Product Grid */}
      <div className={styles.offerGrid}>
        {offerProducts.length > 0 ? (
          offerProducts.map((product) => {
            const variant = product.variants[0];
            const image = variant?.images?.[0] || product.terrariumImg;

            return (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <span className={styles.saleBadge}>SALE</span>

                {image ? (
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={product.name}
                    className={styles.productImg}
                  />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}

                <h3 className={styles.productTitle}>{product.name}</h3>

                <div className={styles.priceBox}>
                  <span className={styles.discountPrice}>₹{variant.discountedPrice}</span>
                  <span className={styles.originalPrice}>₹{variant.price}</span>
                </div>

                <button
                  className={styles.detailsBtn}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            );
          })
        ) : (
          <p>No products found on offer.</p>
        )}
      </div>
    </>
  );
};

export default Offers;
