
// // import React, { useEffect, useState } from "react";
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import config from "../../config/apiconfig";
// // import styles from "./ProductDetails.module.css";
// // import { useCart } from "../../context/CartContext";
// // import { toast } from "react-toastify"; 
// // import { BsCartCheck } from "react-icons/bs";
// // import { MdCurrencyRupee } from "react-icons/md";
// // import Button from "../../components/Button/Button";


// // const ProductDetails = () => {
// //   const { addToCart } = useCart();
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [product, setProduct] = useState(null);
// //   const [selectedVariant, setSelectedVariant] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [quantity, setQuantity] = useState(1);

// //   // Get Product Details-ByID

// //   useEffect(() => {
// //     async function getProductById() {
// //       try {
// //         const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //         const token = tokenData?.jwtToken;
  
// //         const headers = token
// //           ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
// //           : { "Content-Type": "application/json" };
  
// //         const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
// //           headers,
// //         });
  
// //         setProduct(response.data);
// //         const initialVariant = response.data.variants?.[0] || {};
// //         setSelectedVariant(initialVariant);
// //         setSelectedImage(initialVariant.imageUrls?.[0] || null);
// //         setLoading(false);
// //       } catch (error) {
// //         setError(`Failed to load product details: ${error.message}`);
// //         setLoading(false);
// //       }
// //     }
  
// //     if (id) getProductById();
// //   }, [id]);
  

// //   const handleVariantChange = (variant) => {
// //     setSelectedVariant(variant);
// //     setSelectedImage(variant.imageUrls?.[0] || null);
// //   };
  
// //   const handleIncrement = () => {
// //     setQuantity((prev) => prev + 1);
// //   };

// //   const handleDecrement = () => {
// //     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
// //   };

// //   const handleAddToCart = async () => {
// //     if (!product || !selectedVariant) {
// //       toast.error("Please select a valid product or variant.");
// //       return;
// //     }
  
// //     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //     const token = tokenData?.jwtToken;
  
// //     const cartItem = {
// //       id: product.id,
// //       variantId: selectedVariant.id,
// //       name: product.name,
// //       price: selectedVariant.price,
// //       image: selectedVariant.imageUrls?.[0] || "",
// //       quantity,
// //     };
  
// //     if (token) {
// //       // User is logged in → Add item via API (Optional)
// //       try {
// //         await addToCart(product, selectedVariant.id, quantity);
// //         toast.success(`${product.name} added to cart!`);
// //       } catch (error) {
// //         console.error("Failed to add product to cart:", error);
// //         toast.error("Failed to add product to cart.");
// //       }
// //     } else {
// //       // Guest user → Store cart in localStorage
// //       const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
// //       const updatedCart = [...existingCart, cartItem];
// //       localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
// //       toast.success("Added to cart!");
// //     }
// //   };
  

// //   // const handleAddToCart = async () => {
// //   //   if (!product || !selectedVariant) {
// //   //     toast.error("Please select a valid product or variant.", {
// //   //       position: "top-right",
// //   //       autoClose: 3000,
// //   //     });
// //   //     return;
// //   //   }

// //   //   try {
// //   //     await addToCart(product, selectedVariant.id, quantity);
// //   //     toast.success(
// //   //       `${product.name} added to cart!`,
// //   //       {
// //   //         position: "top-right",
// //   //         autoClose: 3000,
// //   //       }
// //   //     );
// //   //   } catch (error) {
// //   //     console.error("Failed to add product to cart:", error);
// //   //     toast.error("Failed to add product to cart.", {
// //   //       position: "top-right",
// //   //       autoClose: 3000,
// //   //     });
// //   //   }
// //   // };

  

// //   if (loading) return <p className={styles.loading}>Loading...</p>;
// //   if (error) return <p className={styles.error}>{error}</p>;
// //   if (!product) return <p className={styles.error}>No product found.</p>;

