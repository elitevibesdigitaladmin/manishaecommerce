// import axios from "axios";
// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import config from "../config/apiconfig";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [token, setToken] = useState("");

//   // Check if user is logged in
//   useEffect(() => {
//     const rawTokenData = localStorage.getItem("ecommerce_login");
//     let tokenData;
//     try {
//       tokenData = rawTokenData && rawTokenData !== "undefined" ? JSON.parse(rawTokenData) : null;
//       console.log("Token data from localStorage:", tokenData); // <--- Add this

//       if (tokenData?.jwtToken) {
//         setIsUserLoggedIn(true);
//         setToken(tokenData.jwtToken);
//       }
//     } catch (error) {
//       console.error("Invalid token data in localStorage:", rawTokenData);
//     }
//   }, []);

//   // Fetch cart for logged-in users
//   const fetchCart = useCallback(async () => {
//     if (!isUserLoggedIn) return;
//     try {
//       const response = await axios.get(`${config.BASE_URL}/cart/view`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const cartData = Array.isArray(response.data.cartItems) ? response.data.cartItems : [];
//       setCart(cartData);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCart([]);
//     }
//   }, [isUserLoggedIn, token]);

//   // Load guest cart from localStorage
//   useEffect(() => {
//     if (!isUserLoggedIn) {
//       const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCart(localCart);
//     } else {
//       fetchCart();
//     }
//   }, [isUserLoggedIn, fetchCart]);

//   // Save guest cart to localStorage
//   useEffect(() => {
//     if (!isUserLoggedIn) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, isUserLoggedIn]);

//   // Add item to cart
//   const addToCart = async (product, variantId, quantity = 1) => {
//     if (!isUserLoggedIn) {
//       const newCart = [...cart, { ...product, variantId, quantity }];
//       setCart(newCart);
//       return;
//     }

//     try {
//       setCart((prevCart) => [...prevCart, { ...product, variantId, quantity }]); // Optimistic update
//       await axios.post(
//         `${config.BASE_URL}/cart/addToCart/${variantId}`,
//         { productId: product.id, variantId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart(); // Ensure latest data from API
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       fetchCart(); // Revert state in case of failure
//     }
//   };

//   // Update item quantity in cart
//   const updateQuantity = async (variantId, change) => {
//     const updatedItem = cart.find((item) => item.variantId === variantId);
//     if (!updatedItem) return;
//     const newQuantity = updatedItem.quantity + change;
//     if (newQuantity < 1) return removeFromCart(variantId);

//     if (!isUserLoggedIn) {
//       const updatedCart = cart.map((item) =>
//         item.variantId === variantId ? { ...item, quantity: newQuantity } : item
//       );
//       setCart(updatedCart);
//       return;
//     }

