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

  // Load token synchronously
  const token = localStorage.getItem("jwtToken");

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

  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
    } else {
      getAllBanners();
    }
  }, []);

  const getAllBanners = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/banners/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanners(response.data);
    } catch (error) {
      toast.error("Failed to load banners.");
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
      toast.error("All fields are required.");
      return;
    }

    if (!editingBannerId && !bannerData.image) {
      toast.error("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", bannerData.name);
    formData.append("discountType", "CATEGORY");
    formData.append("category", bannerData.category);
    formData.append("productId", 0);
    formData.append("discount", bannerData.discount);

    if (bannerData.image instanceof File) {
      formData.append("image", bannerData.image);
    }

    try {
      const url = editingBannerId
        ? `${config.BASE_URL}/api/banners/update/${editingBannerId}`
        : `${config.BASE_URL}/api/banners/add`;

      const method = editingBannerId ? "put" : "post";

      const response = await axios({
        url,
        method,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        editingBannerId
          ? "Banner updated successfully"
          : "Banner added successfully"
      );

      resetForm();
      getAllBanners();
    } catch (error) {
      console.log("Banner error:", error);
      toast.error(
        error.response?.data?.message || "Banner operation failed!"
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
        `${config.BASE_URL}/api/banners/delete/${bannerToDelete}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Banner deleted successfully!");
      getAllBanners();
    } catch (error) {
      toast.error("Failed to delete banner.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleEditBanner = (banner) => {
    setEditingBannerId(banner.id);

    setBannerData({
      name: banner.name,
      category: banner.category,
      discount: banner.discount,
      image: null,
    });

    setImagePreview(banner.image);
  };

  if (loading) return <p>Loading banners...</p>;

  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.title}>Manage Offer Banners</h1>

      <form onSubmit={handleFormSubmit} className={styles.addForm}>
        <h2>{editingBannerId ? "Edit Banner" : "Add New Banner"}</h2>

        <div className={styles.bannerForm}>
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
            type="number"
            name="discount"
            value={bannerData.discount}
            onChange={handleInputChange}
            placeholder="Discount"
            required
          />

          <label htmlFor="image-upload" className={styles.customFileInput}>
            <FiUpload /> Upload Image
          </label>

          <input
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className={styles.fileInput}
            required={!editingBannerId}
          />

          {imagePreview && (
            <img src={imagePreview} className={styles.imagePreview} />
          )}
        </div>

        <Button type="submit">
          {editingBannerId ? "Update Banner" : "Add Banner"}
        </Button>

        {editingBannerId && (
          <Button type="button" onClick={resetForm}>
            Cancel
          </Button>
        )}
      </form>

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
  src={`data:image/jpeg;base64,${banner.image}`}
  alt={banner.name}
  className={styles.imagePreview}
/>
              </td>
              <td>
                <Button onClick={() => handleEditBanner(banner)}>
                  <RiEditLine />
                </Button>

                <Button onClick={() => handleDeleteBanner(banner.id)}>
                  <RiDeleteBin6Line />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this banner?"
      />
    </div>
  );
};

export default OfferBanner;