// //   return (
// //     <div className={styles.container}>
// //       <nav className={styles.breadcrumbs}>
// //         <Link to="/" className={styles.breadcrumbLink}>Home</Link>
// //         <span className={styles.breadcrumbSeparator}>›</span>
// //         <Link to="/plants" className={styles.breadcrumbLink}>Products</Link>
// //         <span className={styles.breadcrumbSeparator}>›</span>
// //         <span className={styles.breadcrumbActive}>{product.name}</span>
// //       </nav>

// //       <div className={styles.productContainer}>
// //         <div className={styles.imageSection}>
// //           {selectedImage ? (
// //             <img src={selectedImage} alt={product.name} className={styles.mainImage} />
// //           ) : (
// //             <p>No images available</p>
// //           )}
// //         </div>

// //         <div className={styles.detailsSection}>
// //           <h1 className={styles.title}>{product.name}</h1>
// //           <p className={styles.category}><strong>Category:</strong> {product.category}</p>
// //           <p className={styles.description}><strong>Description:</strong> {product.description}</p>
// //           <div className={styles.priceSection}>
// //           <p className={styles.price}> <strong>Price:</strong> ₹{selectedVariant.price}</p>
// //           <p className={styles.stock}> <BsCartCheck/> <strong>In Stock</strong> </p>{/* {selectedVariant.qty} */}
// //           </div>
          
// //           {product.variants?.length > 0 && (
// //             <div className={styles.variants}>
// //               <h3 className={styles.variantTitle}>Select Variant:</h3>
// //               <div className={styles.variantOptions}>
// //                 {product.variants.map((variant, index) => (
// //                   <button
// //                     key={index}
// //                     className={`${styles.variantButton} ${selectedVariant === variant ? styles.variantButtonActive : ""}`}
// //                     onClick={() => handleVariantChange(variant)}
// //                   >
// //                     Color: {variant.color} & Size: {variant.size}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}


// // <div className={styles.quantitySection}>
// //             <Button
// //               className={styles.quantityButton}
// //               onClick={handleDecrement}
// //               disabled={quantity <= 1}
// //             >
// //               -
// //             </Button>
// //             <span className={styles.quantity}>{quantity}</span>
// //             <Button
// //               className={styles.quantityButton}
// //               onClick={handleIncrement}
// //               disabled={quantity >= selectedVariant.qty}
// //             >
// //               +
// //             </Button>
// //           </div>

// //           <Button onClick={handleAddToCart}>Add to Cart</Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;
// // ==============================



// // import React, { useEffect, useState } from "react";
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import config from "../../config/apiconfig";
// // import styles from "./ProductDetails.module.css";
// // import { useCart } from "../../context/CartContext";
// // import { toast } from "react-toastify"; 
// // import { BsCartCheck } from "react-icons/bs";
// // import Button from "../../components/Button/Button";

// // const ProductDetails = () => {
// //   const { addToCart } = useCart();
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [product, setProduct] = useState(null);
// //   const [selectedVariant, setSelectedVariant] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [quantity, setQuantity] = useState(1);

// //   useEffect(() => {
// //     async function fetchProduct() {
// //       try {
// //         const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //         const token = tokenData?.jwtToken;

// //         const headers = token
// //           ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
// //           : { "Content-Type": "application/json" };

// //         const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
// //           headers,
// //         });

// //         const data = response.data;
// //         setProduct(data);
// //         console.log(data);
// //         const defaultVariant = data.variants?.[0];
// //         setSelectedVariant(defaultVariant);
// //         setSelectedImage(defaultVariant?.imageUrls?.[0] || null);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(`Failed to load product details: ${err.message}`);
// //         setLoading(false);
// //       }
// //     }

// //     if (id) fetchProduct();
// //   }, [id]);

// //   const handleVariantChange = (variant) => {
// //     setSelectedVariant(variant);
// //     setSelectedImage(variant.imageUrls?.[0] || null);
// //   };

// //   const handleIncrement = () => {
// //     setQuantity((prev) => (prev < selectedVariant.qty ? prev + 1 : prev));
// //   };

// //   const handleDecrement = () => {
// //     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
// //   };

