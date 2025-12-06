import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo2.png";
import config from "../../config/apiconfig";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Desktop dropdown
  const [mobileDropdowns, setMobileDropdowns] = useState({
    plants: false,
    account: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [plantSubCategories, setPlantSubCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const isLoggedIn = !!user?.token;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = (menu) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  // Fetch Subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const plantRes = await axios.get(`${config.BASE_URL}/api/categories/all`);
        setPlantSubCategories(plantRes.data);
      } catch (err) {
        console.error("Category fetch failed:", err);
      }
    };

    fetchCategories();
  }, []);

  // Cart Count Fetch
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user?.token) {
        setCartCount(0);
        return;
      }

      try {
        const res = await axios.get(`${config.BASE_URL}/api/cart/view`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const total = res?.data?.cartItems?.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(total || 0);
      } catch (error) {
        console.error("Cart count fetch failed:", error);
      }
    };

    fetchCartCount();
  }, [user]);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <section className={styles.topNavbar}>
        <div className={styles.title}>
          <span>
            Free Delivery Above ₹499 | <Link to="/plants">Shop Now</Link>
          </span>
          <span>Free Shipping on Orders Over 500</span>
          <span>
            Customer Support:{" "}
            <a href="tel:+917028917456">+917028917456</a>
          </span>
        </div>
      </section>

      {/* Main Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Green Gifts Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div
          className={`${styles.navLinks} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
        >
          <div className={styles.navItem}>
            <Link to="/">Home</Link>
          </div>

          {/* Plants Dropdown (Desktop) */}
          <div
            className={styles.navItem}
            onMouseEnter={() => !isMobileMenuOpen && setOpenDropdown("plants")}
            onMouseLeave={() => !isMobileMenuOpen && setOpenDropdown(null)}
          >
            <span className={styles.navLink}>Plants</span>

            {openDropdown === "plants" && (
              <div className={styles.dropdownMenu}>
                {plantSubCategories.map((sub, idx) => {
                  const slug = sub.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={idx}
                      to={`/plants/${slug}`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.navItem}>
            <Link to="/terrarium">Terrarium</Link>
          </div>

          <div className={styles.navItem}>
            <Link to="/offers">Offers</Link>
          </div>

          <div className={styles.navItem}>
            <Link to="/workshops">Workshops</Link>
          </div>

          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
          </div>

          {/* Account (Desktop) */}
          <div
            className={styles.navIcon}
            onMouseEnter={() => setOpenDropdown("account")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <VscAccount size={25} />

            {openDropdown === "account" && (
              <div className={styles.dropdownMenu}>
                {isLoggedIn ? (
                  <>
                    <Link to="/account">My Profile</Link>
                    <Link to="/my-orders">My Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <span onClick={handleLogout}>Logout</span>
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cart Icon */}
        <div className={styles.navIcon}>
          <Link to="/cart" className={styles.cartLink}>
            <BsCart size={25} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
      <div
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.overlayHeader}>
          <img src={logo} className={styles.overlayLogo} />
          <button className={styles.closeOverlay} onClick={toggleMobileMenu}>
            ×
          </button>
        </div>

        {/* Search */}
        <div className={styles.overlaySearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.overlayLinks}>
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>

          {/* Plants Mobile */}
          <div className={styles.overlayDropdown}>
            <p onClick={() => toggleMobileDropdown("plants")}>
              Plants ▾
            </p>

            {mobileDropdowns.plants && (
              <div className={styles.overlaySubmenu}>
                {plantSubCategories.map((sub, idx) => {
                  const slug = sub.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={idx}
                      to={`/plants/${slug}`}
                      onClick={toggleMobileMenu}
                    >
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/terrarium" onClick={toggleMobileMenu}>
            Terrarium
          </Link>

          <Link to="/offers" onClick={toggleMobileMenu}>
            Offers
          </Link>

          <Link to="/workshops" onClick={toggleMobileMenu}>
            Workshops
          </Link>

          {/* Account Mobile */}
          <div className={styles.overlayDropdown}>
            <p onClick={() => toggleMobileDropdown("account")}>
              Account ▾
            </p>

            {mobileDropdowns.account && (
              <div className={styles.overlaySubmenu}>
                {isLoggedIn ? (
                  <>
                    <Link to="/account" onClick={toggleMobileMenu}>
                      My Profile
                    </Link>
                    <Link to="/my-orders" onClick={toggleMobileMenu}>
                      My Orders
                    </Link>
                    <Link to="/wishlist" onClick={toggleMobileMenu}>
                      Wishlist
                    </Link>
                    <span onClick={handleLogout}>Logout</span>
                  </>
                ) : (
                  <Link to="/login" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" onClick={toggleMobileMenu}>
            Cart ({cartCount})
          </Link>
        </div>
      </div>
      )}
    </>
  );
};

export default Navbar;





// ==============

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsCart } from "react-icons/bs";
// import { VscAccount } from "react-icons/vsc";
// import styles from "./Navbar.module.css";
// import { useCart } from "../../context/CartContext";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const { totalUniqueProducts } = useCart();
//   const navigate = useNavigate();

//   // Check login status on mount and storage changes
//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem("token");
//       console.log("Checking token:", token); // Debug token value
//       const newIsLoggedIn = !!token;
//       console.log("Setting isLoggedIn to:", newIsLoggedIn); // Debug state change
//       if (newIsLoggedIn !== isLoggedIn) {
//         setIsLoggedIn(newIsLoggedIn);
//       }
//     };

//     checkToken();
//     window.addEventListener("storage", checkToken);

//     return () => window.removeEventListener("storage", checkToken);
//   }, [isLoggedIn]);

//   // Debug state
//   console.log("isLoggedIn:", isLoggedIn, "openDropdown:", openDropdown);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setOpenDropdown(null);
//     navigate("/login");
//     console.log("Logged out, token removed");
//   };

//   const handleAccountClick = (e) => {
//     e.preventDefault();
//     console.log("Account clicked, isLoggedIn:", isLoggedIn); // Debug click
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else {
//       setOpenDropdown(openDropdown === "user" ? null : "user"); // Toggle dropdown
//       console.log("Dropdown toggled to:", openDropdown === "user" ? null : "user");
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isMobileMenuOpen) setOpenDropdown(null);
//   };

//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 500,
//       offset: 100,
//       easing: "ease-in-out",
//       delay: 0,
//       once: true,
//     });
//   }, []);

//   return (
//     <>
//       <section className={styles.topNavbar} data-aos="fade-up">
//         <div className={styles.title}>
//           <span>
//             Free Delivery Above ₹499 | <Link to="/plants">Shop Now</Link>
//           </span>
//           <span>Free Shipping on Orders Over 500</span>
//           <span>
//             Customer Support : <a href="tel:+917028917456">+91 7028917456</a>
//           </span>
//         </div>
//       </section>

//       <header className={styles.navbar}>
//         <div className={styles.logo}>
//           <Link to="/">Green Gifts</Link>
//         </div>

//         <nav
//           className={`${styles.navLinks} ${
//             isMobileMenuOpen ? styles.active : ""
//           }`}
//         >
//           <nav className={styles.navItem}>
//             <Link to="/">Home</Link>
//           </nav>

//           <nav
//             className={styles.navItem}
//             onMouseEnter={() => setOpenDropdown("plants")}
//             onMouseLeave={() => setOpenDropdown(null)}
//           >
//             <Link to="/plants">Plants</Link>
//             {openDropdown === "plants" && (
//               <div className={styles.dropdownMenu}>
//                 <Link to="/plants/indoor">Indoor Plants</Link>
//                 <Link to="/plants/flowering">Flowering Plants</Link>
//                 <Link to="/plants/low-maintenance">Low Maintenance Plants</Link>
//                 <Link to="/plants/air-purifying">Air Purifying Plants</Link>
//               </div>
//             )}
//           </nav>

//           <nav
//             className={styles.navItem}
//             onMouseEnter={() => setOpenDropdown("pots-planters")}
//             onMouseLeave={() => setOpenDropdown(null)}
//           >
//             <Link to="/pots-planters">Pots & Planters</Link>
//             {openDropdown === "pots-planters" && (
//               <div className={styles.dropdownMenu}>
//                 <Link to="/pots-plastic">Plastic Pots</Link>
//                 <Link to="/pots-ceramic">Ceramic Pots</Link>
//                 <Link to="/pots-metal">Metal Pots</Link>
//                 <Link to="/pots-hanging">Hanging Pots</Link>
//                 <Link to="/planters-wooden">Wooden Planters</Link>
//                 <Link to="/planters-basket">Basket Planters</Link>
//                 <Link to="/planters-stands">Plant Stands</Link>
//                 <Link to="/planters-trays">Seedling Trays</Link>
//               </div>
//             )}
//           </nav>

//           <nav className={styles.navItem}>
//             <Link to="/terrarium">Terrarium</Link>
//           </nav>

//           <nav className={styles.navItem}>
//             <Link to="/offers">Offers</Link>
//           </nav>

//           <div className={styles.searchContainer}>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={handleInputChange}
//               className={styles.searchInput}
//             />
//           </div>

//           <div className={styles.navIcon}>
//             <Link
//               to={isLoggedIn ? "#" : "/login"}
//               onMouseEnter={() => isLoggedIn && setOpenDropdown("user")}
//               onMouseLeave={() => setOpenDropdown(null)}
//               onClick={handleAccountClick}
//             >
//               <VscAccount className={styles.accountIcon} />
//             </Link>
//             {isLoggedIn && openDropdown === "user" && (
//               <div className={styles.dropdownMenu}>
//                 <Link
//                   to="/account"
//                   onClick={() => {
//                     setOpenDropdown(null);
//                     console.log("Navigating to account");
//                   }}
//                 >
//                   My Profile
//                 </Link>
//                 <span onClick={handleLogout} className={styles.logoutBtn}>
//                   Logout
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className={styles.navIcon}>
//             <Link to="/cart" className={styles.cartLink}>
//               <BsCart />
//               {totalUniqueProducts > 0 && (
//                 <span className={styles.cartBadge}>{totalUniqueProducts}</span>
//               )}
//             </Link>
//           </div>
//         </nav>

//         <button className={styles.hamburger} onClick={toggleMobileMenu}>
//           <span className={styles.bar}></span>
//           <span className={styles.bar}></span>
//           <span className={styles.bar}></span>
//         </button>
//       </header>
//       {/* Debug button to force dropdown */}
//       {isLoggedIn && (
//         <button
//           onClick={() => setOpenDropdown("user")}
//           style={{ margin: "10px", padding: "5px" }}
//         >
//           Open Dropdown (Debug)
//         </button>
//       )}
//     </>
//   );
// };

// export default Navbar;
