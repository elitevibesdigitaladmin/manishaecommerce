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
        const res = await axios.get(`${config.BASE_URL}/api/AllProduct`);
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
        const response = await axios.get(`${config.BASE_URL}/api/show-orders`, {
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

  useEffect(() => {
    const showOrders = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/show-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allOrders = response.data;
        const pending = allOrders.filter(
          (order) => order.status === "PENDING" || order.status === "PROCESSING"
        );

        setTotalOrders(allOrders.length);
        setPendingOrders(pending.length);
        setOrders(allOrders); // Also make sure you're storing orders for the recent orders table
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    showOrders();
  }, []);

  // fetch total no. of users api

useEffect(() => {
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/count-allUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User count response:", response.data); // 👈 Check what’s actually returned

      // setTotalUsers(response.data.totalUsers || 0);
      // setTotalUsers(response.data.count || 0);
      setTotalUsers(response.data || 0);

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

        <div className={styles.statCard}>
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
        </div>

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
          <div className={styles.statValue}>{totalUsers.toLocaleString()}</div>

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
            <Link to="/admin/create-workshop" className={styles.actionButton}>
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
            <Link to="/admin/create-workshop" className={styles.actionButton}>
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
            <Link to="/admin/workshop-list" className={styles.actionButton}>
              View Workshops
            </Link>
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className={styles.salesSection}>
        <h2 className={styles.sectionTitle}>Sales Overview</h2>
        <div className={styles.salesTabs}>
          <div className={styles.tabsList}>
            <button className={`${styles.tabButton} ${styles.activeTab}`}>
              Overview
            </button>
            <button className={styles.tabButton}>Analytics</button>
            <button className={styles.tabButton}>Reports</button>
          </div>
          <div className={styles.tabContent}>
            <div className={styles.chartsContainer}>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Revenue Over Time</h3>
                <div className={styles.chartPlaceholder}>
                  {/* <FiBarChart size={24} className={styles.chartIcon} />
                  <span>Chart coming soon! (e.g., Sales over time)</span> */}
                  <RevenueChart />
                </div>
              </div>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Sales by Category</h3>
                <div className={styles.chartPlaceholder}>
                  {/* <FiPieChart size={24} className={styles.chartIcon} />
                  <span>Category distribution chart</span> */}
                  <SalesPieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import styles from "./AdminDashboard.module.css"
// import config from "../../../config/apiconfig"
// import axios from "axios"

// const AdminDashboard = () => {
//   const [totalProducts, setTotalProducts] = useState(0)
//   const [totalVariants, setTotalVariants] = useState(0)
//   const [totalOrders, setTotalOrders] = useState(150)
//   const [totalUsers, setTotalUsers] = useState(85)
//   const [totalRevenue, setTotalRevenue] = useState(12500)
//   const [pendingOrders, setPendingOrders] = useState(8)

//   // Fetch product variants
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${config.BASE_URL}/api/AllProduct`)
//         const allProducts = res.data

//         // Count total number of variant IDs
//         const variantCount = allProducts.reduce((total, product) => {
//           return total + (product.variants?.length || 0)
//         }, 0)

//         setTotalVariants(variantCount)
//       } catch (error) {
//         console.error("Error fetching product variants:", error)
//       }
//     }

//     fetchProducts()
//   }, [])

//   return (
//     <div className={styles.dashboardContainer}>
//       <div className={styles.welcomeSection}>
//         <h2 className={styles.welcomeTitle}>Welcome to Green Gifts Admin</h2>
//         <p className={styles.welcomeSubtitle}>Here's an overview of your eco-friendly store</p>
//       </div>

//       {/* Stats Overview */}
//       <div className={styles.statsGrid}>
//         <div className={styles.statCard}>
//           <div className={styles.statHeader}>
//             <h3 className={styles.statTitle}>Total Products</h3>
//             <div className={styles.statIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//                 <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//               </svg>
//             </div>
//           </div>
//           <div className={styles.statValue}>{totalVariants}</div>
//           <p className={styles.statDescription}>Including all variants</p>
//           <Link to="/admin/product-list" className={styles.statLink}>
//             View Products
//           </Link>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statHeader}>
//             <h3 className={styles.statTitle}>Total Revenue</h3>
//             <div className={styles.statIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="12" y1="1" x2="12" y2="23"></line>
//                 <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//               </svg>
//             </div>
//           </div>
//           <div className={styles.statValue}>₹{totalRevenue.toLocaleString()}</div>
//           <p className={styles.statDescription}>+20.1% from last month</p>
//           <Link to="/admin/reports" className={styles.statLink}>
//             View Reports
//           </Link>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statHeader}>
//             <h3 className={styles.statTitle}>Total Orders</h3>
//             <div className={styles.statIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <circle cx="9" cy="21" r="1"></circle>
//                 <circle cx="20" cy="21" r="1"></circle>
//                 <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//               </svg>
//             </div>
//           </div>
//           <div className={styles.statValue}>{totalOrders}</div>
//           <p className={styles.statDescription}>{pendingOrders} orders pending</p>
//           <Link to="/admin/orders" className={styles.statLink}>
//             Manage Orders
//           </Link>
//         </div>

//         <div className={styles.statCard}>
//           <div className={styles.statHeader}>
//             <h3 className={styles.statTitle}>Total Customers</h3>
//             <div className={styles.statIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="9" cy="7" r="4"></circle>
//                 <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//               </svg>
//             </div>
//           </div>
//           <div className={styles.statValue}>{totalUsers}</div>
//           <p className={styles.statDescription}>+12 new customers this week</p>
//           <Link to="/admin/customers" className={styles.statLink}>
//             View Customers
//           </Link>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className={styles.actionsSection}>
//         <h2 className={styles.sectionTitle}>Quick Actions</h2>
//         <div className={styles.actionCards}>
//           <div className={styles.actionCard}>
//             <div className={styles.actionIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="12" y1="5" x2="12" y2="19"></line>
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//               </svg>
//             </div>
//             <h3 className={styles.actionTitle}>Add New Product</h3>
//             <p className={styles.actionDescription}>Create a new eco-friendly product listing</p>
//             <Link to="/admin/add-product" className={styles.actionButton}>
//               Add Product
//             </Link>
//           </div>

//           <div className={styles.actionCard}>
//             <div className={styles.actionIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
//                 <line x1="7" y1="7" x2="7.01" y2="7"></line>
//               </svg>
//             </div>
//             <h3 className={styles.actionTitle}>Manage Categories</h3>
//             <p className={styles.actionDescription}>Organize your product categories</p>
//             <Link to="/admin/plant-category" className={styles.actionButton}>
//               Manage Categories
//             </Link>
//           </div>

//           <div className={styles.actionCard}>
//             <div className={styles.actionIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                 <line x1="16" y1="2" x2="16" y2="6"></line>
//                 <line x1="8" y1="2" x2="8" y2="6"></line>
//                 <line x1="3" y1="10" x2="21" y2="10"></line>
//               </svg>
//             </div>
//             <h3 className={styles.actionTitle}>Create Workshop</h3>
//             <p className={styles.actionDescription}>Schedule a new eco-friendly workshop</p>
//             <Link to="/admin/create-workshop" className={styles.actionButton}>
//               Create Workshop
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Workshop Management Section */}
//       <div className={styles.workshopSection}>
//         <h2 className={styles.sectionTitle}>Manage Workshops</h2>
//         <div className={styles.actionCards}>
//           <div className={styles.actionCard}>
//             <div className={styles.actionIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="12" y1="5" x2="12" y2="19"></line>
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//               </svg>
//             </div>
//             <h3 className={styles.actionTitle}>Create Workshop</h3>
//             <p className={styles.actionDescription}>Schedule a new eco-friendly workshop</p>
//             <Link to="/admin/create-workshop" className={styles.actionButton}>
//               Create Workshop
//             </Link>
//           </div>

//           <div className={styles.actionCard}>
//             <div className={styles.actionIcon}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                 <line x1="16" y1="2" x2="16" y2="6"></line>
//                 <line x1="8" y1="2" x2="8" y2="6"></line>
//                 <line x1="3" y1="10" x2="21" y2="10"></line>
//               </svg>
//             </div>
//             <h3 className={styles.actionTitle}>View All Workshops</h3>
//             <p className={styles.actionDescription}>Manage your existing workshops</p>
//             <Link to="/admin/workshop-list" className={styles.actionButton}>
//               View Workshops
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Sales Overview */}
//       <div className={styles.salesSection}>
//         <h2 className={styles.sectionTitle}>Sales Overview</h2>
//         <div className={styles.salesTabs}>
//           <div className={styles.tabsList}>
//             <button className={`${styles.tabButton} ${styles.activeTab}`}>Overview</button>
//             <button className={styles.tabButton}>Analytics</button>
//             <button className={styles.tabButton}>Reports</button>
//           </div>
//           <div className={styles.tabContent}>
//             <div className={styles.chartsContainer}>
//               <div className={styles.chartCard}>
//                 <h3 className={styles.chartTitle}>Revenue Over Time</h3>
//                 <div className={styles.chartPlaceholder}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className={styles.chartIcon}
//                   >
//                     <line x1="12" y1="20" x2="12" y2="10"></line>
//                     <line x1="18" y1="20" x2="18" y2="4"></line>
//                     <line x1="6" y1="20" x2="6" y2="16"></line>
//                   </svg>
//                   <span>Chart coming soon! (e.g., Sales over time)</span>
//                 </div>
//               </div>
//               <div className={styles.chartCard}>
//                 <h3 className={styles.chartTitle}>Sales by Category</h3>
//                 <div className={styles.chartPlaceholder}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className={styles.chartIcon}
//                   >
//                     <circle cx="12" cy="12" r="10"></circle>
//                     <polyline points="8 14 12 16 16 14"></polyline>
//                     <line x1="12" y1="16" x2="12" y2="12"></line>
//                     <line x1="12" y1="8" x2="12.01" y2="8"></line>
//                   </svg>
//                   <span>Category distribution chart</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className={styles.ordersSection}>
//         <h2 className={styles.sectionTitle}>Recent Orders</h2>
//         <div className={styles.tableContainer}>
//           <table className={styles.ordersTable}>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 {
//                   id: "#ORD-001",
//                   customer: "Rahul Sharma",
//                   status: "Delivered",
//                   date: "2023-05-15",
//                   amount: "₹1,250",
//                 },
//                 {
//                   id: "#ORD-002",
//                   customer: "Priya Patel",
//                   status: "Processing",
//                   date: "2023-05-16",
//                   amount: "₹850",
//                 },
//                 {
//                   id: "#ORD-003",
//                   customer: "Amit Kumar",
//                   status: "Pending",
//                   date: "2023-05-17",
//                   amount: "₹2,100",
//                 },
//                 {
//                   id: "#ORD-004",
//                   customer: "Neha Singh",
//                   status: "Delivered",
//                   date: "2023-05-18",
//                   amount: "₹750",
//                 },
//                 {
//                   id: "#ORD-005",
//                   customer: "Vikram Mehta",
//                   status: "Shipped",
//                   date: "2023-05-19",
//                   amount: "₹1,500",
//                 },
//               ].map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.customer}</td>
//                   <td>
//                     <span
//                       className={`${styles.statusBadge} ${
//                         order.status === "Delivered"
//                           ? styles.statusDelivered
//                           : order.status === "Processing"
//                             ? styles.statusProcessing
//                             : order.status === "Pending"
//                               ? styles.statusPending
//                               : styles.statusShipped
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td>{order.date}</td>
//                   <td>{order.amount}</td>
//                   <td>
//                     <button className={styles.viewButton}>View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./AdminDashboard.module.css";
// import config from "../../../config/apiconfig";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [totalProducts, setTotalProducts] = useState(0); // Total products
//   const [totalVariants, setTotalVariants] = useState(0); // Total products with variants

//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalSales, setTotalSales] = useState(0);
//   const [totalReturns, setTotalReturns] = useState(0);
//   const [totalRefunds, setTotalRefunds] = useState(0);
//   const [totalDiscounts, setTotalDiscounts] = useState(0);

//   // Total Products
//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const res = await axios.get(`${config.BASE_URL}/api/AllProduct`);
//   //       setTotalProducts(res.data.length); // Assuming the API returns an array of products
//   //     } catch (error) {
//   //       console.error("Error fetching products:", error);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []);

//   // Total Variant Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${config.BASE_URL}/api/AllProduct`);
//         const allProducts = res.data;

//         // Count total number of variant IDs
//         const variantCount = allProducts.reduce((total, product) => {
//           return total + (product.variants?.length || 0);
//         }, 0);

//         setTotalVariants(variantCount);
//       } catch (error) {
//         console.error("Error fetching product variants:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Dummy data for now (replace with API calls later)
//   const stats = {
//     totalOrders: 150,
//     totalRevenue: 12500,
//     pendingOrders: 8,
//   };

//   return (
//     <div className={styles.dashboardContainer}>
//       {/* Header */}
//       {/* <header className={styles.header}>
//         <h1 className={styles.title}>Green Gifts Admin Dashboard</h1>
//         <p className={styles.subtitle}>Welcome, Admin! Manage your eco-friendly empire.</p>
//       </header> */}

//       {/* Stats Cards */}
//       <div className={styles.statsGrid}>
//         <div className={styles.statCard}>
//           <h3>Total Products</h3>
//           {/* Total No. of Products without Varient */}
//           {/* <p className={styles.statValue}>{totalProducts}</p> */}

//           {/* Total No. of Products with Varient */}
//           <p className={styles.statValue}>{totalVariants}</p>

//           <Link to="/admin/product-list" className={styles.statLink}>
//             View Products
//           </Link>
//         </div>
//         <div className={styles.statCard}>
//           <h3>Total Orders</h3>
//           <p className={styles.statValue}>{stats.totalOrders}</p>
//           <Link to="/admin/orders" className={styles.statLink}>
//             View Orders
//           </Link>
//         </div>
//         <div className={styles.statCard}>
//           <h3>Total Revenue</h3>
//           <p className={styles.statValue}>
//             ₹{stats.totalRevenue.toLocaleString()}
//           </p>
//           <Link to="/admin/reports" className={styles.statLink}>
//             View Reports
//           </Link>
//         </div>
//         <div className={styles.statCard}>
//           <h3>Pending Orders</h3>
//           <p className={styles.statValue}>{stats.pendingOrders}</p>
//           <Link to="/admin/orders" className={styles.statLink}>
//             Manage Orders
//           </Link>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className={styles.actionsSection}>
//         <h2 className={styles.sectionTitle}>Quick Actions</h2>
//         <div className={styles.actionButtons}>
//           <Link to="/admin/add-product" className={styles.actionButton}>
//             Add New Product
//           </Link>
//           <Link to="/admin/plant-category" className={styles.actionButton}>
//             Manage Categories
//           </Link>
//           <Link to="/admin/orders" className={styles.actionButton}>
//             View All Orders
//           </Link>
//         </div>
//         {/* Manage Workshops Section */}
// <div className={styles.workshopSection}>
//   <h2 className={styles.sectionTitle}>Manage Workshops</h2>
//   <div className={styles.actionButtons}>
//     <Link to="/admin/create-workshop" className={styles.actionButton}>
//       Create Workshop
//     </Link>
//     <Link to="/admin/workshop-list" className={styles.actionButton}>
//       View All Workshops
//     </Link>
//   </div>
// </div>

//       </div>

//       {/* Placeholder for Chart or Recent Activity */}
//       <div className={styles.chartSection}>
//         <h2 className={styles.sectionTitle}>Sales Overview</h2>
//         <div className={styles.chartPlaceholder}>
//           <p>Chart coming soon! (e.g., Sales over time)</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
