import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';
import {
  // FiGift,
  FiHome,
  FiList,
  // FiArchive,
  FiBox,
  FiPlus,
  FiImage,
  FiShoppingCart,
  FiCalendar,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
// import { FaLeaf } from 'react-icons/fa'; 
import { GiPorcelainVase } from 'react-icons/gi';
import { PiPlantFill } from 'react-icons/pi';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const toggleProduct = () => {
    setIsProductOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
      setIsCategoryOpen(false);
      setIsProductOpen(false);
    }
  };

  // Automatically open dropdowns based on active route
  useEffect(() => {
    if (location.pathname.includes('/admin/plant-category') || location.pathname.includes('/admin/pot-category')) {
      setIsCategoryOpen(true);
    } else {
      setIsCategoryOpen(false);
    }

    if (location.pathname.includes('/admin/add-product') || location.pathname.includes('/admin/product-list')) {
      setIsProductOpen(true);
    } else {
      setIsProductOpen(false);
    }
  }, [location.pathname]);

  return ( 
    <>
      {/* Hamburger Menu for Small Screens */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <FiX className={styles.hamburgerIcon} />
        ) : (
          <FiMenu className={styles.hamburgerIcon} />
        )}
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* Sidebar Header with Logo */}
        {/* <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <FiGift size={24} className={styles.icon} />
            </div>
            <span className={styles.logoText}>Green Gifts</span>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${location.pathname === '/admin' ? styles.active : ''}`}>
              <Link to="/admin" className={styles.navLink} onClick={handleLinkClick}>
                <FiHome size={20} className={styles.icon} />
                Dashboard
              </Link>
            </li>

            {/* Category Dropdown */}
            <li className={styles.navItem}>
              <div className={styles.dropdownToggle} onClick={toggleCategory}>
                <span className={styles.dropdownLabel}>
                  <FiList size={20} className={styles.icon} />
                  Category
                </span>
                <FiChevronDown
                  size={16}
                  className={`${styles.chevron} ${isCategoryOpen ? styles.chevronOpen : ''}`}
                />
              </div>
              {isCategoryOpen && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={`${styles.dropdownItem} ${
                      location.pathname === '/admin/plant-category' ? styles.active : ''
                    }`}
                  >
                    <Link
                      to="/admin/plant-category"
                      className={styles.navLink}
                      onClick={handleLinkClick}
                    >
                      <PiPlantFill size={20} className={styles.icon} />
                      Plant Category
                    </Link>
                  </li>
                  <li
                    className={`${styles.dropdownItem} ${
                      location.pathname === '/admin/pot-category' ? styles.active : ''
                    }`}
                  >
                    <Link
                      to="/admin/pot-category"
                      className={styles.navLink}
                      onClick={handleLinkClick}
                    >
                      <GiPorcelainVase size={20} className={styles.icon} />
                      Pot Category
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Products Dropdown */}
            <li className={styles.navItem}>
              <div className={styles.dropdownToggle} onClick={toggleProduct}>
                <span className={styles.dropdownLabel}>
                  <FiBox size={20} className={styles.icon} />
                  Products
                </span>
                <FiChevronDown
                  size={16}
                  className={`${styles.chevron} ${isProductOpen ? styles.chevronOpen : ''}`}
                />
              </div>
              {isProductOpen && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={`${styles.dropdownItem} ${
                      location.pathname === '/admin/add-product' ? styles.active : ''
                    }`}
                  >
                    <Link
                      to="/admin/add-product"
                      className={styles.navLink}
                      onClick={handleLinkClick}
                    >
                      <FiPlus size={20} className={styles.icon} />
                      Product Add
                    </Link>
                  </li>
                  <li
                    className={`${styles.dropdownItem} ${
                      location.pathname === '/admin/product-list' ? styles.active : ''
                    }`}
                  >
                    <Link
                      to="/admin/product-list"
                      className={styles.navLink}
                      onClick={handleLinkClick}
                    >
                      <FiList size={20} className={styles.icon} />
                      Product List
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li
              className={`${styles.navItem} ${
                location.pathname === '/admin/offer-banner' ? styles.active : ''
              }`}
            >
              <Link to="/admin/offer-banner" className={styles.navLink} onClick={handleLinkClick}>
                <FiImage size={20} className={styles.icon} />
                Offer Banner
              </Link>
            </li>

            <li
              className={`${styles.navItem} ${location.pathname === '/admin/orders' ? styles.active : ''}`}
            >
              <Link to="/admin/orders" className={styles.navLink} onClick={handleLinkClick}>
                <FiShoppingCart size={20} className={styles.icon} />
                Orders
              </Link>
            </li>

            <li
              className={`${styles.navItem} ${
                location.pathname === '/admin/add-workshop' ? styles.active : ''
              }`}
            >
              <Link to="/admin/add-workshop" className={styles.navLink} onClick={handleLinkClick}>
                <FiCalendar size={20} className={styles.icon} />
                Workshop
              </Link>
            </li>

            <li
              className={`${styles.navItem} ${
                location.pathname === '/admin/add-workshop' ? styles.active : ''
              }`}
            >
              <Link to="/admin/users" className={styles.navLink} onClick={handleLinkClick}>
                <FiCalendar size={20} className={styles.icon} />
                Users
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
          <Link
            to="/admin/settings"
            className={`${styles.navLink} ${
              location.pathname === '/admin/settings' ? styles.active : ''
            }`}
            onClick={handleLinkClick}
          >
            <FiSettings size={20} className={styles.icon} />
            Settings
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import styles from './AdminSidebar.module.css';
// import {
//   FaTachometerAlt,
//   FaThList,
//   FaPlus,
//   FaClipboardList,
//   FaImages,
//   FaShoppingCart,
//   FaBars,
//   FaChevronDown,
// } from 'react-icons/fa';
// import { GiPorcelainVase } from 'react-icons/gi';
// import { AiFillProduct } from 'react-icons/ai';
// import { PiPlantFill } from 'react-icons/pi';
// import { GrWorkshop } from "react-icons/gr";


// const AdminSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isProductOpen, setIsProductOpen] = useState(false);
//   const location = useLocation(); // To determine the active route

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const toggleCategory = () => {
//     setIsCategoryOpen((prev) => !prev);
//   };

//   const toggleProduct = () => {
//     setIsProductOpen((prev) => !prev);
//   };

//   const handleLinkClick = () => {
//     // Only close the sidebar and dropdowns on mobile devices (below 768px)
//     if (window.innerWidth <= 768) {
//       setIsSidebarOpen(false);
//       setIsCategoryOpen(false);
//       setIsProductOpen(false);
//     }
//   };

//   // Automatically open the relevant dropdown if one of its sub-links is active
//   useEffect(() => {
//     // Open Category dropdown if Plant Category or Pot Category is active
//     if (location.pathname.includes('/admin/plant-category') || location.pathname.includes('/admin/pot-category')) {
//       setIsCategoryOpen(true);
//     } else {
//       setIsCategoryOpen(false);
//     }

//     // Open Products dropdown if Product Add or Product List is active
//     if (location.pathname.includes('/admin/add-product') || location.pathname.includes('/admin/product-list')) {
//       setIsProductOpen(true);
//     } else {
//       setIsProductOpen(false);
//     }
//   }, [location.pathname]);

//   return (
//     <>
//       {/* Hamburger Menu for Small Screens */}
//       <div className={styles.hamburger} onClick={toggleSidebar}>
//         <FaBars className={styles.hamburgerIcon} />
//       </div>

//       {/* Sidebar */}
//       <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
//         <nav className={styles.navLinks}>
//           <Link to="/admin" className={styles.navItem} onClick={handleLinkClick}>
//             <FaTachometerAlt className={styles.icon} /> Dashboard
//           </Link>

//           {/* Category Dropdown */}
//           <div className={styles.dropdown}>
//             <div className={styles.dropdownToggle} onClick={toggleCategory}>
//               <span className={styles.dropdownLabel}>
//                 <FaThList className={styles.icon} /> Category
//               </span>
//               <FaChevronDown className={`${styles.chevron} ${isCategoryOpen ? styles.chevronOpen : ''}`} />
//             </div>
//             {isCategoryOpen && (
//               <div className={styles.dropdownMenu}>
//                 <Link
//                   to="/admin/plant-category"
//                   className={styles.navItem}
//                   onClick={handleLinkClick}
//                 >
//                   <PiPlantFill className={styles.icon} /> Plant Category
//                 </Link>
//                 <Link
//                   to="/admin/pot-category"
//                   className={styles.navItem}
//                   onClick={handleLinkClick}
//                 >
//                   <GiPorcelainVase className={styles.icon} /> Pot Category
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Products Dropdown */}
//           <div className={styles.dropdown}>
//             <div className={styles.dropdownToggle} onClick={toggleProduct}>
//               <span className={styles.dropdownLabel}>
//                 <AiFillProduct className={styles.icon} /> Products
//               </span>
//               <FaChevronDown className={`${styles.chevron} ${isProductOpen ? styles.chevronOpen : ''}`} />
//             </div>
//             {isProductOpen && (
//               <div className={styles.dropdownMenu}>
//                 <Link
//                   to="/admin/add-product"
//                   className={styles.navItem}
//                   onClick={handleLinkClick}
//                 >
//                   <FaPlus className={styles.icon} /> Product Add
//                 </Link>
//                 <Link
//                   to="/admin/product-list"
//                   className={styles.navItem}
//                   onClick={handleLinkClick}
//                 >
//                   <FaClipboardList className={styles.icon} /> Product List
//                 </Link>
//               </div>
//             )}
//           </div>

//           <Link to="/admin/offer-banner" className={styles.navItem} onClick={handleLinkClick}>
//             <FaImages className={styles.icon} /> Offer Banner
//           </Link>

//           <Link to="/admin/orders" className={styles.navItem} onClick={handleLinkClick}>
//             <FaShoppingCart className={styles.icon} /> Orders
//           </Link>

//           <Link to="/admin/workshop" className={styles.navItem} onClick={handleLinkClick}>
//             <GrWorkshop className={styles.icon} /> Workshop
//           </Link>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;