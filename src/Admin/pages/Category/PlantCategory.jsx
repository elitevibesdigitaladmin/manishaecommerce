import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Category.module.css";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSaveAlt, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";
import config from "../../../config/apiconfig";

const CategoryPage = () => {
  const navigate = useNavigate();

  // Load token
  const [token, setToken] = useState(null);

  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // EDIT states
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");

  // ADD states
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(true);

  // Category Types Dropdown Options
  const categoryTypes = ["PRODUCT", "POT", "TERRARIUM"];

  // Load token once
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    setToken(storedToken);
  }, []);

  // Load categories after token
  useEffect(() => {
    if (token === null) return;

    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    getCategories();
  }, [token]);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/categories/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(res.data || []);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch categories.");
      setLoading(false);
    }
  };

  // ADD CATEGORY
  // ADD CATEGORY
const handleAddCategory = async (e) => {
  e.preventDefault();

  if (!newCategoryName.trim()) {
    toast.error("Category name is required!");
    return;
  }

  try {
    const body = {
      name: newCategoryName,
      categoryType: newCategoryType || "PRODUCT",
    };

    await axios.post(`${config.BASE_URL}/api/categories/add`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    toast.success("Category added successfully!");
    setIsAddModalOpen(false);
    setNewCategoryName("");
    setNewCategoryType("");
    getCategories();
  } catch (error) {
    toast.error(error.response?.data || "Failed to add category.");
  }
};


  // UPDATE CATEGORY
  const handleEditCategory = async (id) => {
    if (!categoryName.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    try {
      await axios.put(
        `${config.BASE_URL}/api/categories/update/${id}`,
        {
          name: categoryName,
          categoryType: categoryType || "PRODUCT",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Category updated!");
      setEditingId(null);
      setCategoryName("");
      setCategoryType("");
      getCategories();
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  // DELETE CATEGORY
  const handleDeleteCategory = async () => {
    try {
      await axios.delete(
        `${config.BASE_URL}/api/categories/delete/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Category deleted!");
      setIsDeleteModalOpen(false);
      getCategories();
    } catch {
      toast.error("Delete failed.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.categoryContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Manage Categories</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Category</Button>
      </header>

      <div className={styles.tableWrapper}>
        {categories.length ? (
          <table className={styles.categoryTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>

                  {/* Name Field */}
                  <td>
                    {editingId === cat.id ? (
                      <Input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    ) : (
                      cat.name
                    )}
                  </td>

                  {/* Category Type (Dropdown when editing) */}
                  <td>
                    {editingId === cat.id ? (
                      <select
                        className={styles.selectInput}
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                      >
                        {categoryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    ) : (
                      cat.categoryType
                    )}
                  </td>

                  <td>
                    {editingId === cat.id ? (
                      <>
                        <Button onClick={() => handleEditCategory(cat.id)}>
                          <MdOutlineSaveAlt />
                        </Button>
                        <Button onClick={() => setEditingId(null)}>
                          <MdOutlineCancel />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            setEditingId(cat.id);
                            setCategoryName(cat.name);
                            setCategoryType(cat.categoryType);
                          }}
                        >
                          <RiEditLine />
                        </Button>

                        <Button
                          onClick={() => {
                            setDeleteId(cat.id);
                            setIsDeleteModalOpen(true);
                          }}
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
          <p>No categories found.</p>
        )}
      </div>

      {/* ADD MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
      >
        <form onSubmit={handleAddCategory}>
          <Input
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />

          {/* Category Type Dropdown */}
          <select
            className={styles.selectInput}
            value={newCategoryType}
            onChange={(e) => setNewCategoryType(e.target.value)}
          >
            <option value="">Select Category Type</option>
            {categoryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className={styles.modalButtonGroup}>
            <Button type="submit">Add</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
        title="Confirm Delete"
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryPage;
