import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/apiconfig'; // Adjust path as needed

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage (consistent with your OfferBanner component)
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  // Fetch all products from the backend
  const fetchProducts = async () => {
    if (!token) {
      setError("Please log in to manage products.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products: " + (err.response?.data?.message || err.message));
      if (err.response?.status === 401) {
        localStorage.removeItem("ecommerce_login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add Product
  const addProduct = async (newProduct) => {
    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image); // Assuming image is a File object

    try {
      const response = await axios.post(`${config.BASE_URL}/api/addProduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts([...products, response.data]); // Assuming backend returns the created product
      return true; // Indicate success
    } catch (err) {
      alert("Failed to add product: " + (err.response?.data?.message || err.message));
      return false;
    }
  };

  // Edit Product
  const editProduct = async (updatedProduct) => {
    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", updatedProduct.title);
    formData.append("price", updatedProduct.price);
    formData.append("description", updatedProduct.description);
    if (updatedProduct.image instanceof File) {
      formData.append("image", updatedProduct.image);
    }

    try {
      const response = await axios.put(
        `${config.BASE_URL}/api/updateProduct/${updatedProduct.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(products.map((p) => (p.id === updatedProduct.id ? response.data : p)));
      return true; // Indicate success
    } catch (err) {
      alert("Failed to edit product: " + (err.response?.data?.message || err.message));
      return false;
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    try {
      await axios.delete(`${config.BASE_URL}/api/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert("Failed to delete product: " + (err.response?.data?.message || err.message));
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [token]);

  return (
    <AdminContext.Provider value={{ products, addProduct, editProduct, deleteProduct, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

// import React, { createContext, useContext, useState } from 'react';

// const AdminContext = createContext();

// export const AdminProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   // Add Product
//   const addProduct = (newProduct) => {
//     setProducts([...products, { ...newProduct, id: Date.now() }]);
//   };

//   // Edit Product
//   const editProduct = (updatedProduct) => {
//     const updatedProducts = products.map((product) =>
//       product.id === updatedProduct.id ? updatedProduct : product
//     );
//     setProducts(updatedProducts);
//   };

//   // Delete Product
//   const deleteProduct = (id) => {
//     const filteredProducts = products.filter((product) => product.id !== id);
//     setProducts(filteredProducts);
//   };

//   return (
//     <AdminContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export const useAdmin = () => useContext(AdminContext);
