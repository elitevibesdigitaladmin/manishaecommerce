import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config/apiconfig";
import styles from "./Orders.module.css"; // Import CSS Module

const Orders = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const showOrders = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/show-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    showOrders();
  }, []);

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.shippingAddress.fullName}</td>
                  <td>{order.userEmail}</td>
                  <td>
                    <div>{order.shippingAddress.street}</div>
                    <div>{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                    <div>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</div>
                    <div>Phone: {order.shippingAddress.phoneNumber}</div>
                  </td>
                  <td>
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className={styles.itemDetails}>
                        <strong>{item.productName}</strong> (x{item.quantity})<br />
                        ₹{item.price} each — ₹{item.totalPrice} total
                      </div>
                    ))}
                  </td>
                  <td className={styles.total}>₹{order.totalAmount}</td>
                  <td>{order.paymentMethod}</td>
                  <td className={order.status === 'CANCELLED' ? styles.cancelled : styles.completed}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
