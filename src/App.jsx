// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CartProvider } from "./context/CartContext";
// import { AdminProvider } from "./context/AdminContext";

// // User Panel Import files
// import Home from "./pages/Home/Home";
// import MainLayout from "./layouts/MainLayout";
// import Login from "./pages/Auth/Login/Login";
// import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
// import CreateAccount from "./pages/Auth/Register/CreateAccount";
// import AccountPage from "./pages/Auth/AccountPage/AccountPage";
// import Plants from "./pages/Plants/Plants";
// import PotsPlanters from "./pages/PotsPlanters/PotsPlanters";
// import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import Offers from "./pages/Offers/Offers";
// import Terrarium from "./pages/Terrarium/Terrarium";
// import Cart from "./pages/Cart/Cart";
// import Checkout from "./pages/Checkout/Checkout";
// import Payment from "./pages/Payment/Payment";
// import OrderConfirm from "./pages/OrderConfirm/OrderConfirm";
// import Contact from "./pages/Contact/Contact";
// import Services from "./pages/Services/Services";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import OrderHistory from "./pages/OrderHistory/OrderHistory";
// import WhatsAppBtn from "./components/WhatsAppBtn/WhatsAppBtn";

// // Admin Panel Import files
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
// import PlantCategory from "./admin/pages/Category/PlantCategory";
// import PotCategory from "./admin/pages/Category/PotCategory";
// import AddProduct from "./admin/pages/Product/AddProduct";
// import ProductList from "./admin/pages/Product/ProductList";
// import OfferBanner from "./admin/pages/Banner/OfferBanner";
// import Order from "./admin/pages/Orders/Orders";
// import AddWorkshop from "./admin/pages/AddWorkshop/AddWorkshop";

// import ProtectedRoute from "./utils/ProtectedRoute";
// import Workshops from "./pages/Workshops/Workshops";


// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // ✅ Improved Token Handling
//   const rawTokenData = localStorage.getItem("ecommerce_login");
//   let tokenData;
//   try {
//     tokenData =
//       rawTokenData && rawTokenData !== "undefined"
//         ? JSON.parse(rawTokenData)
//         : null;
//   } catch (error) {
//     console.error("Invalid token data in localStorage:", rawTokenData);
//     tokenData = null;
//   }

//   const token = tokenData?.jwtToken || ""; // Ensure token is always defined
//   console.log("Token in HomeBanner:", token); // For debugging

//   return (
//     <>
//       <CartProvider>
//         <AdminProvider>
//           <Router>
//             <ToastContainer
//               position="top-right" // Position of the toast
//               autoClose={5000} // Auto-close after 5 seconds (5000ms)
//               hideProgressBar={false} // Show progress bar
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="light" // You can change this to "dark" or "colored"
//             />
//             <ScrollToTop /> {/* Scroll to top */}
//             <Routes>
//               {/* Main Layout Route */}

//               <Route path="/" element={<MainLayout />}>
//                 <Route index element={<Home />} />

//                 {/* Auth Route */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<CreateAccount />} />
//                 <Route path="/forgot-password" element={<ForgotPassword />} />
//                 <Route path="/reset-password" element={<ResetPassword />} />
//                 <Route path="/account" element={<AccountPage />} />

//                 {/* Plants and their collections Routes */}
//                 <Route path="/plants" element={<Plants />} />
//                 <Route path="/plants/:category" element={<Plants />} />
//                 <Route path="/product/:id" element={<ProductDetails />} />
//                 <Route path="/pots-planters" element={<PotsPlanters />} />
//                 <Route path="/pots-planters/:category" element={<PotsPlanters />} />
//                 <Route path="/product-details" element={<ProductDetails />} />
//                 <Route path="/terrarium" element={<Terrarium />} />
//                 <Route path="/offers" element={<Offers />} />
//                 <Route path="/workshops" element={<Workshops />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/gardening-services" element={<Services />} />
//                 <Route path="/contact-us" element={<Contact />} />

//                 {/* Protected Route */}
//                 <Route
//                   path="/checkout"
//                   element={
//                     <ProtectedRoute>
//                       <Checkout />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/payment-gateway"
//                   element={
//                     <ProtectedRoute>
//                       <Payment />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/order-confirm"
//                   element={
//                     <ProtectedRoute>
//                       <OrderConfirm />
//                     </ProtectedRoute>
//                   }
//                 />

//                 <Route
//                   path="/order-history"
//                   element={
//                     <ProtectedRoute>
//                       <OrderHistory />
//                     </ProtectedRoute>
//                   }
//                 />
//               </Route>

