import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { AiFillStar } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import Button from "../Button/Button";
import AOS from "aos";
import "aos/dist/aos.css";

const Card = ({
  id,
  image,
  title,
  category,
  price,
  discount,
  isTrending,
  product,
  selectedVariant, // ✅ Passed from parent
}) => {
  const [quantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) {
      toast.error("Product variant not available.");
      return;
    }

    try {
      await addToCart(product, selectedVariant.id, quantity);
      toast.success(`${product.name} added to cart!`);
      // navigate("/cart"); // ✅ Redirect to cart page
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  

  return (
    <div className={styles.card} data-aos="fade-up" >
      <div className={styles.tagContainer}>
        {discount && (
          <span className={styles.discountTag}>
            {Math.round(((price - discount) / price) * 100)}% Off
          </span>
        )}
        {isTrending && <span className={styles.trendingTag}>Trending</span>}
      </div>

      <div className={styles.imageWrapper}>
        <Link to={`/product/${id}`}>
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={title}
            className={styles.cardImage}
          />
        </Link>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title || "No Title"}</h3>

        <div className={styles.cardDetails}>
          <div className={styles.details}>
            <p>Category: {category || "No Category"}</p>
            <div className={styles.priceContainer}>
              <span className={styles.price}>
                ₹{discount !== undefined ? discount : price || "N/A"}
              </span>
              {discount !== undefined && discount !== null && (
    <span className={styles.originalPrice}>₹{price}</span>
  )}

              {/* {discount && (
                <span className={styles.originalPrice}>₹{price}</span>
              )} */}
            </div>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className={styles.starIcon} />
              ))}
            </div>
          </div>

          <div className={styles.cardIcons}>
            <IoHeartOutline className={styles.iconBtn} />

            <MdAddShoppingCart
              className={styles.iconBtn}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
