// import React, { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import styles from "./Cart.module.css";

// const Cart = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//     const [quantity, setQuantity] = useState(1);
  
//   const deliveryFee = 14.0;

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
//     0
//   );
//   const subtotal = totalPrice + deliveryFee - discount;

//   const handleUpdateQuantity = useCallback(
//     (variantId, change) => {
//       updateQuantity(variantId, change);
//     },
//     [updateQuantity]
//   );

//   const handleIncrement = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const handleDecrement = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleRemoveFromCart = useCallback(
//     (variantId) => {
//       removeFromCart(variantId);
//       toast.success("Item removed from cart!", { position: "top-right", autoClose: 3000 });
//     },
//     [removeFromCart]
//   );

//   const handleApplyCoupon = () => {
//     if (couponCode.trim().toLowerCase() === "save10") {
//       setDiscount(10);
//       toast.success("Coupon applied successfully! ₹10 discount added.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       setDiscount(0);
//       toast.error("Invalid coupon code.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   const handleCheckout = () => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
//     if (!tokenData?.jwtToken) {
//       toast.error("Please log in to proceed to checkout.", { position: "top-right", autoClose: 3000 });
//       navigate("/login");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <div className={styles.cartWrapper}>
//         <div className={styles.cartItems}>
//           <table className={styles.cartTable}>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className={styles.emptyCart}>
//                     Your cart is empty.
//                   </td>
//                 </tr>
//               ) : (
//                 cart.map((item) => (
//                   <tr key={item.variantId} className={styles.cartItem}>
//                     <td className={styles.productInfo}>
//                       <img
//                         src={item.imageUrls?.[0] || "/placeholder.jpg"}
//                         alt={item.productName || "Product Image"}
//                         className={styles.cartImage}
//                       />
//                       <div className={styles.productDetails}>
//                         <span className={styles.productName}>{item.productName || "Unnamed Product"}</span>
//                         <span className={styles.productDescription}>Color: {item.color || "N/A"}</span>
//                       </div>
//                     </td>
//                     <td>₹{(item.price || 0).toFixed(2)}</td>
//                     <td>
//                       <div className={styles.quantityControls}>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, -1)}>-</button>
//                     {/* <button onClick={handleDecrement}>-</button> */}
//                         <span>{item.quantity || 1}</span>
//                         {/* <button onClick={handleIncrement}>+</button> */}
//                         <button onClick={() => handleUpdateQuantity(item.variantId, 1)}>+</button>
//                       </div>
//                     </td>
//                     <td>
//                       <RiDeleteBin6Line
//                         onClick={() => handleRemoveFromCart(item.variantId)}
//                         className={styles.removeButton}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className={styles.cartSummary}>
//           <h3>Summary</h3>
//           <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
//           <p>Delivery Fee: ₹{deliveryFee.toFixed(2)}</p>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter coupon code"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//             />
//             <button onClick={handleApplyCoupon}>Apply Coupon</button>
//           </div>
//           <p>Discount: ₹{discount.toFixed(2)}</p>
//           <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
//           <button onClick={handleCheckout} className={styles.checkoutButton}>
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



// import React, { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const Cart = () => {
//   const { cart = [], updateQuantity, removeFromCart } = useCart(); // ✅ Default to an empty array
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const deliveryFee = 14.0;

//   // ✅ Calculate total price safely
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
//     0
//   );
//   const subtotal = totalPrice + deliveryFee - discount;

//   // ✅ Quantity Update Handler
//   const handleUpdateQuantity = useCallback(
//     (variantId, change) => {
//       const item = cart.find((item) => item.variantId === variantId);
//       if (!item) return;

//       const newQuantity = (item.quantity || 0) + change;
//       if (newQuantity < 1) {
//         handleRemoveFromCart(variantId);
//       } else {
//         updateQuantity(variantId, change);
//       }
//     },
//     [cart, updateQuantity]
//   );

//   // ✅ Remove Item from Cart
//   const handleRemoveFromCart = useCallback(
//     (variantId) => {
//       removeFromCart(variantId);
//       toast.success("Item removed from cart!", { position: "top-right", autoClose: 3000 });
//     },
//     [removeFromCart]
//   );

