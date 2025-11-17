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

const PotCategory = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [potCategories, setPotCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      getPotCategories();
    }
  }, [token, navigate]);

  // Get
  const getPotCategories = async () => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/pot-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPotCategories(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
      } else {
        setError("Failed to load pot categories.");
      }
      setLoading(false);
    }
  };

  // Add
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!updatedCategoryName.trim()) {
      toast.error("Category name cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = { potCategoryName: updatedCategoryName };
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/pot-categories`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Pot category added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setUpdatedCategoryName("");
        setIsAddModalOpen(false); // ✅ CLOSE MODAL AFTER ADD
        getPotCategories();
      }
    } catch (error) {
      toast.error(
        `Failed to add pot category: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setUpdatedCategoryName("");
  };

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
        `${config.BASE_URL}/api/pot-categories/${id}`,
        { potCategoryName: updatedCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Pot category updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setEditingCategoryId(null);
        setUpdatedCategoryName("");
        getPotCategories();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
      } else {
        toast.error(
          `Failed to update pot category: ${
            error.response?.data?.message || error.message
          }`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    }
  };

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
      const response = await axios.delete(
        `${config.BASE_URL}/api/pot-categories/${productIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        toast.success("Pot category deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        getPotCategories();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
      } else {
        toast.error(
          `Failed to delete pot category: ${
            error.response?.data?.message || error.message
          }`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } finally {
      closeModal();
    }
  };

  if (!token) return null;
  if (loading)
    return <p className={styles.loading}>Loading pot categories...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <div className={styles.categoryContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Manage Pot Categories</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            Add Pot Category
          </Button>
        </header>

        <div className={styles.tableWrapper}>
          {potCategories.length > 0 ? (
            <table className={styles.categoryTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {potCategories.map((cat) => (
                  <tr key={cat.potCategoryId}>
                    <td>{cat.potCategoryId}</td>
                    <td>
                      {editingCategoryId === cat.potCategoryId ? (
                        <Input
                          type="text"
                          value={updatedCategoryName}
                          onChange={(e) =>
                            setUpdatedCategoryName(e.target.value)
                          }
                          className={styles.editInput}
                        />
                      ) : (
                        cat.potCategoryName || "Unnamed Category"
                      )}
                    </td>
                    <td className={styles.actions}>
                      {editingCategoryId === cat.potCategoryId ? (
                        <>
                          <Button
                            onClick={() =>
                              handleEditCategory(cat.potCategoryId)
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
                            onClick={() => {
                              setEditingCategoryId(cat.potCategoryId);
                              setUpdatedCategoryName(cat.potCategoryName);
                            }}
                            className={styles.actionEdit}
                          >
                            <RiEditLine />
                          </Button>
                          <Button
                            onClick={() => openDeleteModal(cat.potCategoryId)}
                            className={styles.actionDel}
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
            <p className={styles.noCategories}>No pot categories found.</p>
          )}
        </div>

        {/* Add Category Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title="Add New Pot Category"
          message=""
        >
          <form onSubmit={handleAddCategory} className={styles.addModalForm}>
            <Input
              type="text"
              value={updatedCategoryName}
              onChange={(e) => setUpdatedCategoryName(e.target.value)}
              placeholder="Enter Pot Category Name"
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

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this pot category? This action cannot be undone."
        />
      </div>
    </>
  );
};

export default PotCategory;