// //   const handleAddToCart = async () => {
// //     if (!product || !selectedVariant) {
// //       toast.error("Please select a valid product or variant.");
// //       return;
// //     }

// //     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //     const token = tokenData?.jwtToken;

// //     const cartItem = {
// //       id: product.id,
// //       variantId: selectedVariant.id,
// //       name: product.name,
// //       price: selectedVariant.price,
// //       image: selectedImage || "",
// //       quantity,
// //     };

// //     try {
// //       if (token) {
// //         await addToCart(product, selectedVariant.id, quantity);
// //         toast.success(`${product.name} added to cart!`);
// //       } else {
// //         const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
// //         const updatedCart = [...existingCart, cartItem];
// //         localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
// //         toast.success("Added to cart!");
// //       }
// //     } catch (error) {
// //       console.error("Failed to add product to cart:", error);
// //       toast.error("Failed to add product to cart.");
// //     }
// //   };

// //   if (loading) return <p className={styles.loading}>Loading...</p>;
// //   if (error) return <p className={styles.error}>{error}</p>;
// //   if (!product) return <p className={styles.error}>No product found.</p>;

// //   return (
// //     <div className={styles.container}>
// //       <nav className={styles.breadcrumbs}>
// //         <Link to="/" className={styles.breadcrumbLink}>Home</Link>
// //         <span className={styles.breadcrumbSeparator}>›</span>
// //         <Link to="/plants" className={styles.breadcrumbLink}>Products</Link>
// //         <span className={styles.breadcrumbSeparator}>›</span>
// //         <span className={styles.breadcrumbActive}>{product.name}</span>
// //       </nav>

// //       <div className={styles.productContainer}>
// //         <div className={styles.imageSection}>
// //           {selectedImage ? (
// //             <img src={selectedImage} alt={product.name} className={styles.mainImage} />
// //           ) : (
// //             <p>No images available</p>
// //           )}
// //         </div>

// //         <div className={styles.detailsSection}>
// //           <h1 className={styles.title}>{product.name}</h1>
// //           <p className={styles.category}><strong>Category:</strong> {product.category}</p>
// //           <p className={styles.description}><strong>Description:</strong> {product.description}</p>

// //           <div className={styles.priceSection}>
// //             <p className={styles.price}><strong>Price:</strong> ₹{selectedVariant?.price}</p>
// //             <p className={styles.stock}><BsCartCheck /> <strong>In Stock</strong></p>
// //           </div>

// //           {product.variants?.length > 0 && (
// //             <div className={styles.variants}>
// //               <h3 className={styles.variantTitle}>Select Variant:</h3>
// //               <div className={styles.variantOptions}>
// //                 {product.variants.map((variant, index) => (
// //                   <button
// //                     key={index}
// //                     className={`${styles.variantButton} ${selectedVariant === variant ? styles.variantButtonActive : ""}`}
// //                     onClick={() => handleVariantChange(variant)}
// //                   >
// //                     Color: {variant.color} & Size: {variant.size}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           <div className={styles.quantitySection}>
// //             <Button onClick={handleDecrement} disabled={quantity <= 1}>-</Button>
// //             <span className={styles.quantity}>{quantity}</span>
// //             <Button onClick={handleIncrement} disabled={quantity >= selectedVariant.qty}>+</Button>
// //           </div>

// //           <Button onClick={handleAddToCart}>Add to Cart</Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;


// // ========================================

// // import React, { useEffect, useState } from "react";
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import config from "../../config/apiconfig";
// // import styles from "./ProductDetails.module.css";
// // import { useCart } from "../../context/CartContext";
// // import { toast } from "react-toastify";
// // import { BsCartCheck } from "react-icons/bs";
// // import Button from "../../components/Button/Button";

// // const ProductDetails = () => {
// //   const { addToCart } = useCart();
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [product, setProduct] = useState(null);
// //   const [selectedVariant, setSelectedVariant] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [quantity, setQuantity] = useState(1);

// //   const isVariantBased = product?.variants?.length > 0; // Check if product has variants
// //   const isTerrarium = product?.type === "TERRARIUM";

