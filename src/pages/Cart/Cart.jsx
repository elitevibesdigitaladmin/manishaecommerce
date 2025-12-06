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

// import React, { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const Cart = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const deliveryFee = 15;

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
//     0
//   );

//   const totalItems = cart.reduce(
//     (acc, item) => acc + (item.quantity || 0),
//     0
//   );

//   const subtotal = totalPrice + deliveryFee - discount;

//   // 🔥 Quantity update logic
//   const handleUpdateQuantity = useCallback(
//     (id, change) => {
//       const item = cart.find(
//         (i) =>
//           i.variantId === id ||
//           (i.productId === id && i.type === "TERRARIUM")
//       );

//       if (!item) return;

//       const newQty = item.quantity + change;

//       if (newQty < 1) {
//         handleRemoveFromCart(id);
//         return;
//       }

//       updateQuantity(id, change);
//     },
//     [cart, updateQuantity]
//   );

//   // 🔥 Remove item
//   const handleRemoveFromCart = useCallback(
//     (id) => {
//       removeFromCart(id);
//       toast.success("Item removed from cart");
//     },
//     [removeFromCart]
//   );

//   // 🔥 Coupon
//   const handleApplyCoupon = () => {
//     if (!couponCode.trim()) {
//       toast.error("Enter coupon code");
//       return;
//     }

//     if (couponCode.trim().toLowerCase() === "save10") {
//       setDiscount(10);
//       toast.success("Coupon applied (₹10 off)");
//     } else {
//       toast.error("Invalid coupon");
//       setDiscount(0);
//     }
//   };

//   // 🔐 CHECK JWT BEFORE CHECKOUT
//   const handleCheckout = () => {
//     const jwt = localStorage.getItem("jwtToken");

//     if (!jwt) {
//       toast.error("Please log in first");
//       navigate("/login", { state: { redirectTo: "/checkout" } });
//       return;
//     }

//     navigate("/checkout");
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.title}>My Shopping Cart</h2>

//       <div className={styles.cartWrapper}>
//         {/* LEFT SIDE - ITEMS */}
//         <div className={styles.cartItems}>
//           <table className={styles.cartTable}>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Qty</th>
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
//                   <tr key={item.variantId || item.productId}>
//                     <td className={styles.productInfo}>
//                       <img
//                         src={
//                           item.image
//                             ? item.image.startsWith("http")
//                               ? item.image
//                               : `data:image/jpeg;base64,${item.image}`
//                             : "/placeholder.jpg"
//                         }
//                         alt={item.name}
//                         className={styles.cartImage}
//                       />

//                       <div className={styles.productDetails}>
//                         <span className={styles.productName}>
//                           {item.name}
//                         </span>

//                         {item.color && (
//                           <span className={styles.productDescription}>
//                             Color: {item.color}
//                           </span>
//                         )}

//                         {item.type === "TERRARIUM" && (
//                           <span className={styles.productDescription}>
//                             Type: Terrarium
//                           </span>
//                         )}
//                       </div>
//                     </td>

//                     <td>₹{item.price.toFixed(2)}</td>

//                     <td>
//                       <div className={styles.quantityControls}>
//                         <button
//                           onClick={() =>
//                             handleUpdateQuantity(
//                               item.variantId || item.productId,
//                               -1
//                             )
//                           }
//                         >
//                           -
//                         </button>

//                         <span>{item.quantity}</span>

//                         <button
//                           onClick={() =>
//                             handleUpdateQuantity(
//                               item.variantId || item.productId,
//                               1
//                             )
//                           }
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>

//                     <td>
//                       <RiDeleteBin6Line
//                         onClick={() =>
//                           handleRemoveFromCart(
//                             item.variantId || item.productId
//                           )
//                         }
//                         className={styles.removeButton}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* RIGHT SIDE - SUMMARY */}
//         <div className={styles.cartSummary}>
//           <h3>Cart Summary</h3>

//           <div className={styles.summaryRow}>
//             <span>Items ({totalItems})</span>
//             <span>₹{totalPrice.toFixed(2)}</span>
//           </div>

//           <div className={styles.summaryRow}>
//             <span>Delivery Charges</span>
//             <span>₹{deliveryFee}</span>
//           </div>

//           <div className={styles.summaryRow}>
//             <span>Discount</span>
//             <span>- ₹{discount}</span>
//           </div>

//           <div className={styles.summaryRow}>
//             <strong>Total Amount</strong>
//             <strong>₹{subtotal.toFixed(2)}</strong>
//           </div>

//           <button className={styles.checkoutButton} onClick={handleCheckout}>
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import styles from "./Cart.module.css";
// import config from "../../config/apiconfig";
// import { useAuth } from "../../context/AuthContext";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth(); 

