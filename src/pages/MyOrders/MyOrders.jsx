import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./MyOrders.module.css";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const token = localStorage.getItem("jwtToken");
  const isMobile = window.innerWidth <= 768;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/order/my-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(Array.isArray(response.data) ? response.data : []);
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

  const cancelOrderConfirm = async () => {
    try {
      await axios.post(
        `${config.BASE_URL}/api/order/cancel/${orderToCancel.orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order cancelled successfully");
      await fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error("Failed to cancel order.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Orders</h2>

      <div className={styles.grid}>
        {/* LEFT SIDE : ORDER LIST */}
        <div className={styles.left}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              className={styles.orderCard}
              onClick={() => setSelectedOrder(order)}
            >
              <div className={styles.orderHeader}>
                <span><strong>Order #</strong>{order.orderId}</span>
                <span><strong>Status:</strong> {order.status}</span>
                <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</span>
                <span><strong>Total:</strong> ₹{order.totalAmount}</span>
              </div>

              <div className={styles.itemsPreview}>
                {order.items?.slice(0, 3).map((item, idx) => (
                  <div key={idx} className={styles.itemPreview}>
                    <img
                      src={
                        item.images?.[0]?.startsWith("http")
                          ? item.images[0]
                          : `data:image/jpeg;base64,${item.images[0]}`
                      }
                      alt={item.productName}
                    />
                    <p>{item.productName}</p>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                ))}

                {order.items.length > 3 && (
                  <p className={styles.moreItems}>+{order.items.length - 3} more items</p>
                )}
              </div>

              {/* 🔥 MOBILE VIEW: SHOW ORDER DETAILS INSIDE CARD */}
              {isMobile && selectedOrder?.orderId === order.orderId && (
                <div className={styles.mobileOrderDetails}>
                  {/* Items */}
                  <div className={styles.box}>
                    <h3>Order Items</h3>
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className={styles.orderItem}>
                        <img
                          src={
                            item.images?.[0]?.startsWith("http")
                              ? item.images[0]
                              : `data:image/jpeg;base64,${item.images[0]}`
                          }
                          alt={item.productName}
                        />
                        <div>
                          <p>{item.productName}</p>
                          <p>Qty: {item.quantity} | Price: ₹{item.price} | Total: ₹{item.totalPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className={styles.box}>
                    <h3>Order Summary</h3>
                    <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
                    <p><strong>Delivery:</strong> ₹15</p>
                    <h4><strong>Grand Total:</strong> ₹{selectedOrder.totalAmount + 15}</h4>

                    {selectedOrder.status !== "Cancelled" && (
                      <button
                        className={styles.cancelButton}
                        onClick={() => openCancelModal(selectedOrder)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  {/* Shipping */}
                  {selectedOrder.shippingAddress && (
                    <div className={styles.box}>
                      <h3>Shipping Details</h3>
                      <p>{selectedOrder.shippingAddress.fullName}</p>
                      <p>{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}</p>
                      <p>
                        {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.zipCode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                      <p>Phone: {selectedOrder.shippingAddress.phoneNumber}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE : DESKTOP ONLY */}
        {!isMobile && (
          <div className={styles.right}>
            {selectedOrder ? (
              <>
                <div className={styles.box}>
                  <h3>Order Items</h3>
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className={styles.orderItem}>
                      <img
                        src={
                          item.images?.[0]?.startsWith("http")
                            ? item.images[0]
                            : `data:image/jpeg;base64,${item.images[0]}`
                        }
                        alt={item.productName}
                      />
                      <div>
                        <p>{item.productName}</p>
                        <p>Qty: {item.quantity} | Price: ₹{item.price} | Total: ₹{item.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.box}>
                  <h3>Order Summary</h3>
                  <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                  <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
                  <p><strong>Delivery:</strong> ₹15</p>
                  <h4><strong>Grand Total:</strong> ₹{selectedOrder.totalAmount + 15}</h4>

                  {selectedOrder.status !== "Cancelled" && (
                    <button
                      className={styles.cancelButton}
                      onClick={() => openCancelModal(selectedOrder)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

                {selectedOrder.shippingAddress && (
                  <div className={styles.box}>
                    <h3>Shipping Details</h3>
                    <p>{selectedOrder.shippingAddress.fullName}</p>
                    <p>{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}</p>
                    <p>{selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.zipCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                    <p>Phone: {selectedOrder.shippingAddress.phoneNumber}</p>
                  </div>
                )}
              </>
            ) : (
              <p className={styles.placeholder}>Click on an order to view details</p>
            )}
          </div>
        )}
      </div>

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
