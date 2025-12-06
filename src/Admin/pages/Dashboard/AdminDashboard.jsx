import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import config from "../../../config/apiconfig";
import axios from "axios";
// Import icons from react-icons
import {
  FiBox,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPlus,
  FiTag,
  FiCalendar,
  FiBarChart,
  FiPieChart,
} from "react-icons/fi";
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import SalesPieChart from "../../components/SalesPieChart/SalesPieChart";

const AdminDashboard = () => {
  // const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = localStorage.getItem("jwtToken");

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalVariants, setTotalVariants] = useState(0);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(12500);

  // Fetch all products including variants and terrarium

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/product/all`);
        const allProducts = res.data;

        const totalCount = allProducts.reduce((total, product) => {
          // If product has variants, count each variant
          if (product.variants && product.variants.length > 0) {
            return total + product.variants.length;
          }
          // If no variants, treat it as a single item (likely a terrarium)
          return total + 1;
        }, 0);

        setTotalVariants(totalCount);
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch Total No. of Orders and Pending Orders

  useEffect(() => {
    const showOrders = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/order/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Orders:", response.data);
        setOrders(response.data);
        setTotalOrders(response.data.length); // <-- FIXED: count correctly
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    showOrders();
  }, []);

  // useEffect(() => {
  //   const showOrders = async () => {
  //     try {
  //       const response = await axios.get(`${config.BASE_URL}/api/show-orders`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const allOrders = response.data;
  //       const pending = allOrders.filter(
  //         (order) => order.status === "PENDING" || order.status === "PROCESSING"
  //       );

  //       setTotalOrders(allOrders.length);
  //       setPendingOrders(pending.length);
  //       setOrders(allOrders); // Also make sure you're storing orders for the recent orders table
  //     } catch (error) {
  //       console.error("Error fetching orders", error);
  //     }
  //   };

  //   showOrders();
  // }, []);

  // fetch total no. of users api

useEffect(() => {
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User count response:", response.data); // 👈 Check what’s actually returned

      // setTotalUsers(response.data.totalUsers || 0);
      // setTotalUsers(response.data.count || 0);
      setTotalUsers(response.data.length|| 0);
      

    } catch (error) {
      console.error("Failed to fetch total users:", error);
      setTotalUsers(0);
    }
  };

  fetchTotalUsers();
}, []);



  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome to Green Gifts Admin</h2>
        <p className={styles.welcomeSubtitle}>
          Here's an overview of your eco-friendly store
        </p>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Total Products</h3>
            <div className={styles.statIcon}>
              <FiBox size={24} />
            </div>
          </div>
          <div className={styles.statValue}>{totalVariants}</div>
          <p className={styles.statDescription}>
            Including variants & terrarium
          </p>
          <Link to="/admin/product-list" className={styles.statLink}>
            View Products
          </Link>
        </div>

        {/* <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Total Revenue</h3>
            <div className={styles.statIcon}>
              <FiDollarSign size={24} />
            </div>
          </div>
          <div className={styles.statValue}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <p className={styles.statDescription}>+20.1% from last month</p>
          <Link to="/admin/reports" className={styles.statLink}>
            View Reports
          </Link>
        </div> */}

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Total Orders</h3>
            <div className={styles.statIcon}>
              <FiShoppingCart size={24} />
            </div>
          </div>
          <div className={styles.statValue}>{totalOrders}</div>
          <p className={styles.statDescription}>
            {pendingOrders} orders pending
          </p>
          <Link to="/admin/orders" className={styles.statLink}>
            Manage Orders
          </Link>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>Total Customers</h3>
            <div className={styles.statIcon}>
              <FiUsers size={24} />
            </div>
          </div>
          {/* <div className={styles.statValue}>{totalUsers}</div> */}
          <div className={styles.statValue}>{totalUsers}</div>

          <p className={styles.statDescription}>+5 new customers this week</p>
          <Link to="/admin/users" className={styles.statLink}>
            View Customers
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionCards}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiPlus size={24} />
            </div>
            <h3 className={styles.actionTitle}>Add New Product</h3>
            <p className={styles.actionDescription}>
              Create a new eco-friendly product listing
            </p>
            <Link to="/admin/add-product" className={styles.actionButton}>
              Add Product
            </Link>
          </div>

          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiTag size={24} />
            </div>
            <h3 className={styles.actionTitle}>Manage Categories</h3>
            <p className={styles.actionDescription}>
              Organize your product categories
            </p>
            <Link to="/admin/plant-category" className={styles.actionButton}>
              Manage Categories
            </Link>
          </div>

          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiCalendar size={24} />
            </div>
            <h3 className={styles.actionTitle}>Create Workshop</h3>
            <p className={styles.actionDescription}>
              Schedule a new eco-friendly workshop
            </p>
            <Link to="/admin/add-workshop" className={styles.actionButton}>
              Create Workshop
            </Link>
          </div>
        </div>
      </div>

      {/* Workshop Management Section */}
      <div className={styles.workshopSection}>
        <h2 className={styles.sectionTitle}>Manage Workshops</h2>
        <div className={styles.actionCards}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiPlus size={24} />
            </div>
            <h3 className={styles.actionTitle}>Create Workshop</h3>
            <p className={styles.actionDescription}>
              Schedule a new eco-friendly workshop
            </p>
            <Link to="/admin/add-workshop" className={styles.actionButton}>
              Create Workshop
            </Link>
          </div>

          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <FiCalendar size={24} />
            </div>
            <h3 className={styles.actionTitle}>View All Workshops</h3>
            <p className={styles.actionDescription}>
              Manage your existing workshops
            </p>
            <Link to="/admin/add-workshop" className={styles.actionButton}>
              View Workshops
            </Link>
          </div>
        </div>
      </div>

      {/* Sales Overview */}
     
      {/* Recent Orders */}
      <div className={styles.ordersSection}>
        <h2 className={styles.sectionTitle}>Recent Orders</h2>
        <div className={styles.tableContainer}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.orderId}>
                  <td>#{order.orderId.toString().padStart(3, "0")}</td>
                  <td>{order.shippingAddress?.fullName || "Unknown"}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        order.status === "DELIVERED"
                          ? styles.statusDelivered
                          : order.status === "PROCESSING"
                          ? styles.statusProcessing
                          : order.status === "PENDING"
                          ? styles.statusPending
                          : order.status === "SHIPPED"
                          ? styles.statusShipped
                          : styles.statusCancelled
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <button className={styles.viewButton}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
