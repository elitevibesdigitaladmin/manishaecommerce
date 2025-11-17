import React, { useEffect } from "react";
import styles from "./Services.module.css";
import Button from "../../components/Button/Button";
import banner4 from "../../assets/images/banner/banner4.jpeg";
import gifting from "../../assets/images/img/gifting.jpg";
import accessories from "../../assets/images/img/accessories.jpg";
import plant_care from "../../assets/images/img/plant_care.jpg";
import decor_plants from "../../assets/images/img/decor_plants.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Services = () => {
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
    <>
      {/* Banner */}
      <div className={styles.servicesBanner} data-aos="fade-up">
        <img 
          className={styles.servicesBannerImg}
          src={banner4} // Replace with actual image URL
          alt="Services Banner"
        />
      </div>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumb} data-aos="fade-up">
        <a href="/">Home</a> / <span>Gardening Services</span>
      </div>
      {/* <h1 className={styles.heading}>We Offer</h1> */}

      <section className={styles.services} data-aos="fade-up">
        <div className={styles.servicesContainer} data-aos="fade-up">
          <div className={styles.servicesText}>
            <h2>🎁 Green Gifting Solutions</h2>
            <ul>
              <li>Potted plants in ceramic planters</li>
              <li>Miniature gardens</li>
              <li>Terrariums</li>
            </ul>
            <Link to="/contact-us" className={styles.linkBtn} >Learn More</Link>
          </div>
          <div className={styles.servicesImage} data-aos="zoom-in">
            <img src={gifting} alt="Plant Gifting" />
          </div>
        </div>

        <div className={styles.servicesContainer} data-aos="fade-up">
          <div className={styles.servicesImage} data-aos="zoom-in">
            <img src={accessories} alt="Garden Accessories" />
          </div>
          <div className={styles.servicesText}>
            <h2>🪴 Garden Accessories</h2>
            <ul>
              <li>Ceramic pots</li>
              <li>
                Exclusive ceramic planters from <strong>Harla Arts</strong>
              </li>
              <li>Big sized ceramic planters</li>
              <li>Terracotta planters</li>
              <li>Terracotta urns for big gardens</li>
            </ul>
            <Link to="/contact-us" className={styles.linkBtn}>Learn More</Link>
          </div>
        </div>

        <div className={styles.servicesContainer} data-aos="fade-up">
          <div className={styles.servicesText}>
            <h2>🌿 Plant Care</h2>
            <ul>
              <li>Pot Mix</li>
              <li>Organic Manures</li>
              <li>Fertilizers</li>
              <li>Garden Tools</li>
            </ul>
            <Link to="/contact-us" className={styles.linkBtn}>Learn More</Link>
          </div>
          <div className={styles.servicesImage} data-aos="zoom-in">
            <img src={plant_care} alt="Plant Parent Rewards Club" />
          </div>
        </div>

        <div className={styles.servicesContainer} data-aos="fade-up">
          <div className={styles.servicesImage} data-aos="zoom-in">
            <img src={decor_plants} alt="Plant Parent Rewards Club" />
          </div>
          <div className={styles.servicesText}>
            <h2>🏡 Gardening Services</h2>
            <ul>
              <li>Plant setup in offices and residences</li>
              <li>Vertical Gardens</li>
              <li>Terrace Gardens</li>
              <li>Landscapes</li>
            </ul>
            <Link to="/contact-us" className={styles.linkBtn}>Learn More</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