//               {/* Admin Layout Route (Admin Side) */}
//               <Route path="/admin" element={<AdminLayout />}>
//                 <Route index element={<AdminDashboard />} />
//                 <Route
//                   path="/admin/plant-category"
//                   element={<PlantCategory />}
//                 />
//                 <Route path="/admin/pot-category" element={<PotCategory />} />
//                 <Route path="/admin/add-product" element={<AddProduct />} />
//                 <Route
//                   path="/admin/add-product/:productId"
//                   element={<AddProduct />}
//                 />
//                 <Route path="/admin/product-list" element={<ProductList />} />
//                 <Route path="/admin/offer-banner" element={<OfferBanner />} />
//                 <Route path="/admin/orders" element={<Order />} />
//                 <Route path="/admin/add-workshop" element={<AddWorkshop />} />

//               </Route>
//             </Routes>
//           </Router>

//           {/* Fixed WhatsApp Button */}
//           <WhatsAppBtn/>

//         </AdminProvider>
//       </CartProvider>
//     </>
//   );
// };

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";

// User Panel Pages
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import CreateAccount from "./pages/Auth/Register/CreateAccount";
import AccountPage from "./pages/Auth/AccountPage/AccountPage";
import Plants from "./pages/Plants/Plants";
import PotsPlanters from "./pages/PotsPlanters/PotsPlanters";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Offers from "./pages/Offers/Offers";
import Terrarium from "./pages/Terrarium/Terrarium";
import Workshops from "./pages/Workshops/Workshops";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import OrderConfirm from "./pages/OrderConfirm/OrderConfirm";
import Contact from "./pages/Contact/Contact";
import Services from "./pages/Services/Services";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import MyOrders from "./pages/MyOrders/MyOrders";
import WhatsAppBtn from "./components/WhatsAppBtn/WhatsAppBtn";

// Admin Panel
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import PlantCategory from "./admin/pages/Category/PlantCategory";
import PotCategory from "./admin/pages/Category/PotCategory";
import AddProduct from "./admin/pages/Product/AddProduct";
import ProductList from "./admin/pages/Product/ProductList";
import OfferBanner from "./admin/pages/Banner/OfferBanner";
import Order from "./admin/pages/Orders/Orders";
import AddWorkshop from "./admin/pages/AddWorkshop/AddWorkshop";
import Users from "./admin/pages/Users/Users";
import { Navigate } from "react-router-dom";
// Protected Route
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AdminProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              theme="light"
            />

            <ScrollToTop />

            <Routes>
              {/* Main Layout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                {/* Auth */}
            <Route
  path="/login"
  element={
    localStorage.getItem("jwtToken") ? (
      localStorage.getItem("role") === "Admin" ? (
        <Navigate to="/admin" replace />
      ) : (
        <Navigate to="/" replace />
      )
    ) : (
      <Login />
    )
  }
/>

                <Route path="/register" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/account" element={<AccountPage />} />

                {/* Products */}
                <Route path="/plants" element={<Plants />} />
                <Route path="/plants/:category" element={<Plants />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/pots-planters" element={<PotsPlanters />} />
                <Route path="/pots-planters/:category" element={<PotsPlanters />} />
                <Route path="/terrarium" element={<Terrarium />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/gardening-services" element={<Services />} />
                <Route path="/product-details" element={<ProductDetails />} />

                {/* Cart */}
                <Route path="/cart" element={<Cart />} />

                {/* CONTACT */}
                <Route path="/contact-us" element={<Contact />} />

                {/* PROTECTED ROUTES */}
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/payment-gateway"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/order-confirm"
                  element={
                    <ProtectedRoute>
                      <OrderConfirm />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/my-orders"
                  element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* ADMIN ROUTES */}
            <Route
  path="/admin"
  element={
    <ProtectedRoute role="Admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
                <Route index element={<AdminDashboard />} />
                <Route path="/admin/plant-category" element={<PlantCategory />} />
                <Route path="/admin/pot-category" element={<PotCategory />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/add-product/:productId" element={<AddProduct />} />
                <Route path="/admin/product-list" element={<ProductList />} />
                <Route path="/admin/offer-banner" element={<OfferBanner />} />
                <Route path="/admin/orders" element={<Order />} />
                <Route path="/admin/add-workshop" element={<AddWorkshop />} />
                <Route path="/admin/users" element={<Users />} />
              </Route>
            </Routes>

            <WhatsAppBtn />
          </AdminProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
