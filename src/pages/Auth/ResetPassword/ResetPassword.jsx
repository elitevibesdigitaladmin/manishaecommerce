

// import React, { useState } from "react";
// import Button from "../../../components/Button/Button";
// import Input from "../../../components/Input/Input";
// import axios from "axios";
// import styles from "./ResetPassword.module.css";
// import config from "../../../config/apiconfig";

// const ResetPassword = () => {
//   const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
// //   const myemail = JSON.parse(localStorage.getItem("ecommerce_login"))?.user.email;
// // console.log(myemail)
//   console.log(token);
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//   if (!token) {
//     setError("Authorization token missing. Please log in again.");
//     return;
//   }
//   console.log(config.BASE_URL);
//   console.log("Stored Token:", token); // Ensure this logs a valid token
  
//   const formdata = { email };

//   try {
//     const response = await axios.post(
//       `${config.BASE_URL}/api/reset-password`,

//       formdata,
//       {
//         headers: {
//         //   Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",  // Correct content type 
//         },
//       }
//     );
//     console.log("API Response:", response.data);
//     setMessage(response.data.message || "Password reset link sent successfully.");
//     setError("");
//   } catch (err) {
//     console.error("API Error:", err.response?.data || err.message);
//     setError(err.response?.data?.error || "Something went wrong. Please try again.");
//     setMessage("");
//   }
// };

  
//   return (
//     <div className={styles.resetContainer}>
//       <div className={styles.resetBox}>
//         <h2>Reset account password</h2>
//         <p>Enter a new password</p>

//         {message && <p className={styles.successMessage}>{message}</p>}
//         {error && <p className={styles.errorMessage}>{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <Input
//             type="password"
//             name="password"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Password"
//             required
//             className={styles.inputField}
//           />

// <Input
//             type="password"
//             name="confirmPassword"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Confirm Password"
//             required
//             className={styles.inputField}
//           />

//           <Button type="submit" className={styles.resetBtn}>
//             RESET PASSWORD
//           </Button>
//         </form>

        
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // For URL query params
import Button from "../../../components/Button/Button";
import {Input} from "../../../components/Input/Input";
import axios from "axios";
import styles from "./ResetPassword.module.css";
import config from "../../../config/apiconfig";
import AOS from "aos";
import "aos/dist/aos.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");  // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // FormData structure for multipart/form-data
    const formData = new FormData();
    formData.append("token", token);
    formData.append("newPassword", newPassword);

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/reset-password`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);
      setMessage(response.data.message || "Password reset successful.");
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
    <div className={styles.resetContainer} data-aos="fade-up" data-aos-duration="1000">
      <div className={styles.resetBox}>
        <h2>Reset Account Password</h2>
        <p>Enter your new password below.</p>

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
            className={styles.inputField}
          />

          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
            className={styles.inputField}
          />

          <Button type="submit" className={styles.resetBtn}>
            RESET PASSWORD
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