// //   useEffect(() => {
// //     async function fetchProduct() {
// //       try {
// //         const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //         const token = tokenData?.jwtToken;

// //         const headers = token
// //           ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
// //           : { "Content-Type": "application/json" };

// //         const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
// //           headers,
// //         });

// //         const data = response.data;
// //         setProduct(data);

// //         if (isVariantBased) {
// //           const defaultVariant = data.variants?.[0];
// //           setSelectedVariant(defaultVariant);
// //           setSelectedImage(defaultVariant?.imageUrls?.[0] || null);
// //         } else if (isTerrarium) {
// //           setSelectedImage(data.terrariumImg || null);
// //         }

// //         setLoading(false);
// //       } catch (err) {
// //         setError(`Failed to load product details: ${err.message}`);
// //         setLoading(false);
// //       }
// //     }

// //     if (id) fetchProduct();
// //   }, [id]);

// //   const handleVariantChange = (variant) => {
// //     setSelectedVariant(variant);
// //     setSelectedImage(variant.imageUrls?.[0] || null);
// //   };

// //   const handleIncrement = () => {
// //     if (isVariantBased) {
// //       setQuantity((prev) => (prev < selectedVariant.qty ? prev + 1 : prev));
// //     } else if (isTerrarium) {
// //       setQuantity((prev) => (prev < product.terrariumQty ? prev + 1 : prev));
// //     }
// //   };

// //   const handleDecrement = () => {
// //     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
// //   };

// //   const handleAddToCart = async () => {
// //     if (!product) return;

// //     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //     const token = tokenData?.jwtToken;

// //     const cartItem = {
// //       id: product.id,
// //       name: product.name,
// //       price: isVariantBased ? selectedVariant.price : product.terrariumPrice,
// //       image: selectedImage || "",
// //       quantity,
// //       variantId: isVariantBased ? selectedVariant.id : null,
// //     };

// //     try {
// //       if (token) {
// //         if (isVariantBased && selectedVariant) {
// //           await addToCart(product, selectedVariant.id, quantity);
// //         } else if (isTerrarium) {
// //           await addToCart(product, null, quantity);
// //         }
// //         toast.success(`${product.name} added to cart!`);
// //       } else {
// //         const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
// //         const updatedCart = [...existingCart, cartItem];
// //         localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
// //         toast.success("Added to cart!");
// //       }
// //     } catch (error) {
// //       console.error("Failed to add product to cart:", error);
// //       toast.error("Failed to add product to cart.");
// //     }
// //   };

// //   if (loading) return <p className={styles.loading}>Loading...</p>;
// //   if (error) return <p className={styles.error}>{error}</p>;
// //   if (!product) return <p className={styles.error}>No product found.</p>;

// //   return (
// //     <div className={styles.container}>
// //       <nav className={styles.breadcrumbs}>
// //         <Link to="/" className={styles.breadcrumbLink}>Home</Link>
// //         <span className={styles.breadcrumbSeparator}>›</span>
// //         <Link to="/plants" className={styles.breadcrumbLink}>Products</Link>
// //         <span className={styles.breadcrumbSeparator}>›</span>
// //         <span className={styles.breadcrumbActive}>{product.name}</span>
// //       </nav>

// //       <div className={styles.productContainer}>
// //         <div className={styles.imageSection}>
// //           {selectedImage ? (
// //             <img src={selectedImage} alt={product.name} className={styles.mainImage} />
// //           ) : (
// //             <p>No images available</p>
// //           )}
// //         </div>

// //         <div className={styles.detailsSection}>
// //           <h1 className={styles.title}>{product.name}</h1>
// //           <p className={styles.category}><strong>Category:</strong> {product.category}</p>
// //           <p className={styles.description}><strong>Description:</strong> {product.description}</p>

// //           {product.sustainabilityInfo && (
// //             <div className={styles.sustainability}>
// //               <h3>Sustainability Info:</h3>
// //               <p>{product.sustainabilityInfo}</p>
// //             </div>
// //           )}

