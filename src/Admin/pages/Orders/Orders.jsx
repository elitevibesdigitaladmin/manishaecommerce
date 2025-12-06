import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config/apiconfig";
import styles from "./Orders.module.css";

const Orders = () => {
  const token = localStorage.getItem("jwtToken");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  useEffect(() => {
    const showOrders = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/order/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    showOrders();
  }, []);

  // Cancel Order API Call
 const cancelOrder = async () => {
  if (!selectedOrder) return;

  try {
    await axios.post(
      `${config.BASE_URL}/api/order/cancel/${selectedOrder}`,
      {}, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === selectedOrder
          ? { ...order, status: "CANCELLED" }
          : order
      )
    );

    setShowCancelPopup(false);
  } catch (error) {
    console.error("Error cancelling order:", error.response?.data || error);
  }
};


  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Orders Management</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>

                  <td>
                    <div className={styles.customerBox}>
                      <strong>{order.shippingAddress.fullName}</strong>
                      <span>{order.userEmail}</span>
                      <span>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </span>
                      <span>Phone: {order.shippingAddress.phoneNumber}</span>
                    </div>
                  </td>

                  <td>
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className={styles.itemDetails}>
                        <strong>{item.productName}</strong> x {item.quantity}
                        <div className={styles.priceSmall}>
                          ₹{item.price} → ₹{item.totalPrice}
                        </div>
                      </div>
                    ))}
                  </td>

                  <td className={styles.totalAmount}>₹{order.totalAmount}</td>

                  <td>
                    <span
                      className={`${styles.badge} ${
                        order.paymentMethod === "PAID"
                          ? styles.paid
                          : styles.cod
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`${styles.badge} ${
                        order.status === "CANCELLED"
                          ? styles.cancelled
                          : order.status === "DELIVERED"
                          ? styles.delivered
                          : order.status === "SHIPPED"
                          ? styles.shipped
                          : styles.pending
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {order.status !== "CANCELLED" && (
                      <button
                        className={styles.cancelBtn}
                        onClick={() => {
                          setSelectedOrder(order.orderId);
                          setShowCancelPopup(true);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CANCEL POPUP */}
      {showCancelPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Cancel Order?</h2>
            <p>
              Are you sure you want to cancel Order ID:{" "}
              <strong>{selectedOrder}</strong>?
            </p>

            <div className={styles.popupActions}>
              <button
                className={styles.confirmBtn}
                onClick={cancelOrder}
              >
                Yes, Cancel
              </button>
              <button
                className={styles.closeBtn}
                onClick={() => setShowCancelPopup(false)}
              >
                No, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../../../config/apiconfig";

// const Orders = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   const [orders, setOrders] = useState([]);

//   // Show Orders
//   useEffect(() => {
//     const showOrders = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/show-orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log(response.data);
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching orders", error);
//       }
//     };

//     showOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Orders</h1>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border">Order ID</th>
//                 <th className="py-2 px-4 border">Customer</th>
//                 <th className="py-2 px-4 border">Email</th>
//                 <th className="py-2 px-4 border">Address</th>
//                 <th className="py-2 px-4 border">Items</th>
//                 <th className="py-2 px-4 border">Total</th>
//                 <th className="py-2 px-4 border">Payment</th>
//                 <th className="py-2 px-4 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.orderId} className="text-center border-t">
//                   <td className="py-2 px-4 border">{order.orderId}</td>
//                   <td className="py-2 px-4 border">{order.shippingAddress.fullName}</td>
//                   <td className="py-2 px-4 border">{order.userEmail}</td>
//                   <td className="py-2 px-4 border text-left">
//                     <div>{order.shippingAddress.street}</div>
//                     <div>{order.shippingAddress.city}, {order.shippingAddress.state}</div>
//                     <div>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</div>
//                     <div>Phone: {order.shippingAddress.phoneNumber}</div>
//                   </td>
//                   <td className="py-2 px-4 border text-left">
//                     {order.orderItems.map((item, idx) => (
//                       <div key={idx} className="mb-2">
//                         <strong>{item.productName}</strong> (x{item.quantity})<br />
//                         ₹{item.price} each — ₹{item.totalPrice} total
//                       </div>
//                     ))}
//                   </td>
//                   <td className="py-2 px-4 border font-semibold">₹{order.totalAmount}</td>
//                   <td className="py-2 px-4 border">{order.paymentMethod}</td>
//                   <td className={`py-2 px-4 border font-semibold ${order.status === 'CANCELLED' ? 'text-red-500' : 'text-green-600'}`}>
//                     {order.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;
