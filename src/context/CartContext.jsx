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



import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import config from "../config/apiconfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedTokenData = localStorage.getItem("ecommerce_login");
    if (storedTokenData) {
      try {
        const tokenData = JSON.parse(storedTokenData);
        if (tokenData?.jwtToken) {
          setIsUserLoggedIn(true);
          setToken(tokenData.jwtToken);
        } else {
          localStorage.removeItem("ecommerce_login");
          setIsUserLoggedIn(false);
          setToken("");
        }
      } catch (error) {
        console.error("Error parsing token data:", error);
        localStorage.removeItem("ecommerce_login");
      }
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!isUserLoggedIn || !token) {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(localCart);
      console.log("Using local cart for guest user:", localCart);
      return;
    }

    try {
      const response = await axios.get(`${config.BASE_URL}/cart/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartData = Array.isArray(response.data.cartItems)
        ? response.data.cartItems.map((item) => {
            console.log("Backend cart item:", item);
            return {
              id: item.id,
              productId: item.productId,
              variantId: item.variantId || null,
              quantity: item.quantity || 1,
              name: item.productName || item.name || "Unnamed Product",
              price:
                item.type === "TERRARIUM"
                  ? item.terrariumPrice
                  : item.price || 0,
              image:
                item.type === "TERRARIUM"
                  ? item.terrariumImg
                  : item.imageUrls?.[0] || "/placeholder.jpg",
              color: item.color || null,
              type: item.type || "OTHER",
            };
          })
        : [];
      setCart(cartData);
      console.log("Normalized cart data:", cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("ecommerce_login");
        setIsUserLoggedIn(false);
        setToken("");
        setCart([]);
        navigate("/login");
      } else {
        toast.error("Failed to fetch cart.", {
          position: "top-right",
          autoClose: 3000,
        });
        setCart([]);
      }
    }
  }, [isUserLoggedIn, token, navigate]);

  useEffect(() => {
    fetchCart();
  }, [isUserLoggedIn, fetchCart]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isUserLoggedIn]);

  const addToCart = async (product, variantId = null, quantity = 1) => {
    const isTerrarium = product.type === "TERRARIUM";
    const newItem = {
      id: product.id,
      productId: product.id,
      variantId: isTerrarium ? null : variantId,
      quantity,
      name: product.name || "Unnamed Product",
      price: isTerrarium
        ? product.terrariumPrice
        : product.variants?.find((v) => v.id === variantId)?.price || 0,
      image: isTerrarium
        ? product.terrariumImg
        : product.variants?.find((v) => v.id === variantId)?.imageUrls?.[0] || "/placeholder.jpg",
      color: isTerrarium
        ? null
        : product.variants?.find((v) => v.id === variantId)?.color || null,
      type: product.type || "OTHER",
    };

    console.log("Adding to cart:", newItem);
    console.log("JWT Token:", token ? token : "No token");

    if (!isUserLoggedIn || !token) {
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(`${newItem.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Update local cart immediately
      setCart((prevCart) => [...prevCart, newItem]);
    
      const params = new URLSearchParams();
      params.append("id", isTerrarium ? product.id : variantId);
      params.append("quantity", quantity);
      params.append("type", newItem.type);
    
      const url = `${config.BASE_URL}/cart/add?${params.toString()}`;
    
      console.log("Sending request to:", url);
    
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      await fetchCart();
      toast.success(`${newItem.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding to cart:", {
        message: error.message,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
      });
    
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("ecommerce_login");
        setIsUserLoggedIn(false);
        setToken("");
        setCart([]);
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to add item to cart.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        await fetchCart(); // Sync with backend cart
      }
    }
    
  };

  const updateQuantity = async (id, change) => {
    const updatedItem = cart.find(
      (item) => item.variantId === id || (item.productId === id && item.type === "TERRARIUM")
    );
    if (!updatedItem) return;

    const newQuantity = updatedItem.quantity + change;
    if (newQuantity < 1) return removeFromCart(id);

    const updatedCart = cart.map((item) =>
      item.variantId === id || (item.productId === id && item.type === "TERRARIUM")
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);

    if (!isUserLoggedIn || !token) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Cart updated!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      if (updatedItem.type === "TERRARIUM") {
        await axios.post(
          `${config.BASE_URL}/cart/update/${updatedItem.productId}?quantity=${newQuantity}`,
          { type: "TERRARIUM" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${config.BASE_URL}/cart/update/${id}?quantity=${newQuantity}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("ecommerce_login");
        setIsUserLoggedIn(false);
        setToken("");
        setCart([]);
        navigate("/login");
      } else {
        toast.error("Failed to update quantity.", {
          position: "top-right",
          autoClose: 3000,
        });
        await fetchCart();
      }
    }
  };

  const removeFromCart = async (id) => {
    const item = cart.find(
      (item) => item.variantId === id || (item.productId === id && item.type === "TERRARIUM")
    );
    if (!item) return;

    if (!isUserLoggedIn) {
      const updatedCart = cart.filter(
        (item) => item.variantId !== id && item.productId !== id
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const updatedCart = cart.filter(
        (item) => item.variantId !== id && item.productId !== id
      );
      setCart(updatedCart);
      if (item.type === "TERRARIUM") {
        await axios.delete(`${config.BASE_URL}/cart/remove/${item.productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.delete(`${config.BASE_URL}/cart/remove/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await fetchCart();
      toast.success("Item removed from cart!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error removing item:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("ecommerce_login");
        setIsUserLoggedIn(false);
        setToken("");
        setCart([]);
        navigate("/login");
      } else {
        toast.error("Failed to remove item.", {
          position: "top-right",
          autoClose: 3000,
        });
        await fetchCart();
      }
    }
  };

  const totalUniqueProducts = cart.length;

  // ✅ Add this method
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cartItems"); // Optional: if you're storing it in localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalUniqueProducts,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart() {
  return useContext(CartContext);
}

export { useCart };