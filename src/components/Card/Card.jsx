// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Card.module.css";
// import { AiFillStar } from "react-icons/ai";
// import { MdAddShoppingCart } from "react-icons/md";
// import { IoHeartOutline } from "react-icons/io5";
// import { toast } from "react-toastify";
// import { useCart } from "../../context/CartContext";
// import Button from "../Button/Button";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Card = ({
//   id,
//   image,
//   title,
//   category,
//   price,
//   discount,
//   isTrending,
//   product,
//   selectedVariant, // ✅ Passed from parent
// }) => {
//   const [quantity] = useState(1);
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const handleAddToCart = async () => {
//     if (!product || !selectedVariant) {
//       toast.error("Product variant not available.");
//       return;
//     }

//     try {
//       await addToCart(product, selectedVariant.id, quantity);
//       toast.success(`${product.name} added to cart!`);
//       // navigate("/cart"); // ✅ Redirect to cart page
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       toast.error("Failed to add product to cart.");
//     }
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);
  

//   return (
//     <div className={styles.card} data-aos="fade-up" >
//       <div className={styles.tagContainer}>
//         {discount && (
//           <span className={styles.discountTag}>
//             {Math.round(((price - discount) / price) * 100)}% Off
//           </span>
//         )}
//         {isTrending && <span className={styles.trendingTag}>Trending</span>}
//       </div>

//       <div className={styles.imageWrapper}>
//   <Link to={`/product/${id}`}>
//    <img
//   src={
//     image
//       ? image.startsWith("data:image")        // already full Base64
//         ? image
//         : image.startsWith("http")            // URL image
//         ? image
//         : `data:image/jpeg;base64,${image}`   // pure Base64
//       : "https://via.placeholder.com/150?text=No+Image"
//   }
//   alt={title}
//   className={styles.cardImage}
// />

//   </Link>
// </div>

//       <div className={styles.cardContent}>
//         <h3 className={styles.cardTitle}>{title || "No Title"}</h3>

//         <div className={styles.cardDetails}>
//           <div className={styles.details}>
//             <p>Category: {category || "No Category"}</p>
//             <div className={styles.priceContainer}>
//               <span className={styles.price}>
//                 ₹{discount !== undefined ? discount : price || "N/A"}
//               </span>
//               {discount !== undefined && discount !== null && (
//     <span className={styles.originalPrice}>₹{price}</span>
//   )}

//               {/* {discount && (
//                 <span className={styles.originalPrice}>₹{price}</span>
//               )} */}
//             </div>
//             <div className={styles.rating}>
//               {[...Array(5)].map((_, i) => (
//                 <AiFillStar key={i} className={styles.starIcon} />
//               ))}
//             </div>
//           </div>

//           <div className={styles.cardIcons}>
//             <IoHeartOutline className={styles.iconBtn} />

//             <MdAddShoppingCart
//               className={styles.iconBtn}
//               onClick={handleAddToCart}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import "./Card.css"

function Card() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/product/all`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 8))) // Show up to 8, grid will adapt
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <section className="featured-section">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h2 className="title">Featured Products</h2>
          {/* Uncomment when you have /products page */}
          {/* <button className="view-all-btn" onClick={() => navigate("/products")}>
            View All →
          </button> */}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.length === 0 ? (
            // Loading Skeleton
            [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* ==================== Product Card Component ==================== */
function ProductCard({ product, navigate }) {
  const variant = product.variants?.[0];
  const image = variant?.images?.[0];

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      {/* Sale Badge */}
      {variant?.discountedPrice < variant?.price && (
        <span className="badge">SALE</span>
      )}

      {/* Image */}
      {image ? (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      ) : (
        <div className="no-image">No Image Available</div>
      )}

      {/* Content */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="price-container">
          <span className="discounted-price">₹{variant?.discountedPrice || variant?.price}</span>
          {variant?.discountedPrice < variant?.price && (
            <span className="original-price">₹{variant?.price}</span>
          )}
        </div>

        <button className="details-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
          View Details
        </button>
      </div>
    </div>
  );
}

/* ==================== Skeleton Loader ==================== */
function ProductSkeleton() {
  return (
    <div className="product-card skeleton">
      <div className="skeleton-image"></div>
      <div className="product-info">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line button"></div>
      </div>
    </div>
  );
}

export default Card;