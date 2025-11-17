// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import config from "../../../config/apiconfig";
// // import styles from "./ProductList.module.css";
// // import axios from "axios";
// // import Button from "../../../components/Button/Button";
// // import { Input } from "../../../components/Input/Input";
// // import { FaPlus } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import Modal from "../../../components/Modal/Modal";
// // import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [productIdToDelete, setProductIdToDelete] = useState(null);

// //   const navigate = useNavigate();
// //   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
// //   const token = tokenData?.jwtToken;

// //   // Fetch Products
// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       setProducts(response.data);
// //       console.log(response.data);
// //       setLoading(false);
// //     } catch (err) {
// //       setError(
// //         "Error fetching products: " +
// //           (err.response?.data?.message || err.message)
// //       );
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!token) {
// //       setError("Please log in to view products.");
// //       setLoading(false);
// //       navigate("/login");
// //     } else {
// //       fetchProducts();
// //     }
// //   }, [token, navigate]);

// //   // Update Product
// //   const handleUpdate = (id) => {
// //     navigate(`/admin/add-product/${id}`); // Navigate to AddProduct with product ID
// //   };

// //   // Open Modal for Delete Confirmation
// //   const openDeleteModal = (id) => {
// //     setProductIdToDelete(id);
// //     setIsModalOpen(true);
// //   };

// //   // Close Modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setProductIdToDelete(null);
// //   };

// //   // Delete Product
// //   const handleDelete = async () => {
// //     if (!productIdToDelete) return;

// //     try {
// //       const response = await axios.delete(
// //         `${config.BASE_URL}/api/deleteProduct/${productIdToDelete}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.status === 200 || response.status === 204) {
// //         toast.success("Product and its variants deleted successfully!", {
// //           position: "top-right",
// //           autoClose: 3000,
// //         });
// //         setProducts((prevProducts) =>
// //           prevProducts.filter((product) => product.id !== productIdToDelete)
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Delete error:", error.response || error);
// //       toast.error(
// //         `Failed to delete product: ${
// //           error.response?.data?.message || error.message
// //         }`,
// //         {
// //           position: "top-right",
// //           autoClose: 3000,
// //         }
// //       );
// //     } finally {
// //       closeModal();
// //     }
// //   };

// //   // Handle search input change
// //   const handleSearchChange = (e) => {
// //     setSearchTerm(e.target.value);
// //   };

// //   // Filtered products based on search term
// //   const filteredProducts = products.filter((product) =>
// //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (loading) {
// //     return <p className={styles.loading}>Loading products...</p>;
// //   }

// //   if (error) {
// //     return <p className={styles.error}>{error}</p>;
// //   }

// //   return (
// //     <>
// //       <div className={styles.header}>
// //         <div>
// //           <Input
// //             type="text"
// //             placeholder="Search Product"
// //             className={styles.searchInput}
// //             value={searchTerm}
// //             onChange={handleSearchChange}
// //           />
// //         </div>

// //         <div>
// //           <Button onClick={() => navigate("/admin/add-product")}>
// //             <span className={styles.buttonContent}>
// //               <FaPlus className={styles.buttonIcon} />
// //               Add Product
// //             </span>
// //           </Button>
// //         </div>
// //       </div>

// //       <div className={styles.productListContainer}>
// //         {filteredProducts.length === 0 ? (
// //           <p>No products available.</p>
// //         ) : (
// //           <div className={styles.tableWrapper}>
// //             <table className={styles.productTable}>
// //               <thead>
// //                 <tr>
// //                   <th>PRODUCTS</th>
// //                   <th>CATEGORY</th>
// //                   <th>COLOR</th>
// //                   <th>SIZE</th>
// //                   <th>PRICE</th>
// //                   <th>QTY</th>
// //                   <th>ACTIONS</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredProducts.map((product) => {
// //                   const defaultVariant = product.variants?.[0];

// //                   if (!defaultVariant) return null; // skip if no variants

// //                   return (
// //                     <tr key={product.id}>
// //                       <td className={styles.productInfo}>
// //                         <img
// //                           src={defaultVariant.imageUrls?.[0]}
// //                           alt={`${product.name} ${defaultVariant.color}`}
// //                           className={styles.productImage}
// //                         />
// //                         <p className={styles.productTitle}>{product.name}</p>
// //                       </td>
// //                       <td>
// //                         <span className={styles.categoryTag}>
// //                           {product.category}
// //                         </span>
// //                       </td>
// //                       <td>{defaultVariant.color}</td>
// //                       <td>{defaultVariant.size}</td>
// //                       <td>₹{defaultVariant.price}</td>
// //                       <td>{defaultVariant.qty}</td>
// //                       <td className={styles.actions}>
// //                         <Button
// //                           className={styles.actionEdit}
// //                           onClick={() => handleUpdate(product.id)}
// //                         >
// //                           <RiEditLine />
// //                         </Button>
// //                         <Button
// //                           className={styles.actionDel}
// //                           onClick={() => openDeleteModal(product.id)}
// //                         >
// //                           <RiDeleteBin6Line />
// //                         </Button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>

// //             </table>
// //           </div>
// //         )}

// //         {/* Modal for Delete Confirmation */}
// //         <Modal
// //           isOpen={isModalOpen}
// //           onClose={closeModal}
// //           onConfirm={handleDelete}
// //           title="Confirm Deletion"
// //           message="Are you sure you want to delete this product and its variants? This action cannot be undone."
// //         />
// //       </div>
// //     </>
// //   );
// // };

// // export default ProductList;

// // -------------

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../../../config/apiconfig";
// import styles from "./ProductList.module.css";
// import axios from "axios";
// import Button from "../../../components/Button/Button";
// import { Input } from "../../../components/Input/Input";
// import Pagination from "../../../components/Pagination/Pagination";
// import { FaPlus } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Modal from "../../../components/Modal/Modal";
// import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [productIdToDelete, setProductIdToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1); // New state for current page
//   const pageSize = 5; // Number of products per page

//   const navigate = useNavigate();
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   const fetchProducts = async () => {
//     try {
//       console.log(
//         "Fetching products from:",
//         `${config.BASE_URL}/api/AllProduct`
//       );
//       const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("Products fetched:", response.data);
//       setProducts(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching products:", {
//         message: err.message,
//         response: err.response
//           ? {
//               status: err.response.status,
//               data: err.response.data,
//             }
//           : null,
//       });
//       setError(
//         "Error fetching products: " +
//           (err.response?.data?.message || err.message)
//       );
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       setError("Please log in to view products.");
//       setLoading(false);
//       navigate("/login");
//     } else {
//       fetchProducts();
//     }
//   }, [token, navigate]);

//   const handleUpdate = (id) => {
//     navigate(`/admin/add-product/${id}`);
//   };

//   const openDeleteModal = (id) => {
//     setProductIdToDelete(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setProductIdToDelete(null);
//   };

//   const handleDelete = async () => {
//     if (!productIdToDelete) return;

//     try {
//       console.log("Deleting product ID:", productIdToDelete);
//       const response = await axios.delete(
//         `${config.BASE_URL}/api/deleteProduct/${productIdToDelete}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 204) {
//         toast.success("Product deleted successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         setProducts((prevProducts) =>
//           prevProducts.filter((product) => product.id !== productIdToDelete)
//         );

//         // Reset to page 1 if the current page becomes empty after deletion
//         if (filteredProducts.length === 1 && currentPage > 1) {
//           setCurrentPage(currentPage - 1);
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting product:", {
//         message: error.message,
//         response: error.response
//           ? {
//               status: error.response.status,
//               data: error.response.data,
//             }
//           : null,
//       });
//       toast.error(
//         `Failed to delete product: ${
//           error.response?.data?.message || error.message
//         }`,
//         {
//           position: "top-right",
//           autoClose: 3000,
//         }
//       );
//     } finally {
//       closeModal();
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to page 1 on search
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const totalPages = Math.ceil(filteredProducts.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   if (loading) return <p className={styles.loading}>Loading products...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;

//   return (
//     <>
//       <div className={styles.header}>
//         <Input
//           type="text"
//           placeholder="Search Product"
//           className={styles.searchInput}
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <Button onClick={() => navigate("/admin/add-product")}>
//           <span className={styles.buttonContent}>
//             <FaPlus className={styles.buttonIcon} />
//             Add Product
//           </span>
//         </Button>
//       </div>

//       <div className={styles.productListContainer}>
//         {filteredProducts.length === 0 ? (
//           <p>No products available.</p>
//         ) : (
//           <div className={styles.tableWrapper}>
//             <table className={styles.productTable}>
//               <thead>
//                 <tr>
//                   <th>PRODUCT</th>
//                   <th>CATEGORY</th>
//                   <th>COLOR</th>
//                   <th>SIZE</th>
//                   <th>PRICE</th>
//                   <th>QTY</th>
//                   <th>ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentProducts.map((product) => {
//                   const isTerrarium = product.type === "TERRARIUM";
//                   const hasVariants =
//                     product.variants && product.variants.length > 0;
//                   const defaultVariant = hasVariants
//                     ? product.variants[0]
//                     : null;
//                   const imageSrc = isTerrarium
//                     ? product.terrariumImg
//                     : defaultVariant?.imageUrls?.[0];

//                   return (
//                     <tr key={product.id}>
//                       <td className={styles.productInfo}>
//                         {imageSrc ? (
//                           <img
//                             src={imageSrc}
//                             alt={product.name}
//                             className={styles.productImage}
//                             onError={(e) => {
//                               console.warn(
//                                 `Failed to load image for product ${product.id}: ${imageSrc}`
//                               );
//                               e.target.style.display = "none";
//                               e.target.nextSibling.style.display = "block";
//                             }}
//                           />
//                         ) : (
//                           <span className={styles.noImage}>
//                             No Image Available
//                           </span>
//                         )}
//                         <p
//                           className={styles.productTitle}
//                           style={{ display: imageSrc ? "inline" : "block" }}
//                         >
//                           {product.name}
//                         </p>
//                       </td>
//                       <td>{product.category}</td>
//                       {isTerrarium ? (
//                         <>
//                           <td>-</td>
//                           <td>-</td>
//                           <td>₹{product.terrariumPrice || "-"}</td>
//                           <td>{product.terrarimumQty || "-"}</td>
//                         </>
//                       ) : defaultVariant ? (
//                         <>
//                           <td>{defaultVariant.color}</td>
//                           <td>{defaultVariant.size}</td>
//                           <td>₹{defaultVariant.price}</td>
//                           <td>{defaultVariant.qty}</td>
//                         </>
//                       ) : (
//                         <td colSpan={4}>No Variant Data</td>
//                       )}
//                       <td className={styles.actions}>
//                         <Button
//                           className={styles.actionEdit}
//                           onClick={() => handleUpdate(product.id)}
//                         >
//                           <RiEditLine />
//                         </Button>
//                         <Button
//                           className={styles.actionDel}
//                           onClick={() => openDeleteModal(product.id)}
//                         >
//                           <RiDeleteBin6Line />
//                         </Button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <Modal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           onConfirm={handleDelete}
//           title="Confirm Deletion"
//           message="Are you sure you want to delete this product? This action cannot be undone."
//         />

//         {totalPages > 1 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onNext={handleNext}
//             onPrev={handlePrev}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default ProductList;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/apiconfig";
import styles from "./ProductList.module.css";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import Pagination from "../../../components/Pagination/Pagination";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();
  // const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = localStorage.getItem("jwtToken")

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/product/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  const openDeleteModal = (id) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  const handleDelete = async () => {
    if (!productIdToDelete) return;

    try {
      await axios.delete(
        `${config.BASE_URL}/api/deleteProduct/${productIdToDelete}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product deleted successfully");
      setProducts(products.filter((p) => p.id !== productIdToDelete));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      closeModal();
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className={styles.header}>
        <Input
          type="text"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button onClick={() => navigate("/admin/add-product")}>
          <FaPlus /> Add Product
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>COLOR</th>
                <th>SIZE</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => {
                const isTerrarium = product.productType === "TERRARIUM";
                const variant = product.variants?.[0] || {};
                return (
                  <tr key={product.id}>
                    <td>
                      <p>{product.name}</p>
                    </td>
                    <td>{product.category}</td>
                    {isTerrarium ? (
                      <>
                        <td>-</td>
                        <td>-</td>
                        <td>₹{product.variants?.[0]?.price || "-"}</td>
                        <td>{product.variants?.[0]?.qty || "-"}</td>
                      </>
                    ) : (
                      <>
                        <td>{variant.color || "-"}</td>
                        <td>{variant.size || "-"}</td>
                        <td>₹{variant.price || "-"}</td>
                        <td>{variant.qty || "-"}</td>
                      </>
                    )}
                    <td>
                      <Button onClick={() => navigate(`/admin/add-product/${product.id}`)}>
                        <RiEditLine />
                      </Button>
                      <Button onClick={() => openDeleteModal(product.id)}>
                        <RiDeleteBin6Line />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
