import { useEffect } from "react";
import styles from "./Contact.module.css";
import { Input, Textarea } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import banner4 from "../../assets/images/banner/banner4.jpeg";
import { CiLocationOn, CiPhone, CiMail } from "react-icons/ci";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareYoutube,
  // FaLinkedin,
  // FaSquareXTwitter,
} from "react-icons/fa6";

import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
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
      <div className={styles.contactBanner} data-aos="fade-up">
        <img
          className={styles.contactBannerImg}
          src={banner4} // Replace with actual image URL
          alt="Contact Banner"
        />
      </div>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumb} data-aos="fade-up">
        <a href="/">Home</a> / <span>Contact</span>
      </div>
      {/* <h1 className={styles.heading}>Contact Us</h1> */}

      <div className={styles.contactContainer}>
        <div className={styles.contactDetails}>
          <h3>Name</h3>
          <div className={styles.detailsName}>
            <p>Green Gifts, Nagpur.</p>
          </div>

          <h3>Founder</h3>
          <div className={styles.detailsName}>
            <p>Dr. Mrs. Manisha Kulkarni (Phd)</p>
            <p>Established in August 2017.</p>
          </div>

          <h3>Address</h3>
          <div className={styles.details}>
            <CiLocationOn />
            <address>Green Gifts, Nagpur</address>
          </div>

          <h3>Contact</h3>
          <div className={styles.details}>
            <CiPhone />
            <a href="tel:+91-7028917456">+91-7028917456</a>
          </div>

          <h3>Email</h3>
          <div className={styles.details}>
            <CiMail />
            <a href="mailto:info.greengiftsnagpur@gmail.com">
              info.greengiftsnagpur@gmail.com
            </a>
          </div>
          <div className={styles.details}>
            <CiMail />
            <a href="mailto:manisha.ak@gmail.com">manisha.ak@gmail.com</a>
          </div>

          <h3>FOLLOW US</h3>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/greengiftsnagpurbymanisha"
              target="_blank"
            >
              <FaSquareFacebook className={styles.socialIcon} />
            </a>
            <a
              href="https://www.instagram.com/greengiftsnagpur_by_manisha/"
              target="_blank"
            >
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
            </a>
            <a href="">
              <FaSquareXTwitter className={styles.socialIcon} />
            </a> */}
          </div>
        </div>

        <div className={styles.contactForm}>
          <h2 data-aos="zoom-in-up">Get in Touch</h2>
          <form>
            <Input type="text" name="name" placeholder="Your Name" required />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              required
            />
            <Textarea
              name="message"
              placeholder="Type Your Message ..."
              rows="4"
            />
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.744658423974!2d79.13445697471688!3d21.122743784544998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4b99d4acef023%3A0xca41b7c4a70141fd!2sTechgicus%20Software%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1744353855491!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
