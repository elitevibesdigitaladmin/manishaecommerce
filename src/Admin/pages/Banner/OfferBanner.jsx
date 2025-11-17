import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/apiconfig";
import styles from "./OfferBanner.module.css";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { FiUpload } from "react-icons/fi";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal/Modal";

const OfferBanner = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [banners, setBanners] = useState([]);
  const [bannerData, setBannerData] = useState({
    name: "",
    category: "",
    discount: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      getAllBanners();
    }
  }, [token, navigate]);

  const getAllBanners = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanners(response.data);
    } catch (error) {
      setError("Failed to load banners.");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("ecommerce_login");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setBannerData({ name: "", category: "", discount: "", image: null });
    setImagePreview(null);
    setEditingBannerId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!bannerData.name || !bannerData.category || !bannerData.discount) {
      toast.error("All fields are required.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!editingBannerId && !bannerData.image) {
      toast.error("Image is required when adding a new banner.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", bannerData.name);
    formData.append("category", bannerData.category);
    formData.append("discount", bannerData.discount);
    if (bannerData.image instanceof File) {
      formData.append("image", bannerData.image);
    }

    try {
      const url = editingBannerId
        ? `${config.BASE_URL}/api/updateBanner/${editingBannerId}`
        : `${config.BASE_URL}/api/addBanner`;
      const method = editingBannerId ? "put" : "post";
      const successMessage = editingBannerId
        ? "Banner updated successfully!"
        : "Banner added successfully!";

      const response = await axios({
        url,
        method,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(successMessage, {
          position: "top-right",
          autoClose: 3000,
        });
        resetForm();
        await getAllBanners();
      }
    } catch (error) {
      console.error("Operation error:", error);
      toast.error(
        `Operation failed: ${error.response?.data?.message || error.message}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleDeleteBanner = (id) => {
    setBannerToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${config.BASE_URL}/api/deleteBanner/${bannerToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Banner deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      await getAllBanners();
    } catch (error) {
      toast.error(
        `Failed to delete banner: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsModalOpen(false);
      setBannerToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBannerToDelete(null);
  };

  // const handleDeleteBanner = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this banner?")) return;
  //   try {
  //     await axios.delete(`${config.BASE_URL}/api/deleteBanner/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success("Banner deleted successfully!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     await getAllBanners();
  //   } catch (error) {
  //     toast.error(
  //       `Failed to delete banner: ${
  //         error.response?.data?.message || error.message
  //       }`,
  //       {
  //         position: "top-right",
  //         autoClose: 3000,
  //       }
  //     );
  //   }
  // };

  const handleEditBanner = (banner) => {
    setEditingBannerId(banner.id);
    setBannerData({
      name: banner.name || "",
      category: banner.category || "",
      discount: banner.discount || "",
      image: null,
    });
    setImagePreview(banner.image);
  };

  if (!token) return null;
  if (loading) return <p className={styles.loading}>Loading banners...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <div className={styles.bannerContainer}>
        <h1 className={styles.title}>Manage Offer Banners</h1>

        <form onSubmit={handleFormSubmit} className={styles.addForm}>
          <h2>{editingBannerId ? "Edit Banner" : "Add New Banner"}</h2>
          <div className={styles.bannerForm}>
            <div className={styles.formGroup}>
              <Input
                type="text"
                name="name"
                value={bannerData.name}
                onChange={handleInputChange}
                placeholder="Banner Name"
                required
              />
              <Input
                type="text"
                name="category"
                value={bannerData.category}
                onChange={handleInputChange}
                placeholder="Category"
                required
              />
              <Input
                type="text"
                name="discount"
                value={bannerData.discount}
                onChange={handleInputChange}
                placeholder="Discount (%)"
                min="0"
                required
              />
            </div>

            <div className={styles.imageInputWrapper}>
              <label htmlFor="image-upload" className={styles.customFileInput}>
                <FiUpload className={styles.icon} /> Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required={!editingBannerId}
                className={styles.fileInput}
              />
              {imagePreview ? (
                <div className={styles.previewContainer}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <p>
                    {editingBannerId
                      ? "Current/Preview Image"
                      : "Image Preview"}
                  </p>
                </div>
              ) : (
                <div className={styles.noImageMessage}>
                  No images uploaded yet.
                </div>
              )}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit">
              {editingBannerId ? "Update Banner" : "Add Banner"}
            </Button>
            {editingBannerId && (
              <Button
                type="button"
                onClick={resetForm}
                className={styles.cancelButton}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className={styles.tableWrapper}>
          <table className={styles.bannerTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Discount</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td>{banner.name}</td>
                  <td>{banner.category}</td>
                  <td>{banner.discount}%</td>
                  <td>
                    <img
                      src={banner.image}
                      alt={banner.name}
                      className={styles.imagePreview}
                    />
                  </td>
                  <td className={styles.actions}>
                    <Button
                      onClick={() => handleEditBanner(banner)}
                      className={styles.actionEdit}
                    >
                      <RiEditLine />
                    </Button>
                    <Button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className={styles.actionDel}
                    >
                      <RiDeleteBin6Line />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*Banner Delete Confirmation Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this banner? This action cannot be undone."
        />
      </div>
    </>
  );
};

export default OfferBanner;
