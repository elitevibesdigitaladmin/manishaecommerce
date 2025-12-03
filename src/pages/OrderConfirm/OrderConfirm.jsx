// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import styles from "./OrderConfirm.module.css"; // CSS module for styling
// import { useCart } from "../../context/CartContext";

// const OrderConfirm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { clearCart } = useCart();


//   // Get order details from the location state (passed from Checkout)
//   const orderDetails = location.state?.orderDetails || {};

//   // Redirect to home if no order details are found
//   useEffect(() => {
//     if (!orderDetails || Object.keys(orderDetails).length === 0) {
//       navigate("/");
//     }
//   }, [orderDetails, clearCart, navigate]);

//   // Sample order data (replace with actual API response if needed)
//   const {
//     fullName = "N/A",
//     street = "N/A",
//     city = "N/A",
//     state = "N/A",
//     zipCode = "N/A",
//     country = "India",
//     phoneNumber = "N/A",
//     paymentMethod = "cod", // Default value
//   } = orderDetails;

//   // Convert "cod" to "Cash On Delivery" for display
//   const displayPaymentMethod = paymentMethod === "cod" ? "Cash On Delivery" : paymentMethod;

//   const handleContinueShopping = () => {
//     navigate("/"); // Redirect to homepage or products page
//   };

//   return (
//     <div className={styles.orderConfirmationPage}>
//       <h1 className={styles.pageTitle}>Order Confirmation</h1>
//       <div className={styles.confirmationContainer}>
//         <div className={styles.successMessage}>
//           <h2>Thank You for Your Order!</h2>
//           <p>Your order has been successfully placed.</p>
//         </div>

//         {/* Order Details Section */}
//         <div className={styles.orderDetails}>
//           <h3>Order Details</h3>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Full Name:</span>
//             <span>{fullName}</span>
//           </div>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Shipping Address:</span>
//             <span>{`${street}, ${city}, ${state}, ${zipCode}, ${country}`}</span>
//           </div>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Phone Number:</span>
//             <span>{phoneNumber}</span>
//           </div>
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Payment Method:</span>
//             <span>{displayPaymentMethod}</span> {/* Updated to show full name */}
//           </div>
//           {/* Add more order details like items, total amount, etc., if available */}
//           <div className={styles.detailItem}>
//             <span className={styles.label}>Order Status:</span>
//             <span>Pending</span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className={styles.actions}>
//           <button
//             onClick={handleContinueShopping}
//             className={styles.continueButton}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirm;









// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import styles from "./OrderConfirm.module.css";

// const OrderConfirm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get order details passed from Checkout
//   const orderDetails = location.state?.orderDetails || {};

//   // Redirect to home if no order details
//   useEffect(() => {
//     if (!orderDetails || Object.keys(orderDetails).length === 0) {
//       navigate("/");
//     }
//   }, [orderDetails, navigate]);

//   // Extract order fields safely
//   const {
//     fullName = "N/A",
//     street = "N/A",
//     city = "N/A",
//     state = "N/A",
//     zipCode = "N/A",
//     country = "India",
//     phoneNumber = "N/A",
//     paymentMethod = "cod",
//   } = orderDetails;

//   const displayPaymentMethod =
//     paymentMethod === "cod" ? "Cash On Delivery" : paymentMethod;

//   const handleContinueShopping = () => {
//     navigate("/");
//   };

//   return (
//     <div className={styles.orderConfirmationPage}>
//       <h1 className={styles.pageTitle}>Order Confirmation</h1>

//       <div className={styles.confirmationContainer}>
//         <div className={styles.successMessage}>
//           <h2>Thank You for Your Order!</h2>
//           <p>Your order has been successfully placed.</p>
//         </div>

//         <div className={styles.orderDetails}>
//           <h3>Order Details</h3>

//           <div className={styles.detailItem}>
//             <span className={styles.label}>Full Name:</span>
//             <span>{fullName}</span>
//           </div>

//           <div className={styles.detailItem}>
//             <span className={styles.label}>Shipping Address:</span>
//             <span>{`${street}, ${city}, ${state}, ${zipCode}, ${country}`}</span>
//           </div>

//           <div className={styles.detailItem}>
//             <span className={styles.label}>Phone Number:</span>
//             <span>{phoneNumber}</span>
//           </div>

//           <div className={styles.detailItem}>
//             <span className={styles.label}>Payment Method:</span>
//             <span>{displayPaymentMethod}</span>
//           </div>

//           <div className={styles.detailItem}>
//             <span className={styles.label}>Order Status:</span>
//             <span>Pending</span>
//           </div>
//         </div>

//         <div className={styles.actions}>
//           <button
//             onClick={handleContinueShopping}
//             className={styles.continueButton}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirm;


import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config/apiconfig";
import { useAuth } from "../../context/AuthContext";
import styles from "./OrderConfirm.module.css";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const token = user?.token;

  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!token) {
      toast.error("Please login to view your order");
      navigate("/login");
      return;
    }

    const fetchLatestOrder = async () => {
      try {
        let orderIdFromState = location.state?.orderId;

        if (orderIdFromState) {
          // If we have the newly placed order ID from navigation, fetch it directly
          const res = await axios.get(`${config.BASE_URL}/api/order/${orderIdFromState}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrder(res.data);
        } else {
          // Otherwise, fetch all my-orders and pick the latest
          const res = await axios.get(`${config.BASE_URL}/api/order/my-orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const orders = res.data || [];
          if (orders.length === 0) {
            toast.info("No orders found");
            navigate("/");
            return;
          }
          orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrder(orders[0]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error(err.response?.data?.message || "Failed to fetch order");
        navigate("/");
      } finally {
        setLoadingOrder(false);
      }
    };

    fetchLatestOrder();
  }, [loading, token, navigate, location.state]);

  if (loadingOrder) return <p className={styles.loading}>Loading order...</p>;
  if (!order) return null;

  const { shippingAddress = {}, paymentMethod, orderItems = [], totalAmount, status, createdAt, orderId } = order;
  const {
    fullName = "N/A",
    street = "N/A",
    city = "N/A",
    state: st = "N/A",
    zipCode = "N/A",
    country = "India",
    phoneNumber = "N/A",
  } = shippingAddress;

  const handleContinue = () => navigate("/");

  return (
    <div className={styles.orderConfirmationPage}>
      <h1 className={styles.pageTitle}>Order Confirmation</h1>
      <div className={styles.confirmationContainer}>
        <div className={styles.successMessage}>
          <h2>Thank You for Your Order!</h2>
          <p>Your order has been successfully placed.</p>
        </div>

        <div className={styles.orderDetails}>
          <h3>Order Summary</h3>
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Placed On:</strong> {new Date(createdAt).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>

          <h3>Shipping Details</h3>
          <p><strong>Full Name:</strong> {fullName}</p>
          <p><strong>Address:</strong> {`${street}, ${city}, ${st}, ${zipCode}, ${country}`}</p>
          <p><strong>Phone:</strong> {phoneNumber}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>

          <h3>Order Items</h3>
          {orderItems.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <p><strong>Product ID:</strong> {item.productId}</p>
              <p><strong>Variant ID:</strong> {item.variantId}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Size:</strong> {item.size}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Discounted Price:</strong> ₹{item.discountedPrice}</p>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button onClick={handleContinue} className={styles.continueButton}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
