// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../../config/apiconfig";
// import axios from "axios";
// import { Input } from "../../components/Input/Input";
// import Button from "../../components/Button/Button";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "./Checkout.module.css";
// // import { useCart } from "../../context/CartContext";

// const Checkout = () => {
//   // const { cart } = useCart();
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
//   const token = tokenData?.jwtToken;

//   console.log("JWT Token:", token);
//   console.log("Cart in Checkout:", cart);

//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("shipping");

//   useEffect(() => {
//     if (!token) {
//       toast.error("Please log in to proceed to checkout.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       navigate("/login");
//     }
//     // Validate cart on mount
//     if (cart.length === 0) {
//       toast.error("Your cart is empty. Please add items to proceed.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       navigate("/cart");
//     }
//   }, [navigate, token, cart]);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     phoneNumber: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("CASH ON DELIVERY");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePaymentChange = (e) => {
//     const selected = e.target.value;
//     setPaymentMethod(
//       selected === "cod" ? "CASH ON DELIVERY" : "ONLINE PAYMENT"
//     );
//   };

//   const handleShippingSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitted Shipping Data:", { ...formData, paymentMethod });

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/cart/add-shipping`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Shipping Response:", response.data);

//       if (response.status === 200) {
//         toast.success("Shipping saved!", { autoClose: 2000 });
//         setActiveTab("payment");
//       }
//     } catch (error) {
//       console.error("Shipping Error:", {
//         message: error.message,
//         response: error.response
//           ? {
//               status: error.response.status,
//               data: error.response.data,
//             }
//           : null,
//       });
//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please log in again.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         localStorage.removeItem("ecommerce_login");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Shipping failed!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     }
//   };

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting Payment:", { paymentMethod, cart });

//     if (cart.length === 0) {
//       toast.error("Your cart is empty. Please add items to proceed.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       navigate("/cart");
//       return;
//     }

//     if (paymentMethod === "CASH ON DELIVERY") {
//       try {
//         const url = `${config.BASE_URL}/api/checkout?paymentMethod=${paymentMethod}`;
//         console.log("Checkout Request:", { url, headers: { Authorization: `Bearer ${token}` } });

//         const response = await axios.post(
//           url,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("Checkout Response:", response.data);

//         toast.success("Order placed successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         navigate("/order-confirm", { state: { paymentMethod } });
//       } catch (error) {
//         console.error("Payment Error:", {
//           message: error.message,
//           response: error.response
//             ? {
//                 status: error.response.status,
//                 data: error.response.data,
//               }
//             : null,
//         });
//         if (error.response?.status === 401) {
//           toast.error("Session expired. Please log in again.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//           localStorage.removeItem("ecommerce_login");
//           navigate("/login");
//         } else {
//           const message = error.response?.data?.error || "Payment failed!";
//           toast.error(message, {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         }
//       }
//     } else {
//       navigate("/payment-gateway", { state: { paymentMethod } });
//     }
//   };

//   return (
//     <div className={styles.checkoutPage}>
//       <h1 className={styles.pageTitle}>Checkout</h1>

//       <div className={styles.tabButtons}>
//         <button
//           className={activeTab === "shipping" ? styles.activeTab : ""}
//           onClick={() => setActiveTab("shipping")}
//         >
//           Shipping Details
//         </button>
//         <button
//           className={activeTab === "payment" ? styles.activeTab : ""}
//           disabled
//         >
//           Payment Method
//         </button>
//       </div>

//       {activeTab === "shipping" && (
//         <form onSubmit={handleShippingSubmit} className={styles.checkoutForm}>
//           <Input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="text"
//             name="street"
//             placeholder="Street Address"
//             value={formData.street}
//             onChange={handleChange}
//             required
//           />
//           <div className={styles.cityStateZip}>
//             <Input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={formData.state}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className={styles.cityStateZip}>
//             <Input
//               type="text"
//               name="zipCode"
//               placeholder="Zip Code"
//               value={formData.zipCode}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <Input
//             type="text"
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" className={styles.submitButton}>
//             Save & Continue
//           </button>
//         </form>
//       )}

//       {activeTab === "payment" && (
//         <form onSubmit={handlePaymentSubmit} className={styles.checkoutForm}>
//           <div className={styles.paymentOptions}>
//             <label className={styles.paymentOption}>
//               <input
//                 type="radio"
//                 value="cod"
//                 checked={paymentMethod === "CASH ON DELIVERY"}
//                 onChange={handlePaymentChange}
//               />
//               <span>Cash on Delivery</span>
//             </label>
//             <label className={styles.paymentOption}>
//               <input
//                 type="radio"
//                 value="online"
//                 checked={paymentMethod === "ONLINE PAYMENT"}
//                 onChange={handlePaymentChange}
//               />
//               <span>Online Payment</span>
//             </label>
//           </div>

//           <div className={styles.summary}>
//             <h3>Order Summary</h3>
//             <p>
//               Shipping: {formData.street}, {formData.city}, {formData.state}
//             </p>
//             <p>Phone: {formData.phoneNumber}</p>
//             <p>Payment: {paymentMethod}</p>
//           </div>

//           <Button type="submit" className={styles.submitButton}>
//             {paymentMethod === "CASH ON DELIVERY"
//               ? "Place Order"
//               : "Proceed to Payment"}
//           </Button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Checkout;

// // ==================

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import config from "../../config/apiconfig";
// // import axios from "axios";
// // import { Input } from "../../components/Input/Input";
// // import Button from "../../components/Button/Button";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import styles from "./Checkout.module.css";

// // const Checkout = () => {
// //   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
// //   const token = tokenData?.jwtToken;

// //   console.log("JWT Token:", token);

// //   const navigate = useNavigate();

// //   const [activeTab, setActiveTab] = useState("shipping");

// //   useEffect(() => {
// //     if (!token) {
// //       toast.error("Please log in to proceed to checkout.", {
// //         position: "top-right",
// //         autoClose: 3000,
// //       });
// //       navigate("/login");
// //     }
// //   }, [navigate, token]);

// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     street: "",
// //     city: "",
// //     state: "",
// //     zipCode: "",
// //     country: "",
// //     phoneNumber: "",
// //   });

// //   const [paymentMethod, setPaymentMethod] = useState("CASH ON DELIVERY");

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handlePaymentChange = (e) => {
// //     const selected = e.target.value;
// //     setPaymentMethod(
// //       selected === "cod" ? "CASH ON DELIVERY" : "ONLINE PAYMENT"
// //     );
// //   };

// //   const handleShippingSubmit = async (e) => {
// //     e.preventDefault();

// //     console.log("Submitted Shipping Data:", { ...formData, paymentMethod });

// //     try {
// //       const response = await axios.post(
// //         `${config.BASE_URL}/cart/add-shipping`,
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.status === 200) {
// //         toast.success("Shipping saved!", { autoClose: 2000 });
// //         setActiveTab("payment");
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Shipping failed!");
// //       console.error("Shipping Error:", error.response?.data || error.message);
// //     }
// //   };

// //   const handlePaymentSubmit = async (e) => {
// //     e.preventDefault();

// //     if (paymentMethod === "CASH ON DELIVERY") {
// //       try {
// //         const url = `${config.BASE_URL}/api/checkout?paymentMethod=${paymentMethod}`;

// //         const response = await axios.post(
// //           url,
// //           {},
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         toast.success("Order placed successfully!");
// //         navigate("/order-confirm", { state: { paymentMethod } });
// //       } catch (error) {
// //         const message = error.response?.data?.error || "Payment failed!";
// //         toast.error(message);
// //         console.error("Payment Error:", message);
// //       }
// //     } else {
// //       // Redirect to payment gateway
// //       navigate("/payment-gateway", { state: { paymentMethod } });
// //     }
// //   };

// //   return (
// //     <div className={styles.checkoutPage}>
// //       <h1 className={styles.pageTitle}>Checkout</h1>

// //       <div className={styles.tabButtons}>
// //         <button
// //           className={activeTab === "shipping" ? styles.activeTab : ""}
// //           onClick={() => setActiveTab("shipping")}
// //         >
// //           Shipping Details
// //         </button>
// //         <button
// //           className={activeTab === "payment" ? styles.activeTab : ""}
// //           disabled
// //         >
// //           Payment Method
// //         </button>
// //       </div>

// //       {activeTab === "shipping" && (
// //         <form onSubmit={handleShippingSubmit} className={styles.checkoutForm}>
// //           <Input
// //             type="text"
// //             name="fullName"
// //             placeholder="Full Name"
// //             value={formData.fullName}
// //             onChange={handleChange}
// //             required
// //           />
// //           <Input
// //             type="text"
// //             name="street"
// //             placeholder="Street Address"
// //             value={formData.street}
// //             onChange={handleChange}
// //             required
// //           />
// //           <div className={styles.cityStateZip}>
// //             <Input
// //               type="text"
// //               name="city"
// //               placeholder="City"
// //               value={formData.city}
// //               onChange={handleChange}
// //               required
// //             />
// //             <Input
// //               type="text"
// //               name="state"
// //               placeholder="State"
// //               value={formData.state}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <div className={styles.cityStateZip}>
// //             <Input
// //               type="text"
// //               name="zipCode"
// //               placeholder="Zip Code"
// //               value={formData.zipCode}
// //               onChange={handleChange}
// //               required
// //             />
// //             <Input
// //               type="text"
// //               name="country"
// //               placeholder="Country"
// //               value={formData.country}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <Input
// //             type="text"
// //             name="phoneNumber"
// //             placeholder="Phone Number"
// //             value={formData.phoneNumber}
// //             onChange={handleChange}
// //             required
// //           />
// //           <button type="submit" className={styles.submitButton}>
// //             Save & Continue
// //           </button>
// //         </form>
// //       )}

// //       {activeTab === "payment" && (
// //         <form onSubmit={handlePaymentSubmit} className={styles.checkoutForm}>
// //           <div className={styles.paymentOptions}>
// //             <label className={styles.paymentOption}>
// //               <input
// //                 type="radio"
// //                 value="cod"
// //                 checked={paymentMethod === "CASH ON DELIVERY"}
// //                 onChange={handlePaymentChange}
// //               />
// //               <span>Cash on Delivery</span>
// //             </label>
// //             <label className={styles.paymentOption}>
// //               <input
// //                 type="radio"
// //                 value="online"
// //                 checked={paymentMethod === "ONLINE PAYMENT"}
// //                 onChange={handlePaymentChange}
// //               />
// //               <span>Online Payment</span>
// //             </label>
// //           </div>

// //           <div className={styles.summary}>
// //             <h3>Order Summary</h3>
// //             <p>
// //               Shipping: {formData.street}, {formData.city}, {formData.state}
// //             </p>
// //             <p>Phone: {formData.phoneNumber}</p>
// //             <p>Payment: {paymentMethod}</p>
// //           </div>

// //           <Button type="submit" className={styles.submitButton}>
// //             {paymentMethod === "CASH ON DELIVERY"
// //               ? "Place Order"
// //               : "Proceed to Payment"}
// //           </Button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default Checkout;

















// // src/pages/Checkout/Checkout.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../../config/apiconfig";
// import axios from "axios";
// import { Input } from "../../components/Input/Input";
// import Button from "../../components/Button/Button";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "./Checkout.module.css";
// import { useAuth } from "../../context/AuthContext";

// const Checkout = () => {
//   const { user } = useAuth();          // user: undefined (loading) | null (logged out) | object (logged in)
//   const token = user?.token ?? null;
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("shipping");
//   const [cart, setCart] = useState([]);
//   const [loadingCart, setLoadingCart] = useState(true);
//   const [authChecked, setAuthChecked] = useState(false); // ensure we saw auth state at least once

//   // shipping form (optional fields)
//   const [formData, setFormData] = useState({
//     fullName: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     phoneNumber: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("CASH ON DELIVERY");

//   // Fetch cart — only when auth is known and user logged in
//   const fetchCart = async (jwt) => {
//     setLoadingCart(true);
//     try {
//       const response = await axios.get(`${config.BASE_URL}/cart/mycart`, {
//         headers: { Authorization: `Bearer ${jwt}` },
//       });
//       setCart(response.data?.items || []);
//     } catch (err) {
//       console.error("Failed to load cart:", err);
//       toast.error("Failed to load cart!", { autoClose: 2000 });
//       setCart([]);
//     } finally {
//       setLoadingCart(false);
//     }
//   };

//   // Wait for auth to be ready before deciding where to go.
//   useEffect(() => {
//     // Mark that auth was checked at least once
//     setAuthChecked(true);

//     // If user is undefined => auth still initializing; do nothing (wait).
//     if (user === undefined) return;

//     // If user is null (explicitly logged out), go to login (and pass redirect target)
//     if (user === null) {
//       navigate("/login", { state: { redirectTo: "/checkout" } });
//       return;
//     }

//     // user is present -> fetch cart
//     if (token) fetchCart(token);
//   }, [user, token, navigate]);

//   // input changes
//   const handleChange = (e) => {
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value === "cod" ? "CASH ON DELIVERY" : "ONLINE PAYMENT");
//   };

//   // Shipping submit (prevents default)
//   const handleShippingSubmit = async (e) => {
//     e.preventDefault();
//     // Don't proceed if auth still loading
//     if (user === undefined) {
//       toast.info("Please wait...");
//       return;
//     }
//     try {
//       await axios.post(`${config.BASE_URL}/cart/add-shipping`, formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       });
//       toast.success("Shipping saved!", { autoClose: 1200 });
//       setActiveTab("payment");
//     } catch (err) {
//       console.error("Shipping Error:", err);
//       toast.error(err.response?.data?.message || "Shipping failed!");
//     }
//   };

//   // Payment submit (prevents default)
//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     if (user === undefined) {
//       toast.info("Please wait...");
//       return;
//     }
//     if (!token) {
//       // defensive: redirect to login if somehow token vanished
//       navigate("/login", { state: { redirectTo: "/checkout" } });
//       return;
//     }
//     if (cart.length === 0) {
//       toast.error("Your cart is empty!", { autoClose: 2000 });
//       navigate("/cart");
//       return;
//     }

//     try {
//       if (paymentMethod === "CASH ON DELIVERY") {
//         const url = `${config.BASE_URL}/api/checkout?paymentMethod=${paymentMethod}`;
//         await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });

//         toast.success("Order placed!", { autoClose: 1500 });

//         // send back shipping data as orderDetails so OrderConfirm reads it
//         navigate("/order-confirm", { state: { orderDetails: formData, paymentMethod } });
//       } else {
//         navigate("/payment-gateway", { state: { paymentMethod, formData } });
//       }
//     } catch (err) {
//       console.error("Payment Error:", err);
//       toast.error(err.response?.data?.error || "Payment failed!");
//     }
//   };

//   // If auth not yet initialized, render loading or null to avoid flicker/redirect
//   if (!authChecked || user === undefined) {
//     return <div className={styles.checkoutPage}><p>Loading...</p></div>;
//   }

//   // At this point: user is either null (we already navigated away) or present
//   return (
//     <div className={styles.checkoutPage}>
//       <h1 className={styles.pageTitle}>Checkout</h1>

//       <div className={styles.tabButtons}>
//         <button className={activeTab === "shipping" ? styles.activeTab : ""} onClick={() => setActiveTab("shipping")}>Shipping Details</button>
//         <button className={activeTab === "payment" ? styles.activeTab : ""} disabled>Payment Method</button>
//       </div>

//       {/* SHIPPING */}
//       {activeTab === "shipping" && (
//         <form onSubmit={handleShippingSubmit} className={styles.checkoutForm}>
//           <Input type="text" name="fullName" placeholder="Full Name (optional)" value={formData.fullName} onChange={handleChange} />
//           <Input type="text" name="street" placeholder="Street Address (optional)" value={formData.street} onChange={handleChange} />

//           <div className={styles.cityStateZip}>
//             <Input type="text" name="city" placeholder="City (optional)" value={formData.city} onChange={handleChange} />
//             <Input type="text" name="state" placeholder="State (optional)" value={formData.state} onChange={handleChange} />
//           </div>

//           <div className={styles.cityStateZip}>
//             <Input type="text" name="zipCode" placeholder="Zip Code (optional)" value={formData.zipCode} onChange={handleChange} />
//             <Input type="text" name="country" placeholder="Country (optional)" value={formData.country} onChange={handleChange} />
//           </div>

//           <Input type="text" name="phoneNumber" placeholder="Phone Number (optional)" value={formData.phoneNumber} onChange={handleChange} />

//           <button type="submit" className={styles.submitButton}>Save & Continue</button>
//         </form>
//       )}

//       {/* PAYMENT */}
//       {activeTab === "payment" && (
//         <form onSubmit={handlePaymentSubmit} className={styles.checkoutForm}>
//           <div className={styles.paymentOptions}>
//             <label className={styles.paymentOption}>
//               <input type="radio" value="cod" checked={paymentMethod === "CASH ON DELIVERY"} onChange={handlePaymentChange} /> <span>Cash on Delivery</span>
//             </label>
//             <label className={styles.paymentOption}>
//               <input type="radio" value="online" checked={paymentMethod === "ONLINE PAYMENT"} onChange={handlePaymentChange} /> <span>Online Payment</span>
//             </label>
//           </div>

//           <div className={styles.summary}>
//             <h3>Order Summary</h3>
//             <p>Shipping: {formData.street}, {formData.city}, {formData.state}</p>
//             <p>Phone: {formData.phoneNumber}</p>
//             <p>Payment: {paymentMethod}</p>
//           </div>

//           <Button type="submit" className={styles.submitButton}>
//             {paymentMethod === "CASH ON DELIVERY" ? "Place Order" : "Proceed to Payment"}
//           </Button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Checkout;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import { Input } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Checkout.module.css";
import { useAuth } from "../../context/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const token = user?.token;

  const [activeTab, setActiveTab] = useState("shipping");
  const [cart, setCart] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("CASH ON DELIVERY");

  // Fetch cart items and extract shipping address
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${config.BASE_URL}/api/cart/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartData = res.data;
      setCart(cartData.cartItems || []);

      const savedAddress = cartData.shippingAddress;
      if (savedAddress?.id) {
        setAddressId(savedAddress.id);
        setFormData({
          fullName: savedAddress.fullName,
          street: savedAddress.street,
          city: savedAddress.city,
          state: savedAddress.state,
          zipCode: savedAddress.zipCode,
          country: savedAddress.country,
          phoneNumber: savedAddress.phoneNumber,
        });
        setShowForm(false); // hide form initially
      } else {
        setShowForm(true); // show form if no address exists
      }
    } catch (err) {
      console.error("Cart fetch failed:", err);
      toast.error("Failed to load cart");
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!token) {
      navigate("/login", { state: { redirectTo: "/checkout" } });
      return;
    }
    fetchCart();
  }, [loading, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value === "cod" ? "CASH ON DELIVERY" : "ONLINE PAYMENT");
  };

  // Save shipping address
  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login", { state: { redirectTo: "/checkout" } });
      return;
    }

    try {
      const res = await axios.post(`${config.BASE_URL}/api/Address/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const id = res.data?.id;
      if (!id) {
        toast.error("Address not saved. Please try again.");
        return;
      }

      setAddressId(id);
      toast.success("Shipping address saved!");
      setShowForm(false);
      setActiveTab("payment");
    } catch (err) {
      console.error("Shipping error:", err);
      toast.error(err.response?.data?.message || "Failed to save shipping");
    }
  };

  // Place order
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to continue");
      navigate("/login", { state: { redirectTo: "/checkout" } });
      return;
    }

    if (!addressId) {
      toast.error("Please select or save a shipping address first");
      setShowForm(true);
      setActiveTab("shipping");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    const orderPayload = {
      shippingAddressId: addressId,
      paymentMethod,
      items: cart.map((item) => ({
        variantId: item.variantId,
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    if (paymentMethod === "CASH ON DELIVERY") {
      try {
        await axios.post(`${config.BASE_URL}/api/order/place`, orderPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Order placed successfully!");
        navigate("/order-confirm");
      } catch (err) {
        console.error("Order placement error:", err);
        toast.error(err.response?.data?.message || "Failed to place order");
      }
    } else {
      navigate("/payment-gateway", { state: { formData, paymentMethod } });
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      {/* Tabs */}
      <div className={styles.tabButtons}>
        <button
          className={activeTab === "shipping" ? styles.activeTab : ""}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping Details
        </button>
        <button className={activeTab === "payment" ? styles.activeTab : ""} disabled>
          Payment Method
        </button>
      </div>

      {/* Saved Address Selection */}
      {!showForm && addressId && (
        <div className={styles.savedAddressCard}>
          <h3>Shipping Address</h3>
          <p>{formData.fullName}</p>
          <p>{formData.street}, {formData.city}, {formData.state}, {formData.zipCode}, {formData.country}</p>
          <p>Phone: {formData.phoneNumber}</p>
          <div className={styles.addressButtons}>
            <Button onClick={() => setActiveTab("payment")}>Use this address</Button>
            <Button onClick={() => setShowForm(true)}>Change Address</Button>
          </div>
        </div>
      )}

      {/* Shipping Form */}
      {showForm && (
        <form onSubmit={handleShippingSubmit} className={styles.checkoutForm}>
          <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
          <Input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <div className={styles.cityStateZip}>
            <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          </div>
          <div className={styles.cityStateZip}>
            <Input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} />
            <Input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>
          <Input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <button type="submit" className={styles.submitButton}>
            Save & Continue
          </button>
        </form>
      )}

      {/* Payment Form */}
      {activeTab === "payment" && (
        <form onSubmit={handlePaymentSubmit} className={styles.checkoutForm}>
          <div className={styles.paymentOptions}>
            <label>
              <input type="radio" value="cod" checked={paymentMethod === "CASH ON DELIVERY"} onChange={handlePaymentChange} />
              Cash on Delivery
            </label>
            <label>
              <input type="radio" value="online" checked={paymentMethod === "ONLINE PAYMENT"} onChange={handlePaymentChange} />
              Online Payment
            </label>
          </div>

          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <p>Address: {formData.street}, {formData.city}, {formData.state}</p>
            <p>Phone: {formData.phoneNumber}</p>
            <p>Payment: {paymentMethod}</p>
          </div>

          <Button type="submit" className={styles.submitButton}>
            {paymentMethod === "CASH ON DELIVERY" ? "Place Order" : "Proceed to Payment"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