// //           <div className={styles.priceSection}>
// //             <p className={styles.price}>
// //               <strong>Price:</strong> ₹{isVariantBased ? selectedVariant?.price : product.terrariumPrice}
// //             </p>
// //             <p className={styles.stock}><BsCartCheck /> <strong>In Stock</strong></p>
// //           </div>

// //           {/* Handle variant-based product */}
// //           {isVariantBased && product.variants?.length > 0 && (
// //             <div className={styles.variants}>
// //               <h3 className={styles.variantTitle}>Select Variant:</h3>
// //               <div className={styles.variantOptions}>
// //                 {product.variants.map((variant, index) => (
// //                   <button
// //                     key={index}
// //                     className={`${styles.variantButton} ${selectedVariant === variant ? styles.variantButtonActive : ""}`}
// //                     onClick={() => handleVariantChange(variant)}
// //                   >
// //                     Color: {variant.color} & Size: {variant.size}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Handle quantity adjustment */}
// //           <div className={styles.quantitySection}>
// //             <Button onClick={handleDecrement} disabled={quantity <= 1}>-</Button>
// //             <span className={styles.quantity}>{quantity}</span>
// //             <Button
// //               onClick={handleIncrement}
// //               disabled={
// //                 isVariantBased
// //                   ? selectedVariant && quantity >= selectedVariant.qty
// //                   : product && quantity >= product.terrariumQty
// //               }
              
// //               // disabled={
// //               //   isVariantBased
// //               //     ? quantity >= selectedVariant.qty
// //               //     : quantity >= product.terrariumQty
// //               // }
// //             >
// //               +
// //             </Button>
// //           </div>

// //           <Button onClick={handleAddToCart}>Add to Cart</Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { BsCartCheck } from "react-icons/bs";
// import Button from "../../components/Button/Button";

// const ProductDetails = () => {
//   const { addToCart } = useCart();
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//         const token = tokenData?.jwtToken;

//         const headers = token
//           ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
//           : { "Content-Type": "application/json" };

//         const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
//           headers,
//         });

//         const data = response.data;
//         setProduct(data);

//         if (data.variants && data.variants.length > 0) {
//           const defaultVariant = data.variants[0];
//           setSelectedVariant(defaultVariant);
//           setSelectedImage(defaultVariant.imageUrls?.[0] || null);
//         } else if (data.type === "TERRARIUM") {
//           setSelectedImage(data.terrariumImg || null);
//         }

//         setLoading(false);
//       } catch (err) {
//         setError(`Failed to load product details: ${err.message}`);
//         setLoading(false);
//       }
//     }

//     if (id) fetchProduct();
//   }, [id]);

//   const handleVariantChange = (variant) => {
//     setSelectedVariant(variant);
//     setSelectedImage(variant.imageUrls?.[0] || null);
//   };

//   const handleIncrement = () => {
//     if (product.variants && product.variants.length > 0) {
//       setQuantity((prev) => (prev < selectedVariant.qty ? prev + 1 : prev));
//     } else if (product.type === "TERRARIUM") {
//       setQuantity((prev) => (prev < product.terrariumQty ? prev + 1 : prev));
//     }
//   };

//   const handleDecrement = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleAddToCart = async () => {
//     if (!product) return;

//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//     const token = tokenData?.jwtToken;

//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.variants && product.variants.length > 0 ? selectedVariant.price : product.terrariumPrice,
//       image: selectedImage || "",
//       quantity,
//       variantId: product.variants && product.variants.length > 0 ? selectedVariant.id : null,
//     };

//     try {
//       if (token) {
//         if (product.variants && product.variants.length > 0 && selectedVariant) {
//           await addToCart(product, selectedVariant.id, quantity);
//         } else if (product.type === "TERRARIUM") {
//           await addToCart(product, null, quantity);
//         }
//         toast.success(`${product.name} added to cart!`);
//       } else {
//         const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
//         const updatedCart = [...existingCart, cartItem];
//         localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//         toast.success("Added to cart!");
//       }
//     } catch (error) {
//       console.error("Failed to add product to cart:", error);
//       toast.error("Failed to add product to cart.");
//     }
//   };

