import React, { useState } from "react";
import styles from "./AdminNavbar.module.css";
import logo from "../../../assets/logo2.png"
import { useNavigate, Link } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles.profileSection}`)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate(); // 👈 Use this for navigation

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token or session
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className={styles.navbar}>
      
      <Link to="/admin" className={styles.leftSection}>
        {/* <FiGift size={24} className={styles.icon} /> */}
        <h2 className={styles.logo}>
          <img src={logo} alt="Green Gifts Logo" />
        </h2>
      </Link>

      <div className={styles.rightSection}>
        {/* <div>
          <IoMoonOutline className={styles.icon} />
        </div> */}

        <div>
          <FaBell className={styles.icon} />
        </div>

        <div className={styles.profileSection} onClick={toggleDropdown}>
          <FaUserCircle className={styles.profileIcon} />
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li>My Profile</li>
                <li>Edit Profile</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
