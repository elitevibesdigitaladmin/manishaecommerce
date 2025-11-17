
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateAccount.module.css';
import axios from 'axios';
import config from '../../../config/apiconfig';
import Button from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { LuEyeOff, LuEye } from "react-icons/lu";
import { toast } from "react-toastify"; 
import AOS from "aos";
import "aos/dist/aos.css";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Registration Data:', formData);

      try {
        // Prepare the data to be sent to the backend
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        };

        // Call the API to create a new user
        const response = await axios.post(`${config.BASE_URL}/api/registerUser`, userData);

        console.log(response.data);

        if (response.status === 200) {
          // Show success toast
          toast.success('Account created successfully!');

          // Redirect to Login Page after a short delay
          setTimeout(() => {
            navigate('/login'); // Redirect to login page
          }, 3000);
        } else {
          // Show error toast if the API call failed
          toast.error(response.data.message || 'Something went wrong!');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred, please try again later.');
      }
    }
  };

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

  return (
    <div className={styles.registerContainer} data-aos="fade-up" data-aos-duration="1000">
      <div className={styles.registerBox}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`${styles.inputField} ${errors.name && styles.errorInput}`}
          />
          {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}

          {/* Email */}
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${styles.inputField} ${errors.email && styles.errorInput}`}
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}

          {/* Phone Number */}
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className={`${styles.inputField} ${errors.phone && styles.errorInput}`}
          />
          {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}

          {/* Password */}
          <div className={styles.passwordWrapper}>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`${styles.inputField} ${errors.password ? styles.errorBorder : ''}`}
            />
            <span
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && togglePasswordVisibility()}
            >
              {showPassword ? <LuEye size={15} /> : <LuEyeOff size={15} />}
            </span>
          </div>
          {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}

          {/* Submit Button */}
          <Button type="submit" className={styles.createBtn}>CREATE</Button>
        </form>

        <a href="/" className={styles.returnToStore}>Return to Store</a>
      </div>
    </div>
  );
};

export default CreateAccount;