//   // ✅ Apply Coupon Handler
//   const handleApplyCoupon = () => {
//     if (couponCode.trim().toLowerCase() === "save10") {
//       setDiscount(10);
//       toast.success("Coupon applied successfully! ₹10 discount added.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       setDiscount(0);
//       toast.error("Invalid coupon code.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   // ✅ Checkout Handler
//   const handleCheckout = () => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
//     if (!tokenData?.jwtToken) {
//       toast.error("Please log in to proceed to checkout.", { position: "top-right", autoClose: 3000 });
//       navigate("/login");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <div className={styles.cartWrapper}>
//         <div className={styles.cartItems}>
//           <table className={styles.cartTable}>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className={styles.emptyCart}>
//                     Your cart is empty.
//                   </td>
//                 </tr>
//               ) : (
//                 cart.map((item) => (
//                   <tr key={item.variantId} className={styles.cartItem}>
//                     <td className={styles.productInfo}>
//                       <img
//                         src={item.imageUrls?.[0] || "/placeholder.jpg"} // ✅ Fallback for missing images
//                         alt={item.productName || "Product Image"}
//                         className={styles.cartImage}
//                       />
//                       <div className={styles.productDetails}>
//                         <span className={styles.productName}>{item.productName || "Unnamed Product"}</span>
//                         <span className={styles.productDescription}>Color: {item.color || "N/A"}</span>
//                       </div>
//                     </td>
//                     <td>₹{(item.price || 0).toFixed(2)}</td>
//                     <td>
//                       <div className={styles.quantityControls}>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, -1)}>-</button>
//                         <span>{item.quantity || 1}</span>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, 1)}>+</button>
//                       </div>
//                     </td>
//                     <td>
//                       <RiDeleteBin6Line
//                         onClick={() => handleRemoveFromCart(item.variantId)}
//                         className={styles.removeButton}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className={styles.cartSummary}>
//           {/* Coupon Section */}
//           {/* <div className={styles.couponSection}>
//             <h3>Apply Coupon</h3>
//             <p>Using a promo code?</p>
//             <div className={styles.couponInputWrapper}>
//               <input
//                 type="text"
//                 placeholder="Coupon code"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//                 className={styles.couponInput}
//               />
//               <button onClick={handleApplyCoupon} className={styles.applyButton}>
//                 Apply
//               </button>
//             </div>
//           </div> */}

//           {/* Summary Section */}
//           <div className={styles.summarySection}>
//             <h3>Total</h3>
//             <div className={styles.summaryRow}>
//               <span>Total</span>
//               <span>₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Delivery</span>
//               <span>₹{deliveryFee.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Discount</span>
//               <span>-₹{discount.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span className={styles.subtotalLabel}>Subtotal</span>
//               <span className={styles.subtotal}>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <button className={styles.checkoutButton} onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
// ====================================

// import React, { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const Cart = () => {
//   const { cart = [], updateQuantity, removeFromCart } = useCart(); // Default to an empty array
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const deliveryFee = 15.0;

//   // Calculate total price safely
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
//     0
//   );
//   const subtotal = totalPrice + deliveryFee - discount;
  
//   // Calculate total number of items in the cart
//   const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);


//   // Quantity Update Handler
//   const handleUpdateQuantity = useCallback(
//     (variantId, change) => {
//       const item = cart.find((item) => item.variantId === variantId);
//       if (!item) return;

//       const newQuantity = item.quantity + change;
//       if (newQuantity < 1) {
//         handleRemoveFromCart(variantId); // If quantity is less than 1, remove the item
//       } else {
//         updateQuantity(variantId, change); // Use the updateQuantity function from CartContext
//       }
//     },
//     [cart, updateQuantity] // Dependencies
//   );

//   // Remove Item from Cart
//   const handleRemoveFromCart = useCallback(
//     (variantId) => {
//       removeFromCart(variantId); // Use removeFromCart from CartContext
//       toast.success("Item removed from cart!", { position: "top-right", autoClose: 3000 });
//     },
//     [removeFromCart]
//   );