//   if (loading) return <p className={styles.loading}>Loading...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (!product) return <p className={styles.error}>No product found.</p>;

//   return (
//     <div className={styles.container}>
//       <nav className={styles.breadcrumbs}>
//         <Link to="/" className={styles.breadcrumbLink}>Home</Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <Link to="/plants" className={styles.breadcrumbLink}>Products</Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <span className={styles.breadcrumbActive}>{product.name}</span>
//       </nav>

//       <div className={styles.productContainer}>
//         <div className={styles.imageSection}>
//           {selectedImage ? (
//             <img src={selectedImage} alt={product.name} className={styles.mainImage} />
//           ) : (
//             <p>No images available</p>
//           )}
//         </div>

//         <div className={styles.detailsSection}>
//           <h1 className={styles.title}>{product.name}</h1>
//           <p className={styles.category}><strong>Category:</strong> {product.category}</p>
//           <p className={styles.description}><strong>Description:</strong> {product.description}</p>

//           {product.sustainabilityInfo && (
//             <div className={styles.sustainability}>
//               <h3>Sustainability Info:</h3>
//               <p>{product.sustainabilityInfo}</p>
//             </div>
//           )}

//           <div className={styles.priceSection}>
//             <p className={styles.price}>
//               <strong>Price:</strong> ₹{product.variants && product.variants.length > 0 ? selectedVariant?.price : product.terrariumPrice}
//             </p>
//             <p className={styles.stock}><BsCartCheck /> <strong>In Stock</strong></p>
//           </div>

//           {/* Handle variant-based product */}
//           {product.variants && product.variants.length > 0 && (
//             <div className={styles.variants}>
//               <h3 className={styles.variantTitle}>Select Variant:</h3>
//               <div className={styles.variantOptions}>
//                 {product.variants.map((variant, index) => (
//                   <button
//                     key={index}
//                     className={`${styles.variantButton} ${selectedVariant === variant ? styles.variantButtonActive : ""}`}
//                     onClick={() => handleVariantChange(variant)}
//                   >
//                     Color: {variant.color} & Size: {variant.size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Handle quantity adjustment */}
//           <div className={styles.quantitySection}>
//             <Button onClick={handleDecrement} disabled={quantity <= 1}>-</Button>
//             <span className={styles.quantity}>{quantity}</span>
//             <Button
//               onClick={handleIncrement}
//               disabled={
//                 product.variants && product.variants.length > 0
//                   ? selectedVariant && quantity >= selectedVariant.qty
//                   : product && quantity >= product.terrariumQty
//               }
//             >
//               +
//             </Button>
//           </div>

