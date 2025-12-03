import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import config from "../../../config/apiconfig";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { LuEyeOff, LuEye } from "react-icons/lu";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const { jwtToken, admin, user } = response.data;

        // Determine role
        let role =
          admin?.role?.[0]?.roleName || user?.role?.[0]?.roleName || "User";

        // Save token & role in AuthContext and localStorage
        login(jwtToken, role);

        toast.success(`${role} Login Successfully`);
        navigate(role === "Admin" ? "/admin" : "/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <p>
          Don't have an account? <a href="/register">Create account</a>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={errors.email ? styles.errorBorder : ""}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

          <div className={styles.passwordWrapper}>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={errors.password ? styles.errorBorder : ""}
            />
            <span onClick={togglePasswordVisibility} role="button">
              {showPassword ? <LuEye size={15} /> : <LuEyeOff size={15} />}
            </span>
          </div>
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}

          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot your password?
          </a>

          <Button type="submit" className={styles.signInBtn}>
            SIGN IN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;




// import React, { useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import { useAuth } from "../../../context/AuthContext";
// import Button from "../../../components/Button/Button";
// import { Input } from "../../../components/Input/Input";
// import axios from "axios";
// import config from "../../../config/apiconfig";
// import { toast } from "react-toastify";
// import { LuEyeOff, LuEye } from "react-icons/lu";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility

//   // Validation logic
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // Real-time validation
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return; // Stop if validation fails

//     try {
//       const response = await axios.post(`${config.BASE_URL}/api/auth/login`, formData);

//       console.log(response.data);

//       if (response.status === 200) {
//         const { admin, user, jwtToken } = response.data;
//         localStorage.setItem("ecommerce_login", JSON.stringify(response.data));

//         if (admin && admin.role?.some((role) => role.roleName === "Admin")) {
//           toast.success("Admin Login Successfully", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//           navigate("/admin");
//         } else if (user && user.role?.some((role) => role.roleName === "User")) {
//           toast.success("User Login Successfully", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//           navigate("/");
//         } else {
//           toast.error("Unknown role. Contact support.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       const errorMessage = error.response?.data?.message || "Failed to log in. Try again.";
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   // AOS Init
//     useEffect(() => {
//       AOS.init({
//         duration: 500,
//         offset: 100,
//         easing: "ease-in-out",
//         delay: 0,
//         once: true,
//       });
//     }, []);

//   return (
//     <div className={styles.loginContainer} data-aos="fade-up" data-aos-duration="1000">
//       <div className={styles.loginBox}>
//         <h2 data-aos="zoom-in">Login</h2>
//         <p>
//           Don't have an account yet? <a href="/register">Create account</a>
//         </p>

//         <form onSubmit={handleSubmit} data-aos="zoom-in-up">
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className={`${styles.inputField} ${errors.email ? styles.errorBorder : ""}`}
//           />
//           {errors.email && <p className={styles.errorText}>{errors.email}</p>}

//           <div className={styles.passwordWrapper}>
//             <Input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className={`${styles.inputField} ${errors.password ? styles.errorBorder : ""}`}
//             />
//             <span
//               className={styles.passwordToggle}
//               onClick={togglePasswordVisibility}
//               role="button"
//               tabIndex={0}
//               onKeyPress={(e) => e.key === "Enter" && togglePasswordVisibility()}
//             >
//               {showPassword ? <LuEye size={15} /> : <LuEyeOff size={15} />}
//             </span>
//           </div>
//           {errors.password && <p className={styles.errorText}>{errors.password}</p>}

//           <a href="/forgot-password" className={styles.forgotPassword}>
//             Forgot your password?
//           </a>

//           <Button type="submit" className={styles.signInBtn} data-aos="zoom-in">
//             SIGN IN
//           </Button>
//         </form>

//         <a href="/" className={styles.returnToStore}>
//           Return to Store
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import Button from "../../../components/Button/Button";
// import { Input } from "../../../components/Input/Input";
// import axios from "axios";
// import config from "../../../config/apiconfig";
// import { toast } from "react-toastify"; // Import toast
// import { LuEyeOff , LuEye} from "react-icons/lu";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Validation logic
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // Real-time validation
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return; // Stop if validation fails

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/auth/login`,
//         formData
//       );

//       console.log(response.data);

//       if (response.status === 200) {
//         const { admin, user, jwtToken } = response.data;
//         localStorage.setItem("ecommerce_login", JSON.stringify(response.data));

//         if (admin && admin.role?.some((role) => role.roleName === "Admin")) {
//           toast.success("Admin Login Successfully", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//           navigate("/admin");
//         } else if (user && user.role?.some((role) => role.roleName === "User")) {
//           toast.success("User Login Successfully", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//           navigate("/");
//         } else {
//           toast.error("Unknown role. Contact support.", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to log in. Try again.";
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   }

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>
//         <p>
//           Don't have an account yet? <a href="/register">Create account</a>
//         </p>

//         <form onSubmit={handleSubmit}>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className={`${styles.inputField} ${errors.email ? styles.errorBorder : ""}`}
//           />
//           {errors.email && <p className={styles.errorText}>{errors.email}</p>}

//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className={`${styles.inputField} ${errors.password ? styles.errorBorder : ""}`}
//           />
//           <LuEyeOff />
//           <LuEye />
//           {errors.password && <p className={styles.errorText}>{errors.password}</p>}

//           <a href="/forgot-password" className={styles.forgotPassword}>
//             Forgot your password?
//           </a>

//           <Button type="submit" className={styles.signInBtn}>
//             SIGN IN
//           </Button>
//         </form>

//         <a href="/" className={styles.returnToStore}>
//           Return to Store
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import Button from "../../../components/Button/Button";
// import {Input} from "../../../components/Input/Input";
// import axios from "axios";
// import config from "../../../config/apiconfig";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Validation logic
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // Real-time validation
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return; // Stop if validation fails

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/auth/login`,
//         formData
//       );

//       console.log(response.data);

//       if (response.status === 200) {
//         const { admin, user, jwtToken } = response.data;
//         localStorage.setItem("ecommerce_login", JSON.stringify(response.data));

//         if (admin && admin.role?.some((role) => role.roleName === "Admin")) {
//           navigate("/admin");
//         } else if (user && user.role?.some((role) => role.roleName === "User")) {
//           navigate("/");
//         } else {
//           alert("Unknown role. Contact support.");
//         }

//         alert("Login successfully");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to log in. Try again.";
//       alert(errorMessage);
//     }
//   }

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>
//         <p>
//           Don't have an account yet? <a href="/register">Create account</a>
//         </p>

//         <form onSubmit={handleSubmit}>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className={`${styles.inputField} ${errors.email ? styles.errorBorder : ""}`}
//           />
//           {errors.email && <p className={styles.errorText}>{errors.email}</p>}

//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className={`${styles.inputField} ${errors.password ? styles.errorBorder : ""}`}
//           />
//           {errors.password && <p className={styles.errorText}>{errors.password}</p>}

//           <a href="/forgot-password" className={styles.forgotPassword}>
//             Forgot your password?
//           </a>

//           <Button type="submit" className={styles.signInBtn}>
//             SIGN IN
//           </Button>
//         </form>

//         <a href="/" className={styles.returnToStore}>
//           Return to Store
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;
