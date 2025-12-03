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

function Card() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/product/all`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3)))   // <<< SHOW ONLY 3
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Featured Products</h2>
        <button style={styles.viewAllBtn} onClick={() => navigate("/products")}>
          View All →
        </button>
      </div>

      {/* Product Grid */}
      <div style={styles.grid}>
        {products.map((product) => {
          const variant = product.variants[0]; // first variant
          const image = variant?.images?.[0];

          return (
            <div key={product.id} style={styles.card}>

              {/* Sale Badge */}
              <span style={styles.badge}>SALE</span>

              {/* Product Image */}
              {image ? (
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt={product.name}
                  style={styles.image}
                />
              ) : (
                <div style={styles.noImage}>No Image</div>
              )}

              <h3 style={styles.productName}>{product.name}</h3>

              {/* Price */}
              <div style={styles.priceBox}>
                <span style={styles.discountedPrice}>
                  ₹{variant.discountedPrice}
                </span>

                <span style={styles.originalPrice}>
                  ₹{variant.price}
                </span>
              </div>

              {/* Buttons */}
              <button
                style={styles.detailsBtn}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- STYLES -------------------- */

const styles = {
  container: {
    padding: "40px 60px",
    background: "#f8f9fa",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
  },
  viewAllBtn: {
    padding: "10px 18px",
    background: "#0d6efd",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",   // <<< Show in 3 columns
    gap: "25px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#ff3f3f",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  noImage: {
    width: "100%",
    height: "220px",
    background: "#eee",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#777",
    marginBottom: "10px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "10px",
  },
  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  discountedPrice: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#198754",
  },
  originalPrice: {
    fontSize: "15px",
    textDecoration: "line-through",
    color: "#777",
  },
  detailsBtn: {
    width: "100%",
    padding: "10px",
    background: "#ffc107",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default Card;
