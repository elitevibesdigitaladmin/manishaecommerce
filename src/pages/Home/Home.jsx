// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import config from "../../config/apiconfig";
// import Card from "../../components/Card/Card";
// import Carousel from "../../components/Carousel/Carousel";
// import { FaBox, FaSyncAlt, FaSeedling } from "react-icons/fa";
// import styles from "./Home.module.css";
// import Button from "../../components/Button/Button";
// import Testimonials from "../../components/Testimonials/Testimonials";
// import HomeBanner from "../../components/HomeBanner/HomeBanner";

// const Home = () => {
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
//   // console.log("Token:", token); // Debugging to confirm the token

//   // const navigate = useNavigate(); // Hook for navigation
//   const [plant, setPlant] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const navigate = useNavigate();

//   // Fetch Banners
//   useEffect(() => {
//     async function getAllBanners() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
//           headers: {
//             // Authorization: `Bearer ${tokenData}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("Banners API Response:", response.data); // Log the response for debugging
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           // Adjust this mapping based on the actual API response structure
//           const bannerUrls = response.data
//             .map((banner) => {
//               // Check if the banner object has a URL field; adjust the field name if necessary
//               if (!banner.url) {
//                 console.warn("Banner missing URL:", banner);
//                 return null; // Skip banners without a URL
//               }
//               return banner.url;
//             })
//             .filter(Boolean); // Remove null values

//           if (bannerUrls.length > 0) {
//             setBanners(bannerUrls);
//           } else {
//             console.warn("No valid banner URLs found.");
//             setBanners([]); // Set to empty array if no valid URLs
//           }
//         } else {
//           console.warn("No banners found.");
//           setBanners([]); // Set to empty array if no banners
//         }
//       } catch (error) {
//         console.error(
//           "Error fetching banners:",
//           error.response?.data || error.message
//         );
//         setBanners([]); // Set to empty array on error
//       }
//     }
//     getAllBanners();
//   }, [tokenData]);

//   const handlePassId = (id) => {
//     if (!id) {
//       console.error("Invalid variant ID:", id); // Debugging log
//       return;
//     }
//     navigate(`/product/${id}`);
//   };

//   // Display only the first 4 products
//   const displayedProducts = plant.slice(0, 4);

//   // Gifting Section Data
//   const gifts = [
//     {
//       id: 1,
//       image: "https://natalielinda.com/wp-content/uploads/2019/06/pothos.jpg",
//       title: "Bestsellers",
//     },
//     {
//       id: 2,
//       image: "https://ww1.prweb.com/prfiles/2014/09/11/12164346/24848.jpg",
//       title: "Plants",
//     },
//     {
//       id: 3,
//       image:
//         "https://bloomscape.com/wp-content/uploads/2019/04/bloomscape_product-monstera-slate.jpg",
//       title: "Pots",
//     },
//     {
//       id: 4,
//       image: "https://ww1.prweb.com/prfiles/2014/09/11/12164346/24848.jpg",
//       title: "Ceramic Pots",
//     },
//   ];

//   //

//   const categories = [
//     {
//       id: 1,
//       title: "Plants",
//       image:
//         "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
//       link: "/plants", // Route for Plants
//     },
//     {
//       id: 2,
//       title: "Seeds",
//       image:
//         "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
//       link: "/seeds", // Route for Seeds
//     },
//     {
//       id: 3,
//       title: "Pots & Planters",
//       image:
//         "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
//       link: "/pots-planters", // Route for Pots & Planters
//     },
//     {
//       id: 4,
//       title: "Plant Care",
//       image:
//         "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
//       link: "/plant-care", // Route for Plant Care
//     },
//   ];

//   // const handleRedirect = (link) => {
//   //   navigate(link);
//   // };

//   return (
//     <>
//       <section className={styles.homeContainer}>
//         {/* <div>
//           <HomeBanner/>
//         </div> */}

//         {/* Carousel */}
//         <div className={styles.carouselWrapper}>
//           {banners.length > 0 ? (
//             <Carousel images={banners} />
//           ) : (
//             <div className={styles.noBanners}>
//               <p>No banners available at the moment.</p>
//             </div>
//           )}
//         </div>

