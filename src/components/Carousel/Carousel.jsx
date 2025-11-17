import { useState, useEffect } from "react";
import styles from "./Carousel.module.css";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Carousel = ({ banners, autoSlide = true, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide Logic
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(() => {
      goToNext();
    }, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [currentIndex, autoSlide, autoSlideInterval]);

  // Navigate to Previous Slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // Navigate to Next Slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

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
    <div className={styles.carousel} data-aos="fade-up">
      <div className={styles.imageWrapper}>
        {/* Loop through banners array to display each image */}
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`${styles.carouselImageWrapper} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            {/* Check if the banner has an image and render it */}
            <img
              src={banner} // Assuming 'banner' is the image URL
              alt={`Slide ${index + 1}`}
              className={`${styles.carouselImage} ${
                index === currentIndex ? styles.active : ""
              }`}
            />
            <div className={styles.bannerContent}>
              {/* Optionally, you can display a title, description, or any other content */}
              {/* <h2>Banner {index + 1}</h2>
              <p>Up to 20% off</p> */}
              <a href={`/offers`} className={styles.shopNowButton}>
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <FaCaretLeft
        onClick={goToPrevious}
        className={styles.prevButton}
        aria-label="Previous Slide"
      />
      
      {/* Next Button */}
      <FaCaretRight
        onClick={goToNext}
        className={styles.nextButton}
        aria-label="Next Slide"
      />

      {/* Dots Indicator */}
      <div className={styles.dotsContainer}>
        {banners.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;


// import { useState, useEffect } from "react";
// import styles from "./Carousel.module.css";
// import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Carousel = ({ images, autoSlide = true, autoSlideInterval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto slide logic
//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(() => {
//       goToNext();
//     }, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [currentIndex, autoSlide, autoSlideInterval]);

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//    // AOS Init
//     useEffect(() => {
//       AOS.init({
//         duration: 500,
//         offset: 100,
//         easing: "ease-in-out",
//         delay: 0,
//         once: true,
//       });
//     }, []);
  

//   return (
//     <div className={styles.carousel} data-aos="fade-up">
//       <div className={styles.imageWrapper}>
//         {images.map((src, index) => (
        
//           <img
//             key={index}
//             src={src}
//             alt={`Slide ${index + 1}`}
//             className={`${styles.carouselImage} ${
//               index === currentIndex ? styles.active : ""
//             }`}
//           />
          
        
//         ))}
        
//       </div>

//       <FaCaretLeft
//         onClick={goToPrevious}
//         className={styles.prevButton}
//         aria-label="Previous Slide"
//       />
//       <FaCaretRight
//         onClick={goToNext}
//         className={styles.nextButton}
//         aria-label="Next Slide"
//       />

//       <div className={styles.dotsContainer}>
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`${styles.dot} ${
//               index === currentIndex ? styles.activeDot : ""
//             }`}
//             onClick={() => setCurrentIndex(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
