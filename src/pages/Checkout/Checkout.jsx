import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import axios from "axios";
import { Input } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Checkout.module.css";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { cart } = useCart();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
  const token = tokenData?.jwtToken;

  console.log("JWT Token:", token);
  console.log("Cart in Checkout:", cart);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("shipping");

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to proceed to checkout.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    }
    // Validate cart on mount
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/cart");
    }
  }, [navigate, token, cart]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    const selected = e.target.value;
    setPaymentMethod(
      selected === "cod" ? "CASH ON DELIVERY" : "ONLINE PAYMENT"
    );
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted Shipping Data:", { ...formData, paymentMethod });

    try {
      const response = await axios.post(
        `${config.BASE_URL}/cart/add-shipping`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Shipping Response:", response.data);

      if (response.status === 200) {
        toast.success("Shipping saved!", { autoClose: 2000 });
        setActiveTab("payment");
      }
    } catch (error) {
      console.error("Shipping Error:", {
        message: error.message,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
            }
          : null,
      });
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("ecommerce_login");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Shipping failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Payment:", { paymentMethod, cart });

    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/cart");
      return;
    }

    if (paymentMethod === "CASH ON DELIVERY") {
      try {
        const url = `${config.BASE_URL}/api/checkout?paymentMethod=${paymentMethod}`;
        console.log("Checkout Request:", { url, headers: { Authorization: `Bearer ${token}` } });

        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Checkout Response:", response.data);

        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/order-confirm", { state: { paymentMethod } });
      } catch (error) {
        console.error("Payment Error:", {
          message: error.message,
          response: error.response
            ? {
                status: error.response.status,
                data: error.response.data,
              }
            : null,
        });
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          localStorage.removeItem("ecommerce_login");
          navigate("/login");
        } else {
          const message = error.response?.data?.error || "Payment failed!";
          toast.error(message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    } else {
      navigate("/payment-gateway", { state: { paymentMethod } });
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <div className={styles.tabButtons}>
        <button
          className={activeTab === "shipping" ? styles.activeTab : ""}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping Details
        </button>
        <button
          className={activeTab === "payment" ? styles.activeTab : ""}
          disabled
        >
          Payment Method
        </button>
      </div>

      {activeTab === "shipping" && (
        <form onSubmit={handleShippingSubmit} className={styles.checkoutForm}>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <div className={styles.cityStateZip}>
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.cityStateZip}>
            <Input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Save & Continue
          </button>
        </form>
      )}

      {activeTab === "payment" && (
        <form onSubmit={handlePaymentSubmit} className={styles.checkoutForm}>
          <div className={styles.paymentOptions}>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "CASH ON DELIVERY"}
                onChange={handlePaymentChange}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "ONLINE PAYMENT"}
                onChange={handlePaymentChange}
              />
              <span>Online Payment</span>
            </label>
          </div>

          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <p>
              Shipping: {formData.street}, {formData.city}, {formData.state}
            </p>
            <p>Phone: {formData.phoneNumber}</p>
            <p>Payment: {paymentMethod}</p>
          </div>

          <Button type="submit" className={styles.submitButton}>
            {paymentMethod === "CASH ON DELIVERY"
              ? "Place Order"
              : "Proceed to Payment"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Checkout;

// ==================

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../../config/apiconfig";
// import axios from "axios";
// import { Input } from "../../components/Input/Input";
// import Button from "../../components/Button/Button";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "./Checkout.module.css";

// const Checkout = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
//   const token = tokenData?.jwtToken;

//   console.log("JWT Token:", token);

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
//   }, [navigate, token]);

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

//       if (response.status === 200) {
//         toast.success("Shipping saved!", { autoClose: 2000 });
//         setActiveTab("payment");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Shipping failed!");
//       console.error("Shipping Error:", error.response?.data || error.message);
//     }
//   };

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();

//     if (paymentMethod === "CASH ON DELIVERY") {
//       try {
//         const url = `${config.BASE_URL}/api/checkout?paymentMethod=${paymentMethod}`;

//         const response = await axios.post(
//           url,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         toast.success("Order placed successfully!");
//         navigate("/order-confirm", { state: { paymentMethod } });
//       } catch (error) {
//         const message = error.response?.data?.error || "Payment failed!";
//         toast.error(message);
//         console.error("Payment Error:", message);
//       }
//     } else {
//       // Redirect to payment gateway
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
