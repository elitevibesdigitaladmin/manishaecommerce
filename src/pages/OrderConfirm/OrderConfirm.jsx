import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./OrderConfirm.module.css"; // CSS module for styling
import { useCart } from "../../context/CartContext";

const OrderConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();


  // Get order details from the location state (passed from Checkout)
  const orderDetails = location.state?.orderDetails || {};

  // Redirect to home if no order details are found
  useEffect(() => {
    if (!orderDetails || Object.keys(orderDetails).length === 0) {
      navigate("/");
    }
  }, [orderDetails, clearCart, navigate]);

  // Sample order data (replace with actual API response if needed)
  const {
    fullName = "N/A",
    street = "N/A",
    city = "N/A",
    state = "N/A",
    zipCode = "N/A",
    country = "India",
    phoneNumber = "N/A",
    paymentMethod = "cod", // Default value
  } = orderDetails;

  // Convert "cod" to "Cash On Delivery" for display
  const displayPaymentMethod = paymentMethod === "cod" ? "Cash On Delivery" : paymentMethod;

  const handleContinueShopping = () => {
    navigate("/"); // Redirect to homepage or products page
  };

  return (
    <div className={styles.orderConfirmationPage}>
      <h1 className={styles.pageTitle}>Order Confirmation</h1>
      <div className={styles.confirmationContainer}>
        <div className={styles.successMessage}>
          <h2>Thank You for Your Order!</h2>
          <p>Your order has been successfully placed.</p>
        </div>

        {/* Order Details Section */}
        <div className={styles.orderDetails}>
          <h3>Order Details</h3>
          <div className={styles.detailItem}>
            <span className={styles.label}>Full Name:</span>
            <span>{fullName}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Shipping Address:</span>
            <span>{`${street}, ${city}, ${state}, ${zipCode}, ${country}`}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Phone Number:</span>
            <span>{phoneNumber}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Payment Method:</span>
            <span>{displayPaymentMethod}</span> {/* Updated to show full name */}
          </div>
          {/* Add more order details like items, total amount, etc., if available */}
          <div className={styles.detailItem}>
            <span className={styles.label}>Order Status:</span>
            <span>Pending</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            onClick={handleContinueShopping}
            className={styles.continueButton}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;