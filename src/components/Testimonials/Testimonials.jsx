import React, { useState, useEffect } from "react";
import styles from "./Testimonials.module.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import test1 from "../../assets/images/test/test1.jpg";
import test2 from "../../assets/images/test/test2.jpg";
import test3 from "../../assets/images/test/test3.jpg";

const testimonials = [
  {
    id: 1,
    image: test1,
    name: "Ankit",
    review:
      "The plant was mature, tall as promised with a healthy growth... it was well hydrated and full of nodes. The packaging was great! I'll be happy to buy it again.",
  },
  {
    id: 2,
    image: test2,
    name: "Veena",
    review:
      "I loved the quality of the plant, and the packaging was excellent. Delivered on time and in great condition! Highly recommend.",
  },
  {
    id: 3,
    image: test3,
    name: "Faizan",
    review:
      "This was my first time ordering a plant online, and I was amazed by the quality. The leaves were fresh, and the soil was well-packed.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Automatic sliding effect
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

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
    <div className={styles.testimonialContainer} data-aos="fade-up">
      <h2 className={styles.title}>Our Happy Plant Parents</h2>

      {/* Profile Images + Arrows */}
      <div className={styles.imageWrapper}>
        <FaArrowLeft onClick={prevTestimonial} className={styles.arrow} />

        <img
          src={testimonials[index].image}
          alt={testimonials[index].name}
          className={styles.profileImage}
        />

        <FaArrowRight onClick={nextTestimonial} className={styles.arrow} />
      </div>

      {/* Star Ratings */}
      <div className={styles.stars}>
        {Array(5)
          .fill()
          .map((_, i) => (
            <FaStar key={i} />
          ))}
      </div>

      {/* Review Content */}
      <p className={styles.review}>{testimonials[index].review}</p>
      <p className={styles.name}>— {testimonials[index].name}</p>
    </div>
  );
};

export default Testimonials;
