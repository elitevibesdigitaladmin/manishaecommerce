import React, { useEffect } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";

const Footer = () => {
  
// AOS Init
useEffect(() => {
  AOS.init({
    duration: 500,
    offset: 100,
    easing: "ease-in-out",
    delay: 0,
    once: true,
  });
}, []);

  return (
    <footer className={styles.footer} data-aos="fade-up">
      {/* <div className={styles.topSection}>
        <div className={styles.cities}>
          <a href="#">Mumbai</a>
          <a href="#">Pune</a>
          <a href="#">Delhi</a>
          <a href="#">Bangalore</a>
          <a href="#">Hyderabad</a>
          <a href="#">Chennai</a>
          <a href="#">Kolkata</a>
        </div>
      </div> */}

      <div className={styles.mainSection}>
        <div className={styles.column}>
          <h4>ABOUT US</h4>
          <ul>
            <li>Careers</li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>Locate Stores</li>
            <li>
              <Link to="/gardening-services">Garden Services & Maintenance</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>CUSTOMER CARE</h4>
          <ul>
            {/* <li>Take The Plant Quiz</li> */}
            <li>Track Order</li>
            <li>Shipping Policy</li>
            <li>FAQs</li>
            <li>Refund policy</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>OFFERS & REWARDS</h4>
          <ul>
            <li>Plant Parent Rewards Club</li>
            <li>Green Gifts Coupons</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>GET IN TOUCH</h4>
          <ul>
            <li>
              WhatsApp us at: <a href="tel:+91-7028917456">+91-7028917456</a>
            </li>
            <li>
              Call: <a href="tel:+91-7028917456">+91-7028917456</a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:info.greengiftsnagpur@gmail.com">info.greengiftsnagpur@gmail.com</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>FOLLOW US</h4>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/greengiftsnagpurbymanisha" target="_blank">
              <FaSquareFacebook className={styles.socialIcon} />
            </a>
            <a href="https://www.instagram.com/greengiftsnagpur_by_manisha/" target="_blank">
              <FaSquareInstagram className={styles.socialIcon} />
            </a>
            <a href="https://wa.me/+917028917456" target="_blank">
              <FaSquareWhatsapp className={styles.socialIcon} />
            </a>
            <a href="" target="_blank">
              <FaSquareYoutube className={styles.socialIcon} />
            </a>
            {/* <a href="">
              <FaLinkedin className={styles.socialIcon} />
            </a> */}
            {/* <a href="">
              <FaSquareXTwitter className={styles.socialIcon} />
            </a> */}
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>
          © 2025,&nbsp;
          <a href="/">Green Gifts.</a>&nbsp; All rights reserved.
        </p>
        <div className={styles.paymentIcons}>
          {/* <img src="visa.png" alt="Visa" />
          <img src="mastercard.png" alt="MasterCard" />
          <img src="amex.png" alt="Amex" />
          <img src="gpay.png" alt="Google Pay" />
          <img src="shop.png" alt="Shop" />
          <img src="paypal.png" alt="Paypal" /> */}
        </div>
      </div>

      {/* <div className={styles.whatsappIcon}>
        <FaWhatsapp />
      </div> */}
    </footer>
  );
};

export default Footer;
