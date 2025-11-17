import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/apiconfig";
import styles from "./Category.module.css";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSaveAlt, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";

const PlantCategory = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check token and fetch categories
  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      getPlantCategories();
    }
  }, [token, navigate]);

  // Fetch all categories
  const getPlantCategories = async () => {
    try {
      console.log(
        "Fetching categories with URL:",
        `${config.BASE_URL}/api/Allcategory`
      );
      console.log("Token:", token);
      const response = await axios.get(`${config.BASE_URL}/api/Allcategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Plant Categories Response:", response.data);
      // Handle single object or array
      const categoriesArray = Array.isArray(response.data)
        ? response.data
        : response.data.categories && Array.isArray(response.data.categories)
        ? response.data.categories
        : response.data &&
          typeof response.data === "object" &&
          response.data.categoryId
        ? [response.data]
        : [];
      setCategories(categoriesArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", {
        message: error.message,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
        request: error.request,
        config: error.config,
      });
      setError("Failed to load categories.");
      setLoading(false);
    }
  };

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!updatedCategoryName.trim()) {
      toast.error("Category name cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = { categoryName: updatedCategoryName };
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Category added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setUpdatedCategoryName("");
        setIsAddModalOpen(false);
        getPlantCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error.response || error);
      toast.error(
        `Failed to add category: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  // Edit category
  const handleEditCategory = async (id) => {
    if (!updatedCategoryName.trim()) {
      toast.error("Category name cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.put(
        `${config.BASE_URL}/api/updateCategory/${id}`,
        { categoryName: updatedCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Category updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setEditingCategoryId(null);
        setUpdatedCategoryName("");
        getPlantCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error.response || error);
      toast.error(
        `Failed to update category: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setCategoryIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryIdToDelete(null);
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!categoryIdToDelete) return;

    try {
      console.log("Deleting category with ID:", categoryIdToDelete);
      const response = await axios.delete(
        `${config.BASE_URL}/api/deleteCategory/${categoryIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        toast.success("Category deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        getPlantCategories();
      }
    } catch (error) {
      console.error("Delete category error:", error.response || error);
      toast.error(
        `Failed to delete category: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      closeDeleteModal();
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setUpdatedCategoryName("");
    setIsAddModalOpen(true);
  };

  // Close Add Modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setUpdatedCategoryName("");
  };

  if (!token) return null;
  if (loading) return <p className={styles.loading}>Loading categories...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.categoryContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Manage Plant Categories</h1>
        <Button onClick={openAddModal} className={styles.addCategoryButton}>
          Add Plant Category
        </Button>
      </header>

      {/* Category Table */}
      <div className={styles.tableWrapper}>
        {categories.length > 0 ? (
          <table className={styles.categoryTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.categoryId || cat.id}>
                  <td>{cat.categoryId || cat.id}</td>
                  <td>
                    {editingCategoryId === (cat.categoryId || cat.id) ? (
                      <Input
                        type="text"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        className={styles.editInput}
                      />
                    ) : (
                      cat.categoryName
                    )}
                  </td>
                  <td className={styles.actions}>
                    {editingCategoryId === (cat.categoryId || cat.id) ? (
                      <>
                        <Button
                          onClick={() =>
                            handleEditCategory(cat.categoryId || cat.id)
                          }
                          className={styles.saveButton}
                        >
                          <MdOutlineSaveAlt />
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingCategoryId(null);
                            setUpdatedCategoryName("");
                          }}
                          className={styles.cancelButton}
                        >
                          <MdOutlineCancel />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className={styles.actionEdit}
                          onClick={() => {
                            setEditingCategoryId(cat.categoryId || cat.id);
                            setUpdatedCategoryName(cat.categoryName);
                          }}
                        >
                          <RiEditLine />
                        </Button>
                        <Button
                          className={styles.actionDel}
                          onClick={() =>
                            openDeleteModal(cat.categoryId || cat.id)
                          }
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noCategories}>No categories found.</p>
        )}
      </div>

      {/* Modal for Adding Plant Categories */}
      <Modal
  isOpen={isAddModalOpen}
  onClose={closeAddModal}
  title="Add New Plant Category"
  message=""
>
  <form onSubmit={handleAddCategory} className={styles.addModalForm}>
    <Input
      type="text"
      value={updatedCategoryName}
      onChange={(e) => setUpdatedCategoryName(e.target.value)}
      placeholder="Enter Plant Category Name"
      className={styles.addModalInput}
      autoFocus
    />

    <div className={styles.modalButtonGroup}>
      <Button type="submit" className={styles.modalAddButton}>
        Add
      </Button>
      <Button
        type="button"
        onClick={closeAddModal}
        className={styles.modalCancelButton}
      >
        Cancel
      </Button>
    </div>
  </form>
</Modal>


      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this plant category? This action cannot be undone."
      />
    </div>
  );
};

export default PlantCategory;