//           <Button onClick={handleAddToCart}>Add to Cart</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./ProductDetails.module.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { BsCartCheck } from "react-icons/bs";
import Button from "../../components/Button/Button";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
        const token = tokenData?.jwtToken;

        const headers = token
          ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
          headers,
        });

        const data = response.data;
        setProduct(data);

        if (data.variants && data.variants.length > 0) {
          const defaultVariant = data.variants[0];
          setSelectedVariant(defaultVariant);
          setSelectedImage(defaultVariant.imageUrls?.[0] || null);
        } else if (data.type === "TERRARIUM") {
          setSelectedImage(data.terrariumImg || null);
        }

        setLoading(false);
      } catch (err) {
        setError(`Failed to load product details: ${err.message}`);
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant.imageUrls?.[0] || null);
  };

  const handleIncrement = () => {
    if (product.variants && product.variants.length > 0) {
      setQuantity((prev) => (prev < selectedVariant.qty ? prev + 1 : prev));
    } else if (product.type === "TERRARIUM") {
      setQuantity((prev) => (prev < product.terrariumQty ? prev + 1 : prev));
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // const handleAddToCart = async () => {
  //   if (!product) {
  //     toast.error("No product selected.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
  //   const token = tokenData?.jwtToken;

  //   // Prepare product object for addToCart
  //   const cartProduct = {
  //     id: product.id,
  //     name: product.name,
  //     type: product.type,
  //     terrariumPrice: product.terrariumPrice,
  //     terrariumImg: product.terrariumImg,
  //     terrariumQty: product.terrariumQty,
  //     variants: product.variants,
  //   };

  //   const variantId = product.type === "TERRARIUM" ? null : selectedVariant?.id;

  //   console.log("Adding to cart from ProductDetails:", {
  //     product: cartProduct,
  //     variantId,
  //     quantity,
  //     token: token ? "Present" : "Missing",
  //   });

  //   try {
  //     if (token) {
  //       if (product.variants && product.variants.length > 0 && selectedVariant) {
  //         await addToCart(cartProduct, selectedVariant.id, quantity);
  //       } else if (product.type === "TERRARIUM") {
  //         await addToCart(cartProduct, null, quantity);
  //       }
  //       toast.success(`${product.name} added to cart!`, {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //     } else {
  //       // Guest user cart
  //       const cartItem = {
  //         id: product.id,
  //         productId: product.id,
  //         name: product.name,
  //         price: product.type === "TERRARIUM" ? product.terrariumPrice : selectedVariant?.price,
  //         image: product.type === "TERRARIUM" ? product.terrariumImg : selectedVariant?.imageUrls?.[0] || "/placeholder.jpg",
  //         quantity,
  //         variantId,
  //         type: product.type,
  //       };
  //       const existingCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
  //       const updatedCart = [...existingCart, cartItem];
  //       localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
  //       toast.success(`${product.name} added to cart!`, {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to add product to cart:", {
  //       message: error.message,
  //       response: error.response
  //         ? {
  //             status: error.response.status,
  //             data: error.response.data,
  //           }
  //         : null,
  //     });
  //     if (error.response?.status === 401) {
  //       toast.error("Session expired. Please log in again.", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //       localStorage.removeItem("ecommerce_login");
  //       navigate("/login");
  //     } else {
  //       toast.error(error.response?.data?.message || "Failed to add product to cart.", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //     }
  //   }
  // };


  const handleAddToCart = async () => {
    if (!product) {
      toast.error("No product selected.");
      return;
    }
  
    const variantId = product.type === "TERRARIUM" ? null : selectedVariant?.id;
  
    try {
      await addToCart(product, variantId, quantity);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };
  

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>No product found.</p>;

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link to="/plants" className={styles.breadcrumbLink}>Products</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbActive}>{product.name}</span>
      </nav>

      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.name}
              className={styles.mainImage}
              onError={(e) => {
                console.warn(`Failed to load image: ${selectedImage}`);
                e.target.src = "/placeholder.jpg";
              }}
            />
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.category}><strong>Category:</strong> {product.category}</p>
          <p className={styles.description}><strong>Description:</strong> {product.description}</p>

          {product.sustainabilityInfo && (
            <div className={styles.sustainability}>
              <h3>Sustainability Info:</h3>
              <p>{product.sustainabilityInfo}</p>
            </div>
          )}

          <div className={styles.priceSection}>
            <p className={styles.price}>
              <strong>Price:</strong> ₹{product.variants && product.variants.length > 0 ? selectedVariant?.price : product.terrariumPrice}
            </p>
            <p className={styles.stock}><BsCartCheck /> <strong>In Stock</strong></p>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className={styles.variants}>
              <h3 className={styles.variantTitle}>Select Variant:</h3>
              <div className={styles.variantOptions}>
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`${styles.variantButton} ${selectedVariant === variant ? styles.variantButtonActive : ""}`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    Color: {variant.color} & Size: {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.quantitySection}>
            <Button onClick={handleDecrement} disabled={quantity <= 1}>-</Button>
            <span className={styles.quantity}>{quantity}</span>
            <Button
              onClick={handleIncrement}
              disabled={
                product.variants && product.variants.length > 0
                  ? selectedVariant && quantity >= selectedVariant.qty
                  : product && quantity >= product.terrariumQty
              }
            >
              +
            </Button>
          </div>

          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;