import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./MyOrders.module.css";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  // Order History and Details api fetch

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openCancelModal = (order) => {
    setOrderToCancel(order);
    setShowModal(true);
  };

  // Cancel Order api 
  
  const cancelOrderConfirm = async () => {
    try {
      await axios.put(
        `${config.BASE_URL}/api/orders/${orderToCancel.orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order cancelled successfully");
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Orders</h2>
      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.flatMap((order) =>
                order.orderItems.map((item, index) => (
                  <tr
                    key={`${order.orderId}-${index}`}
                    className={styles.row}
                    onClick={() => setSelectedOrder(order)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={styles.productCell}>
                      <img
                        src={item.imageUrls}
                        alt="product"
                        className={styles.image}
                      />
                      <div>
                        <p className={styles.productName}>{item.productName}</p>
                        {/* <p className={styles.productColor}>
                          Color: {item.color || "N/A"}
                        </p> */}
                      </div>
                    </td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.totalPrice}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {selectedOrder ? (
            <>
              <div className={styles.box}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>
                <div className={styles.summaryBox}>
                  <p>
                    <strong>Order ID:</strong> {selectedOrder.orderId}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedOrder.status}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{selectedOrder.totalAmount}
                  </p>
                  <p>
                    <strong>Delivery:</strong> ₹15
                  </p>
                  <h4>
                    <strong>Total:</strong> ₹{selectedOrder.totalAmount + 15}
                  </h4>
                </div>
                {selectedOrder.status !== "Cancelled" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() => openCancelModal(selectedOrder)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              <div className={styles.box}>
                <h3 className={styles.summaryTitle}>Shipping Details</h3>
                <div className={styles.section}>
                  <p>{selectedOrder.shippingAddress.fullName}</p>
                  <p>
                    {selectedOrder.shippingAddress.street},{" "}
                    {selectedOrder.shippingAddress.city}
                  </p>
                  <p>
                    {selectedOrder.shippingAddress.state} -{" "}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p>Phone: {selectedOrder.shippingAddress.phoneNumber}</p>
                </div>

                <div className={styles.section}>
                  <h4>Payment Method</h4>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
              </div>
            </>
          ) : (
            <p className={styles.placeholder}>
              Click on a product row to view order details
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={cancelOrderConfirm}
        title="Cancel Order"
        message={`Are you sure you want to cancel Order #${orderToCancel?.orderId}?`}
      />
    </div>
  );
};

export default MyOrders;
