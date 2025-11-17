
import { useState, useEffect } from "react";
import styles from "./AccountPage.module.css";
import { Input } from "../../../components/Input/Input";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import MiniAnalogClock from "../../../components/MiniAnalogWatch/MiniAnalogClock";
import { useNavigate } from "react-router-dom";
import {
  CiUser,
  CiPower,
  CiHeart,
  CiShoppingCart,
  CiLocationOn,
  CiStar,
  CiMoneyBill,
  CiMoneyCheck1,
  CiShare2,
} from "react-icons/ci";

const AccountPage = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: { day: "", month: "", year: "" },
    gender: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthdate: user.birthdate || { day: "", month: "", year: "" },
        gender: user.gender || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEditClick = () => setIsEditable(!isEditable);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["day", "month", "year"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        birthdate: {
          ...prev.birthdate,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (formData.name && formData.phone) {
      updateUser(formData);
      setIsEditable(false);
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className={styles.userInfo}>
            <h3>{user?.name}</h3>
            <div className={styles.clock}>
              <MiniAnalogClock /> {currentTime}
            </div>
          </div>
        </div>

        <nav className={styles.navLinks}>
          <ul>
            <li>
              <div className={styles.sideNav}>
                <CiUser />
                <a href="/account">My Profile</a>
              </div>
            </li>
            <li>
              <div className={styles.sideNav}>
                <CiLocationOn />
                <a href="/address">Delivery Address</a>
              </div>
            </li>
            <li>
              <div className={styles.sideNav}>
                <CiShoppingCart />
                <a href="/my-orders">My Orders</a>
              </div>
            </li>
            {/* <li>
              <div className={styles.sideNav}>
                <CiHeart />
                <a href="/recently-viewed">Recently Viewed</a>
              </div>
            </li>
            <li>
              <div className={styles.sideNav}>
                <CiStar />
                <a href="/loyalty-points">Loyalty Points</a>
              </div>
            </li>
            <li>
              <div className={styles.sideNav}>
                <CiMoneyBill />
                <a href="/earn">How To Earn</a>
              </div>
            </li>
            <li>
              <div className={styles.sideNav}>
                <CiMoneyCheck1 />
                <a href="/spend">How To Spend</a>
              </div>
            </li>
            <li>
              <div className={styles.sideNav}>
                <CiShare2 />
                <a href="/refer">Refer Friend</a>
              </div>
            </li> */}
            <li>
              <div className={styles.sideNav}>
                <CiPower />
                <a onClick={handleLogout}>Log Out</a>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.titleName}>
          <h2>Hello {formData.name?.split(" ")[0]}!</h2>
        </div>
        <div className={styles.profileCard}>
          <div className={styles.editIcon} onClick={handleEditClick}>
            <FaRegEdit />
          </div>

          <div className={styles.formGroup}>
            <label>Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              readOnly={!isEditable}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label>Contact Number</label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                readOnly={!isEditable}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Birthdate</label>
              <div className={styles.birthdate}>
                <Input
                  type="text"
                  name="day"
                  placeholder="DD"
                  value={formData.birthdate?.day}
                  readOnly={!isEditable}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="month"
                  placeholder="MM"
                  value={formData.birthdate?.month}
                  readOnly={!isEditable}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="year"
                  placeholder="YYYY"
                  value={formData.birthdate?.year}
                  readOnly={!isEditable}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Gender</label>
              <div className={styles.genderOptions}>
                <label>
                  <Input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    disabled={!isEditable}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <Input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    disabled={!isEditable}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
                <label>
                  <Input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    disabled={!isEditable}
                    onChange={handleChange}
                  />{" "}
                  Other
                </label>
              </div>
            </div>
          </div>

          {isEditable && (
            <button onClick={handleSave} className={styles.saveButton}>
              Save Changes
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