//     try {
//       setCart((prevCart) =>
//         prevCart.map((item) =>
//           item.variantId === variantId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//       await axios.post(
//         `${config.BASE_URL}/cart/add/${variantId}?quantity=${newQuantity}`,
//         null,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       fetchCart(); // Revert state in case of failure
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (variantId) => {
//     if (!isUserLoggedIn) {
//       const updatedCart = cart.filter((item) => item.variantId !== variantId);
//       setCart(updatedCart);
//       return;
//     }

//     try {
//       setCart((prevCart) => prevCart.filter((item) => item.variantId !== variantId)); // Optimistic UI
//       await axios.delete(`${config.BASE_URL}/cart/remove/${variantId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCart();
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       fetchCart(); // Revert state
//     }
//   };

//   // Calculate total unique products in the cart
//   const totalUniqueProducts = cart.length; // Or use reduce to count unique products

//   return (
//     <CartContext.Provider value={{ cart, totalUniqueProducts, addToCart, updateQuantity, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


// import axios from "axios";
// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import config from "../config/apiconfig";
// import {toast} from "react-toastify";  // Assuming you're using react-toastify for notifications

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [token, setToken] = useState("");

//   // Check if the user is logged in and retrieve the token from localStorage
//   useEffect(() => {
//     const storedTokenData = localStorage.getItem("ecommerce_login");
//     if (storedTokenData) {
//       try {
//         const tokenData = JSON.parse(storedTokenData);
//         if (tokenData?.jwtToken) {
//           setIsUserLoggedIn(true);
//           setToken(tokenData.jwtToken);
//           console.log("JWT Token:", tokenData.jwtToken); // Debugging: Check token
//         }
//       } catch (error) {
//         console.error("Error parsing token data in localStorage:", storedTokenData);
//       }
//     }
//   }, []);

//   // Fetch cart for logged-in users
//   const fetchCart = useCallback(async () => {
//     if (!isUserLoggedIn || !token) return;

//     try {
//       const response = await axios.get(`${config.BASE_URL}/cart/view`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const cartData = Array.isArray(response.data.cartItems) ? response.data.cartItems : [];
//       setCart(cartData);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCart([]); // Clear cart in case of error
//     }
//   }, [isUserLoggedIn, token]);

//   // Load guest cart from localStorage or fetch logged-in cart
//   useEffect(() => {
//     if (!isUserLoggedIn) {
//       const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCart(localCart);
//     } else {
//       fetchCart();
//     }
//   }, [isUserLoggedIn, fetchCart]);

//   // Save guest cart to localStorage
//   useEffect(() => {
//     if (!isUserLoggedIn) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, isUserLoggedIn]);

//   // Add item to cart
//   const addToCart = async (product, variantId, quantity = 1) => {
//     const newItem = { ...product, variantId, quantity };
//     if (!isUserLoggedIn) {
//       setCart((prevCart) => [...prevCart, newItem]);
//       return;
//     }

//     try {
//       // Optimistic UI update
//       setCart((prevCart) => [...prevCart, newItem]);
//       await axios.post(
//         `${config.BASE_URL}/cart/addToCart/${variantId}`,
//         { productId: product.id, variantId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart(); // Refresh cart data
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       fetchCart(); // Revert state in case of failure
//     }
//   };

//   // Update item quantity in cart
//   const updateQuantity = async (variantId, change) => {
//     const updatedItem = cart.find((item) => item.variantId === variantId);
//     if (!updatedItem) return;
  
//     const newQuantity = updatedItem.quantity + change;
//     if (newQuantity < 1) return removeFromCart(variantId); // Remove item if quantity is less than 1
  
//     // Optimistic UI update
//     const updatedCart = cart.map((item) =>
//       item.variantId === variantId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart);  // Update cart state immediately
  
//     if (!isUserLoggedIn || !token) {
//       console.error("No token found. User may not be logged in.");
//       toast.error("Please log in to continue.", { position: "top-right", autoClose: 3000 });
//       return;
//     }
  
//     try {
//       // Send the quantity update via query parameter (e.g., quantity=-1)
//       await axios.post(
//         `${config.BASE_URL}/cart/update/${variantId}?quantity=${change}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart(); // Refresh cart data from server
//     } catch (error) {
//       console.error("Error updating quantity:", error.response ? error.response.data : error);
//       fetchCart(); // Revert state in case of failure
//     }
//   };
  

//   // Remove item from cart
//   const removeFromCart = async (variantId) => {
//     if (!isUserLoggedIn) {
//       setCart((prevCart) => prevCart.filter((item) => item.variantId !== variantId));
//       return;
//     }

//     try {
//       // Optimistic UI update
//       setCart((prevCart) => prevCart.filter((item) => item.variantId !== variantId));
//       await axios.delete(`${config.BASE_URL}/cart/remove/${variantId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCart(); // Refresh cart data
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       fetchCart(); // Revert state in case of failure
//     }
//   };

//   // Calculate total unique products in the cart
//   const totalUniqueProducts = cart.length;

//   return (
//     <CartContext.Provider value={{ cart, totalUniqueProducts, addToCart, updateQuantity, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

// ==========================================

// import axios from "axios";
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import config from "../config/apiconfig";
// import { toast } from "react-toastify";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     const storedTokenData = localStorage.getItem("ecommerce_login");
//     if (storedTokenData) {
//       try {
//         const tokenData = JSON.parse(storedTokenData);
//         if (tokenData?.jwtToken) {
//           setIsUserLoggedIn(true);
//           setToken(tokenData.jwtToken);
//         }
//       } catch (error) {
//         console.error("Error parsing token data:", error);
//       }
//     }
//   }, []);

//   const fetchCart = useCallback(async () => {
//     if (!isUserLoggedIn || !token) return;

//     try {
//       const response = await axios.get(`${config.BASE_URL}/cart/view`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const cartData = Array.isArray(response.data.cartItems)
//         ? response.data.cartItems
//         : [];
//       setCart(cartData);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCart([]);
//     }
//   }, [isUserLoggedIn, token]);

//   useEffect(() => {
//     if (!isUserLoggedIn) {
//       const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCart(localCart);
//     } else {
//       fetchCart();
//     }
//   }, [isUserLoggedIn, fetchCart]);

//   useEffect(() => {
//     if (!isUserLoggedIn) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, isUserLoggedIn]);

//   const addToCart = async (product, variantId, quantity = 1) => {
//     const newItem = { ...product, variantId, quantity };
//     if (!isUserLoggedIn) {
//       setCart((prevCart) => [...prevCart, newItem]);
//       return;
//     }

//     try {
//       setCart((prevCart) => [...prevCart, newItem]);
//       await axios.post(
//         `${config.BASE_URL}/cart/addToCart/${variantId}`,
//         { productId: product.id, variantId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       fetchCart();
//     }
//   };

//   const updateQuantity = async (variantId, change) => {
//     const updatedItem = cart.find((item) => item.variantId === variantId);
//     if (!updatedItem) return;

//     const newQuantity = updatedItem.quantity + change;
//     if (newQuantity < 1) return removeFromCart(variantId);

//     const updatedCart = cart.map((item) =>
//       item.variantId === variantId
//         ? { ...item, quantity: newQuantity }
//         : item
//     );
//     setCart(updatedCart);

//     if (!isUserLoggedIn || !token) {
//       toast.error("Please log in to continue.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${config.BASE_URL}/cart/update/${variantId}?quantity=${change}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       fetchCart();
//     }
//   };

//   const removeFromCart = async (variantId) => {
//     if (!isUserLoggedIn) {
//       setCart((prevCart) =>
//         prevCart.filter((item) => item.variantId !== variantId)
//       );
//       return;
//     }

//     try {
//       setCart((prevCart) =>
//         prevCart.filter((item) => item.variantId !== variantId)
//       );
//       await axios.delete(`${config.BASE_URL}/cart/remove/${variantId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCart();
//     } catch (error) {
//       console.error("Error removing item:", error);
//       fetchCart();
//     }
//   };

//   const totalUniqueProducts = cart.length;

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         totalUniqueProducts,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ✅ Define the hook as a named function for Fast Refresh compatibility
// function useCart() {
//   return useContext(CartContext);
// }

// export { useCart };





// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import config from "../config/apiconfig";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 🔐 GET TOKEN HELPER
//   const getToken = () => {
//     const token = localStorage.getItem("jwtToken");
//     return token ? JSON.parse(token) : null;
//   };

//   // 📌 FETCH CART ON LOAD
//   const fetchCart = async () => {
//     const token = getToken();
//     if (!token) return; // Not logged in

//     try {
//       const response = await axios.get(
//         `${config.BASE_URL}/api/cart/get`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCart(response.data || []);
//     } catch (err) {
//       console.error("Cart Fetch Error:", err);
//       if (err.response?.status === 401) {
//         toast.error("Login expired. Please log in again.");
//         navigate("/login");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // 🟩 ADD TO CART
//   const addToCart = async (product, variantId, quantity) => {
//     const token = getToken();

//     // 🔐 If not logged in → redirect to login
//     if (!token) {
//       toast.error("Please login to add items");
//       navigate("/login");
//       return;
//     }

//     // 🧩 Build proper payload
//     const payload = {
//       productId: product.id,
//       variantId: variantId || null, // Terrarium → null
//       quantity: quantity ?? 1,
//     };

//     console.log("ADD PAYLOAD:", payload);

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/cart/add`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setCart(response.data);
//       toast.success("Added to cart!");
//       return response.data;
//     } catch (err) {
//       console.error("Add to Cart Error:", err);
//       toast.error("Cannot add item");
//       throw err;
//     }
//   };

//   // 🟦 UPDATE QUANTITY
//   const updateQuantity = async (cartItemId, quantity) => {
//     const token = getToken();

//     try {
//       const response = await axios.put(
//         `${config.BASE_URL}/api/cart/update/${cartItemId}`,
//         { quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCart(response.data);
//     } catch (err) {
//       console.error("Update Error:", err);
//       toast.error("Failed to update quantity");
//     }
//   };

//   // 🟥 REMOVE FROM CART
//   const removeFromCart = async (cartItemId) => {
//     const token = getToken();

//     try {
//       const response = await axios.delete(
//         `${config.BASE_URL}/api/cart/delete/${cartItemId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCart(response.data);
//       toast.success("Item removed");
//     } catch (err) {
//       console.error("Delete Error:", err);
//       toast.error("Failed to remove item");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         loading,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         fetchCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

