import React from "react";
import styles from "./TopNavbar.module.css";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className={styles.topNavbar}>
      <div className={styles.title}>
        <span>
          Free Delivery Above ₹499 | <Link to="/plants">Shop Now</Link>
        </span>
        <span>
          Buy Organic Fertilizers | <Link to="/plants">Shop Now</Link>
        </span>
        <span>
          Buy Our XL Plants | <Link to="/plants">Shop Now</Link>
        </span>
      </div>
    </div>
  );
};

export default TopNavbar;