//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch cart items
//   const fetchCart = async () => {
//     if (!user?.token) {
//       setCart([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await axios.get(`${config.BASE_URL}/api/cart/view`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setCart(res.data.cartItems || []);
//     } catch (err) {
//       console.error("Fetch cart error:", err);
//       toast.error("Failed to load cart");
//       setCart([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [user?.token]);

//   // Update quantity (increment or decrement)
//   const updateQuantity = async (variantId, increment) => {
//     if (!user?.token) return;

//     try {
//       await axios.post(
//         `${config.BASE_URL}/api/cart/updateQuantity`,
//         null, // body not required
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//           params: { variantId, quantity: increment }, // send +1 or -1
//         }
//       );
//       fetchCart(); // refresh cart after update
//     } catch (err) {
//       console.error("Update qty error:", err);
//       toast.error(err.response?.data?.message || "Error updating quantity");
//     }
//   };

//   // Remove item
//   const removeItem = async (variantId) => {
//     if (!user?.token) return;

//     try {
//       await axios.delete(`${config.BASE_URL}/api/cart/remove`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//         params: { variantId },
//       });
//       toast.success("Item removed");
//       fetchCart();
//     } catch (err) {
//       console.error("Remove item error:", err);
//       toast.error(err.response?.data?.message || "Failed to remove item");
//     }
//   };

//   // Checkout
//   const checkout = () => {
//     if (!user?.token) return navigate("/login", { state: { redirectTo: "/checkout" } });
//     navigate("/checkout");
//   };

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   if (loading) return <p>Loading cart...</p>;

//   return (
//     <div className={styles.cartContainer}>
//       <h2 className={styles.title}>My Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <table className={styles.cartTable}>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Remove</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.map((item) => (
//               <tr key={item.variantId}>
//                 <td className={styles.productInfo}>
//                   <img
//                     src={
//                       item.images?.[0]?.startsWith("http")
//                         ? item.images[0]
//                         : `data:image/jpeg;base64,${item.images[0]}`
//                     }
//                     alt={item.productName}
//                     className={styles.cartImage}
//                   />
//                   <span>{item.productName}</span>
//                 </td>
//                 <td>₹{item.price}</td>
//                 <td>
//                   <button onClick={() => updateQuantity(item.variantId, -1)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item.variantId, +1)}>+</button>
//                 </td>
//                 <td>
//                   <RiDeleteBin6Line
//                     onClick={() => removeItem(item.variantId)}
//                     className={styles.removeButton}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className={styles.summaryBox}>
//         <h3>Total: ₹{total}</h3>
//         <button className={styles.checkoutButton} onClick={() => checkout()}>
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;




















import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Cart.module.css";
import config from "../../config/apiconfig";
import { useAuth } from "../../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const token = user?.token;

  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // Fetch cart items
  const fetchCart = async () => {
    if (!token) {
      setCart([]);
      setLoadingCart(false);
      return;
    }

    try {
      const res = await axios.get(`${config.BASE_URL}/api/cart/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cartItems || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Failed to load cart");
      setCart([]);
    }
    setLoadingCart(false);
  };

  useEffect(() => {
    if (!loading) fetchCart();
  }, [token, loading]);

  const updateQuantity = async (variantId, increment) => {
    if (!token) return;

    try {
      await axios.post(
        `${config.BASE_URL}/api/cart/updateQuantity`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { variantId, quantity: increment },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Update qty error:", err);
      toast.error(err.response?.data?.message || "Error updating quantity");
    }
  };

  const removeItem = async (variantId) => {
    if (!token) return;

    try {
      await axios.delete(`${config.BASE_URL}/api/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { variantId },
      });
      toast.success("Item removed");
      fetchCart();
    } catch (err) {
      console.error("Remove item error:", err);
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };

  const checkout = () => {
    if (!token) {
      navigate("/login", { state: { redirectTo: "/checkout" } });
      return;
    }

    navigate("/checkout");
  };

  const total = cart.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);

  if (loadingCart) return <p>Loading cart...</p>;

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>My Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.variantId}>
                <td className={styles.productInfo}>
                  <img
                    src={
                      item.images?.[0]?.startsWith("http")
                        ? item.images[0]
                        : `data:image/jpeg;base64,${item.images[0]}`
                    }
                    alt={item.productName}
                    className={styles.cartImage}
                  />
                  <span>{item.productName}</span>
                </td>
                <td>₹{item.discountedPrice}</td>
                <td>
                  <button onClick={() => updateQuantity(item.variantId, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.variantId, +1)}>+</button>
                </td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => removeItem(item.variantId)}
                    className={styles.removeButton}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.summaryBox}>
        <h3>Total: ₹{total}</h3>
        <button className={styles.checkoutButton} onClick={checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