//         {/* Products Features Section */}
//         <div className={styles.productFeatures}>
//           {/* <h2>Explore Our Collections</h2> */}
//           <div className={styles.giftingContainer}>
//             <div className={styles.giftList}>
//               {gifts.map((gift) => (
//                 <div key={gift.id} className={styles.giftCard}>
//                   <img
//                     src={gift.image}
//                     alt={gift.title}
//                     className={styles.giftImage}
//                   />
//                   <p className={styles.giftTitle}>{gift.title}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Our Best Picks */}
//         <section className={styles.bestPicksContainer}>
//           <h2 className={styles.bestPicksTitle}>Our Best Picks</h2>
//           <div className={styles.bestPicksGrid}>
//             {categories.map((category) => (
//               <Link
//                 to={category.link}
//                 key={category.id}
//                 className={styles.bestPickCard}
//               >
//                 <img
//                   src={category.image}
//                   alt={category.title}
//                   className={styles.bestPickImage}
//                 />
//                 <div className={styles.bestPickTitle}>{category.title}</div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Product Grid */}
//         <div className={styles.bestSellers}>
//           <h2>Our Best Sellers</h2>
//           <div className={styles.productGrid}>
//     {displayedProducts.map((product) => (
//       <Card
//         key={product.id} // ✅ Correct key usage
//         id={`product-${product.id}`} // ✅ Unique ID for better performance
//         image={product.imgUrls?.[0] || "default.jpg"} // ✅ Correct image path
//         title={product.name || "No Title"} // ✅ Corrected title
//         discount={product.discountedPrice || "N/A"} // ✅ Corrected discount
//         price={product.price || "N/A"} // ✅ Corrected price
//       />
//     ))}
//   </div>

//           {/* View All Button */}
//           <div className={styles.viewAllContainer}>
//             <Link className={styles.viewAllButton} to="/plants">
//               View All
//             </Link>
//           </div>
//         </div>

//         {/* <Button>View</Button> */}

//         {/* WhyGreenGifts section */}
//         <div className={styles.whySection}>
//           <h2 className={styles.heading}>Why Green Gifts?</h2>
//           <div className={styles.features}>
//             <div className={styles.feature}>
//               <FaBox className={styles.icon} />
//               <p>Secure and Recyclable Packaging</p>
//             </div>
//             <div className={styles.feature}>
//               <FaSyncAlt className={styles.icon} />
//               <p>Free Replacements if Damaged</p>
//             </div>
//             <div className={styles.feature}>
//               <FaSeedling className={styles.icon} />
//               <p>Self-Watering Pots with Every Plant</p>
//             </div>
//           </div>
//         </div>

//         {/* Testimonials */}
//         <Testimonials />

//         {/* About Green Gifts */}
//         <div className={styles.about}>
//           <h4>About Green Gifts</h4>
//           <p>
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
//             exercitationem hic, iusto at, veniam et rem minus, iste doloremque
//             dignissimos repellendus? Recusandae at odio amet? Odit unde quas
//             maxime quae! Lorem ipsum dolor, sit amet consectetur adipisicing
//             elit. Nisi, perferendis vero, veritatis magni eum quas eligendi odio
//             officia neque nulla tempore corrupti quis, accusamus exercitationem
//             esse itaque cupiditate quaerat in.
//           </p>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;

// ------------------------------------------------------

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import { FaGifts, FaTools, FaBox, FaSyncAlt, FaSeedling } from "react-icons/fa";
import { GiGardeningShears } from "react-icons/gi";

