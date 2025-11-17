import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import {Input} from "../../../components/Input/Input";
import axios from "axios";
import styles from "./ForgotPassword.module.css";
import config from "../../../config/apiconfig";
import AOS from "aos";
import "aos/dist/aos.css";

const ForgotPassword = () => {
  const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//   const myemail = JSON.parse(localStorage.getItem("ecommerce_login"))?.user.email;
// console.log(myemail)
  console.log(token);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
  if (!token) {
    setError("Authorization token missing. Please log in again.");
    return;
  }
  console.log(config.BASE_URL);
  console.log("Stored Token:", token); // Ensure this logs a valid token
  
  const formdata = { email };

  try {
    const response = await axios.post(
      `${config.BASE_URL}/api/forgot-password`,

      formdata,
      {
        headers: {
        //   Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",  // Correct content type 
        },
      }
    );
    console.log("API Response:", response.data);
    setMessage(response.data.message || "Password reset link sent successfully.");
    setError("");
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    setError(err.response?.data?.error || "Something went wrong. Please try again.");
    setMessage("");
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
    <div className={styles.forgotContainer} data-aos="fade-up" data-aos-duration="1000">
      <div className={styles.forgotBox}>
        <h2>Reset your password</h2>
        <p>We will send you an email to reset your password</p>

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.inputField}
          />

          <Button type="submit" className={styles.signInBtn}>
            SUBMIT
          </Button>
        </form>

        <a href="/login" className={styles.cancelBtn}>
          Cancel
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