//   // Apply Coupon Handler
//   const handleApplyCoupon = () => {
//     if (!couponCode.trim()) {
//       toast.error("Please enter a coupon code.", { position: "top-right", autoClose: 3000 });
//       return;
//     }
//     if (couponCode.trim().toLowerCase() === "save10") {
//       setDiscount(10);
//       toast.success("Coupon applied successfully! ₹10 discount added.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       setDiscount(0);
//       toast.error("Invalid coupon code.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   // Checkout Handler
//   const handleCheckout = () => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
//     if (!tokenData?.jwtToken) {
//       toast.error("Please log in to proceed to checkout.", { position: "top-right", autoClose: 3000 });
//       navigate("/login");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.title}>My Shopping Cart</h2>
//       <div className={styles.cartWrapper}>
//         <div className={styles.cartItems}>
//           <table className={styles.cartTable}>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className={styles.emptyCart}>
//                     Your cart is empty.
//                   </td>
//                 </tr>
//               ) : (
//                 cart.map((item) => (
//                   <tr key={item.variantId} className={styles.cartItem}>
//                     <td className={styles.productInfo}>
//                       <img
//                         src={item.imageUrls?.[0] || "/placeholder.jpg"} // Fallback for missing images
//                         alt={item.productName || "Product Image"}
//                         className={styles.cartImage}
//                       />
//                       <div className={styles.productDetails}>
//                         <span className={styles.productName}>{item.productName || "Unnamed Product"}</span>
//                         <span className={styles.productDescription}>Color: {item.color || "N/A"}</span>
//                       </div>
//                     </td>
//                     <td>₹{(item.price || 0).toFixed(2)}</td>
//                     <td>
//                       <div className={styles.quantityControls}>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, -1)}>-</button>
//                         <span>{item.quantity || 1}</span>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, 1)}>+</button>
//                       </div>
//                     </td>
//                     <td>
//                       <RiDeleteBin6Line
//                         onClick={() => handleRemoveFromCart(item.variantId)}
//                         className={styles.removeButton}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className={styles.cartSummary}>
//           <div className={styles.summarySection}>
//             <h3>Total</h3>
//             <div className={styles.summaryRow}>
//               <span>Price ({totalItems} items)</span>
//               <span>₹{totalPrice.toFixed(2)} </span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Delivery Charges</span>
//               <span>₹{deliveryFee.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Discount</span>
//               <span>-₹{discount.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span className={styles.subtotalLabel}>Total Amount</span>
//               <span className={styles.subtotal}>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <button className={styles.checkoutButton} onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// =============================

import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const { cart = [], updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const deliveryFee = 15.0;

  console.log("Cart data in Cart component:", cart); // Debug cart data

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );
  const subtotal = totalPrice + deliveryFee - discount;
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const handleUpdateQuantity = useCallback(
    (id, change) => {
      const item = cart.find(
        (item) => item.variantId === id || (item.productId === id && item.type === "TERRARIUM")
      );
      if (!item) {
        console.warn(`Item with ID ${id} not found in cart`);
        return;
      }

      const newQuantity = item.quantity + change;
      if (newQuantity < 1) {
        handleRemoveFromCart(id);
      } else {
        updateQuantity(id, change);
      }
    },
    [cart, updateQuantity]
  );

  const handleRemoveFromCart = useCallback(
    (id) => {
      removeFromCart(id);
      toast.success("Item removed from cart!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
    [removeFromCart]
  );

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (couponCode.trim().toLowerCase() === "save10") {
      setDiscount(10);
      toast.success("Coupon applied successfully! ₹10 discount added.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCheckout = () => {
    const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
    if (!tokenData?.jwtToken) {
      toast.error("Please log in to proceed to checkout.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>My Shopping Cart</h2>
      <div className={styles.cartWrapper}>
        <div className={styles.cartItems}>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.emptyCart}>
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr
                    key={item.variantId || item.productId}
                    className={styles.cartItem}
                  >
                    <td className={styles.productInfo}>
                      {/* <img
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name || "Product Image"}
                        className={styles.cartImage}
                        onError={(e) => {
                          console.warn(`Failed to load image for ${item.name}: ${item.image}`);
                          e.target.src = "/placeholder.jpg";
                        }}
                      /> */}
                      <img
  src={
    item.image
      ? item.image
      : item.type === "TERRARIUM"
      ? "/images/terrarium-placeholder.jpg" // Make sure this image exists in your public folder
      : "/placeholder.jpg"
  }
  alt={item.name || "Product Image"}
  className={styles.cartImage}
  onError={(e) => {
    console.warn(`Image load failed for: ${item.name || 'Unknown'} (${item.image})`);
    e.target.src = "/placeholder.jpg"; // Final fallback
  }}
/>

                      <div className={styles.productDetails}>
                        <span className={styles.productName}>
                          {item.name || "Unnamed Product"}
                        </span>
                        {item.color && (
                          <span className={styles.productDescription}>
                            Color: {item.color}
                          </span>
                        )}
                        {item.type === "TERRARIUM" && (
                          <span className={styles.productDescription}>
                            Type: Terrarium
                          </span>
                        )}
                      </div>
                    </td>
                    <td>₹{(item.price || 0).toFixed(2)}</td>
                    <td>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.variantId || item.productId,
                              -1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.variantId || item.productId,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() =>
                          handleRemoveFromCart(item.variantId || item.productId)
                        }
                        className={styles.removeButton}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.summarySection}>
            <h3>Total</h3>
            <div className={styles.summaryRow}>
              <span>Price ({totalItems} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery Charges</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.subtotalLabel}>Total Amount</span>
              <span className={styles.subtotal}>₹{subtotal.toFixed(2)}</span>
            </div>

            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;