import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import Testimonials from "../../components/Testimonials/Testimonials";
import bestseller from "../../assets/images/img/bestseller.png";
import plant from "../../assets/images/img/plant.png";
import pots from "../../assets/images/img/pots.png";
import whiteceramic from "../../assets/images/img/whiteceramic.png";
import pot from "../../assets/images/img/pot.jpg";
import indoorPlants from "../../assets/images/img/indoorPlants.jpg";
import parentPlant from "../../assets/images/img/parentPlant.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  // Improved Token Handling
  const rawTokenData = localStorage.getItem("ecommerce_login");
  let tokenData;
  try {
    tokenData =
      rawTokenData && rawTokenData !== "undefined"
        ? JSON.parse(rawTokenData)
        : null;
  } catch (error) {
    console.error("Invalid token data in localStorage:", rawTokenData);
    tokenData = null;
  }

  const token = tokenData?.jwtToken || "";
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]); // Renamed from 'plant' to 'plants' for clarity
  const [banners, setBanners] = useState([]);

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

  // Refresh AOS when data loads
  useEffect(() => {
    AOS.refresh();
  }, [banners, plants]);

  // Fetch Banners
  // useEffect(() => {
  //   async function getAllBanners() {
  //     try {
  //       const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log("Banners API Response:", response.data);
  //       if (Array.isArray(response.data) && response.data.length > 0) {
  //         const bannerUrls = response.data
  //           .map((banner) => {
  //             if (!banner.image) {
  //               // Use banner.image
  //               console.warn("Banner missing image:", banner);
  //               return null;
  //             }
  //             return banner.image; // Return banner.image
  //           })
  //           .filter(Boolean);
  //         setBanners(bannerUrls.length > 0 ? bannerUrls : []);
  //       } else {
  //         console.warn("No banners found.");
  //         setBanners([]);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error fetching banners:",
  //         error.response?.data || error.message
  //       );
  //       setBanners([]);
  //     }
  //   }

  //   getAllBanners();
  // }, []);

  useEffect(() => {
  async function getAllBanners() {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        const bannerUrls = response.data
          .map((banner) => banner.image)
          .filter(Boolean); // Ensure no null values
        console.log("Fetched banners:", bannerUrls); // Debug here
        setBanners(bannerUrls);
      } else {
        console.warn("No banners found.");
        setBanners([]);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setBanners([]);
    }
  }
  getAllBanners();
}, []);


  // Fetch Products
  useEffect(() => {
    async function fetchPlants() {
      try {
        // Conditionally set headers based on token availability
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers,
        });
        console.log("API Response:", response.data);
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        // Optionally, you can handle error if needed
        setPlants([]);
      }
    }
    fetchPlants();
  }, [token]);

  // Display only the first 4 products
  const displayedProducts = plants.slice(0, 4);

  // Gifting Section Data
  const gifts = [
    {
      id: 1,
      image: bestseller,
      title: "Bestsellers",
    },
    {
      id: 2,
      image: plant,
      title: "Plants",
    },
    {
      id: 3,
      image: pots,
      title: "Pots",
    },
    {
      id: 4,
      image: whiteceramic,
      title: "Ceramic Pots",
    },
  ];

  const categories = [
    {
      id: 1,
      title: "Plants Collections",
      image: indoorPlants,
      link: "/plants",
      description:
        "A curated range of beautiful, low-maintenance plants—perfect for homes, offices, and gifting.",
    },
    {
      id: 2,
      title: "Pots & Planters Collections",
      image: pot,
      link: "/pots-planters",
      description:
        "Stylish ceramic, terracotta, and designer pots to complement every plant and space.",
    },
  ];

  return (
    <>
      <section className={styles.homeContainer}>
        {/* Carousel */}
        <div
          className={styles.carouselWrapper}
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {banners.length > 0 ? (
            // <Carousel images={banners} />
          <Carousel banners={banners} />
            
          ) : (
            <div className={styles.noBanners}>
              <p>No banners available at the moment.</p>
            </div>
          )}
        </div>

        {/* Products Features Section */}
        <div className={styles.productFeatures}>
          <div className={styles.giftingContainer}>
            <div className={styles.giftList} data-aos="fade-up">
              {gifts.map((gift, index) => (
                <div
                  key={gift.id}
                  className={styles.giftCard}
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <img
                    src={gift.image}
                    alt={gift.title}
                    className={styles.giftImage}
                  />
                  <p className={styles.giftTitle}>{gift.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.miniHeading}>
          <h2 className={styles.heading} data-aos="zoom-in-up">
            Welcome to Green Gifts Nagpur
          </h2>

          <i className={styles.headPara}>
            {" "}
            Your one-stop destination for all things green and beautiful! As a
            premier plant boutique and nursery, we're passionate about helping
            you connect with nature and share that love with others.
          </i>
        </div>

        {/* Our Best Picks */}
        <section className={styles.bestSellers}>
          <h2 className={styles.heading} data-aos="zoom-in-up">
            Our Best Picks
          </h2>
          <div className={styles.bestSellersGrid} data-aos="fade-up">
            {categories.map((category, index) => (
              <Link
                to={category.link}
                key={category.id}
                className={styles.bestSellerCard}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.bestSellerImage}
                />
                <div className={styles.bestSellerContent}>
                  <h3 className={styles.bestSellerTitle}>{category.title}</h3>
                  <p className={styles.bestSellerDescription}>
                    {category.description}
                  </p>
                  {/* <Link to={category.link} className={styles.viewAllButton}>
                    View All
                  </Link> */}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <div className={styles.bestSellers}>
          <h2 data-aos="zoom-in-up">Best Sellers</h2>
          <div className={styles.productGrid}>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((plant) => {
                const firstVariant = plant.variants?.[0] || {}; // Use first variant for display
                return (
                  // <div className={styles.cardComp} >
                  // <Card
                  //   key={plant.id}
                  //   id={plant.id} // Pass parent product ID
                  //   image={
                  //     firstVariant.imageUrls?.[0] ||
                  //     "https://via.placeholder.com/150"
                  //   }
                  //   title={plant.name || "No Title"}
                  //   category={plant.category}
                  //   price={firstVariant.price || "N/A"}
                  //   discount={firstVariant.discountedPrice || null}
                  //   product={plant} // ✅ Pass full product object
                  //   selectedVariant={firstVariant} // ✅ Pass selected variant
                  // />

                  <Card
  key={plant.id}
  id={plant.id}
  image={
    plant.variants?.[0]?.imageUrls?.[0] ||
    plant.terrariumImg ||
    "https://via.placeholder.com/150"
  }
  title={plant.name || "No Title"}
  category={plant.category}
  price={
    plant.variants?.[0]?.price ??
    plant.terrariumPrice ??
    "N/A"
  }
  discount={
    plant.variants?.[0]?.discountedPrice ??
    (plant.terrariumPrice ? plant.terrariumPrice : null)
  }
  product={plant}
  selectedVariant={plant.variants?.[0]}
/>

                  //  </div>
                );
              })
            ) : (
              <p>No products available at the moment.</p>
            )}
          </div>

          {/* View All Button */}
          <div className={styles.viewAllContainer} data-aos="fade-up">
            <Link className={styles.viewAllButton} to="/plants">
              View All
            </Link>
          </div>
        </div>

        {/* WhyGreenGifts section */}
        <div className={styles.whySection} data-aos="fade-up">
          <h2 className={styles.heading} data-aos="zoom-in-up">
            Why Green Gifts?
          </h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <FaGifts className={styles.icon} />
              <p>Green Gifting Solutions</p>
            </div>
            <div className={styles.feature}>
              <FaTools className={styles.icon} />
              <p>Garden Accessories</p>
            </div>
            <div className={styles.feature}>
              <FaSeedling className={styles.icon} />
              <p>Plant Care</p>
            </div>
            <div className={styles.feature}>
              <FaSyncAlt className={styles.icon} />
              <p>Gardening Services</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Plant Parent Rewards Club Section */}
        <section className={styles.rewardsClub} data-aos="fade-up">
          <div className={styles.rewardsClubContainer}>
            <div className={styles.rewardsClubText}>
              <h2 data-aos="zoom-in-up">Featured Pots & Planters</h2>
              <p>
                Every plant purchase is a gift that keeps on giving. Earn coins
                and redeem them for exclusive discounts.
              </p>
              <div className={styles.rewardsClubButtons}>
                <Link to="/pots-planters" className={styles.rewardsButton}>
                  View More
                </Link>
                <Link to="/contact-us" className={styles.rewardsButton}>
                  Contact Us
                </Link>
              </div>
            </div>
            <div className={styles.rewardsClubImage} data-aos="zoom-in">
              <img src={parentPlant} alt="Plant Parent Rewards Club" />
            </div>
          </div>
        </section>

        {/* About Green Gifts */}
        <div className={styles.about} data-aos="fade-up">
          <h4 className={styles.heading} data-aos="zoom-in-up">
            About Green Gifts
          </h4>
          <p>
            Welcome to Green Gifts Nagpur, your one-stop destination for all
            things green and beautiful! As a premier plant boutique and nursery,
            we're passionate about helping you connect with nature and share
            that love with others. Explore our curated collection of exquisite
            plants, carefully selected to bring joy, serenity, and freshness to
            any space. From elegant green gifts to customized plant
            arrangements, we'll help you find the perfect way to express
            yourself. At Green Gifts Nagpur, we're dedicated to providing
            exceptional garden services, expert advice, and personalized support
            to help you create your own oasis. Whether you're looking for a
            thoughtful gift, a stunning addition to your home or office, or
            simply a way to nurture your love for plants, we're here to help.
            Browse through our website to discover the beauty of nature, and let
            us help you grow your love for plants!"
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
