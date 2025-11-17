import React, { useState, useEffect } from "react";
import styles from "./AddWorkshop.module.css";
import config from "../../../config/apiconfig";
import axios from "axios";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { toast } from "react-toastify";

const AddWorkshop = () => {
  const [formData, setFormData] = useState({
    id: "",
    nameOfWorkShop: "",
    date: "",
    time: "",
    price: "",
  });

  const [workshops, setWorkshops] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("jwtToken")
  // const token = tokenData?.jwtToken;

  // ------------------------------------------------------
  // Convert local time "HH:mm" safely
  // ------------------------------------------------------
  const formatTimeSafe = (timeStr) => {
    if (!timeStr) return "";
    if (typeof timeStr === "string") return timeStr;
    if (timeStr.hour !== undefined && timeStr.minute !== undefined) {
      return `${String(timeStr.hour).padStart(2, "0")}:${String(
        timeStr.minute
      ).padStart(2, "0")}`;
    }
    return "";
  };

  // ------------------------------------------------------
  // Fetch all workshops
  // ------------------------------------------------------
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/workshop/getAllWorkShop`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let workshopsArray =
          response.data?.data ||
          response.data?.workshops ||
          (Array.isArray(response.data) ? response.data : []);

        const formatted = workshopsArray.map((ws) => ({
          ...ws,
          time: formatTimeSafe(ws.time),
        }));

        setWorkshops(formatted);
      } catch (error) {
        toast.error("Failed to fetch workshops");
      }
    };

    if (token) fetchWorkshops();
  }, [token]);

  // ------------------------------------------------------
  // Handle input change
  // ------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------------------------------
  // Create Workshop
  // ------------------------------------------------------
  const handleCreate = async () => {
    try {
      const payload = {
        nameOfWorkShop: formData.nameOfWorkShop,
        date: formData.date, // local date "YYYY-MM-DD"
        time: formData.time, // local time "HH:mm"
        price: String(formData.price),
      };

      const response = await axios.post(
        `${config.BASE_URL}/api/workshop/createWorkShop`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Workshop created successfully!");

      setWorkshops([
        ...workshops,
        { ...response.data, time: formData.time },
      ]);

      setFormData({
        id: "",
        nameOfWorkShop: "",
        date: "",
        time: "",
        price: "",
      });
    } catch (error) {
      toast.error("Failed to create workshop");
    }
  };

  // ------------------------------------------------------
  // Update Workshop
  // ------------------------------------------------------
  const handleUpdate = async () => {
    try {
      const payload = {
        nameOfWorkShop: formData.nameOfWorkShop,
        date: formData.date,
        time: formData.time,
        price: String(formData.price),
      };

      const response = await axios.put(
        `${config.BASE_URL}/api/workshop/updateWorkShop/${formData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Workshop updated successfully!");

      setWorkshops(
        workshops.map((ws) =>
          ws.id === formData.id
            ? { ...response.data, time: formData.time }
            : ws
        )
      );

      setFormData({
        id: "",
        nameOfWorkShop: "",
        date: "",
        time: "",
        price: "",
      });

      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update workshop");
    }
  };

  // ------------------------------------------------------
  // Delete Workshop
  // ------------------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workshop?"))
      return;

    try {
      await axios.delete(`${config.BASE_URL}/api/workshop/deleteWorkShop/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Workshop deleted!");

      setWorkshops(workshops.filter((ws) => ws.id !== id));

      if (isEditing && formData.id === id) {
        setIsEditing(false);
        setFormData({
          id: "",
          nameOfWorkShop: "",
          date: "",
          time: "",
          price: "",
        });
      }
    } catch (error) {
      toast.error("Failed to delete workshop");
    }
  };

  // ------------------------------------------------------
  // Edit Workshop
  // ------------------------------------------------------
  const handleEdit = async (workshop) => {
    try {
      const response = await axios.get(
        `${config.BASE_URL}/api/getWorkShop/${workshop.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData({
        ...response.data,
        time: formatTimeSafe(response.data.time),
      });

      setIsEditing(true);
    } catch (error) {
      // fallback
      setFormData({
        ...workshop,
        time: workshop.time,
      });
      setIsEditing(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2>{isEditing ? "Update Workshop" : "Create Workshop"}</h2>

        <div className={styles.form}>
          <label>
            Workshop Name:
            <Input
              type="text"
              name="nameOfWorkShop"
              value={formData.nameOfWorkShop}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Date:
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time:
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price (₹):
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>

          <Button
            type="button"
            className={styles.submitButton}
            onClick={isEditing ? handleUpdate : handleCreate}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </div>
      </div>

      <div className={styles.workshopSection}>
        <h2>Workshop List</h2>

        <div className={styles.tableContainer}>
          <table className={styles.workshopTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {workshops.length > 0 ? (
                workshops.map((ws) => (
                  <tr key={ws.id}>
                    <td>{ws.id}</td>
                    <td>{ws.nameOfWorkShop}</td>
                    <td>{ws.date}</td>
                    <td>{ws.time}</td>
                    <td>₹{Number(ws.price).toLocaleString()}</td>

                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(ws)}
                      >
                        Edit
                      </button>

                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(ws.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No Workshops Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddWorkshop;




// import React, { useState, useEffect } from "react";
// import styles from "./AddWorkshop.module.css";
// import config from "../../../config/apiconfig";
// import Button from "../../../components/Button/Button";
// import { Input } from "../../../components/Input/Input";
// import axios from "axios";

// const AddWorkshop = ({ initialData = null }) => {
//   const [formData, setFormData] = useState({
//     nameOfWorkShop: "",
//     date: "",
//     time: "",
//     price: "",
//   });
//   const [workshops, setWorkshops] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);

//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   // Fetch all workshops
//   useEffect(() => {
//     const fetchWorkshops = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/getAllWorkShop`);
//         setWorkshops(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching workshops:", error);
//         alert("❌ Failed to fetch workshops");
//       }
//     };
//     fetchWorkshops();
//   }, []);

//   // Set form data for editing
//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//       setIsEditing(true);
//     } else {
//       setFormData({
//         nameOfWorkShop: "",
//         date: "",
//         time: "",
//         price: "",
//       });
//       setIsEditing(false);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Create Workshop API
//   const handleCreate = async () => {
//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/createWorkShop`,
//         { ...formData, price: String(formData.price) }, // Ensure price is a string
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("✅ Workshop created successfully!");
//       setWorkshops([...workshops, response.data]);
//       setFormData({
//         nameOfWorkShop: "",
//         date: "",
//         time: "",
//         price: "",
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error creating workshop:", error);
//       alert("❌ Failed to create workshop");
//     }
//   };

//   // Update Workshop API
//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(
//         `${config.BASE_URL}/api/updateWorkShop/${formData.id}`,
//         { ...formData, price: String(formData.price) }, // Ensure price is a string
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("✅ Workshop updated successfully!");
//       setWorkshops(
//         workshops.map((ws) => (ws.id === formData.id ? response.data : ws))
//       );
//       setFormData({
//         nameOfWorkShop: "",
//         date: "",
//         time: "",
//         price: "",
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating workshop:", error);
//       alert("❌ Failed to update workshop");
//     }
//   };

//   // Delete Workshop
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this workshop?")) {
//       try {
//         await axios.delete(`${config.BASE_URL}/api/deleteWorkShop/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert("✅ Workshop deleted successfully!");
//         setWorkshops(workshops.filter((ws) => ws.id !== id));
//         if (isEditing && formData.id === id) {
//           setFormData({
//             nameOfWorkShop: "",
//             date: "",
//             time: "",
//             price: "",
//           });
//           setIsEditing(false);
//         }
//       } catch (error) {
//         console.error("Error deleting workshop:", error);
//         alert("❌ Failed to delete workshop");
//       }
//     }
//   };

//   // Edit Workshop 
//   const handleEdit = async (workshop) => {
//     try {
//       const response = await axios.get(`${config.BASE_URL}/api/getWorkShop/${workshop.id}`);
//       setFormData(response.data);
//       setIsEditing(true);
//     } catch (error) {
//       console.error("Error fetching workshop for edit:", error);
//       alert("❌ Failed to fetch workshop details");
//       // Fallback to local data if API call fails
//       setFormData(workshop);
//       setIsEditing(true);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formSection}>
//         <h2>{isEditing ? "Update Workshop" : "Create Workshop"}</h2>
//         <div className={styles.form}>
//           <label>
//             Workshop Name:
//             <Input
//               type="text"
//               name="nameOfWorkShop"
//               value={formData.nameOfWorkShop}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Date:
//             <Input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Time:
//             <Input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Price (₹):
//             <Input
//               type="number"
//               step="0.01"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <Button
//             type="button"
//             className={styles.submitButton}
//             onClick={isEditing ? handleUpdate : handleCreate}
//           >
//             {isEditing ? "Update" : "Create"}
//           </Button>
//         </div>
//       </div>

//       <div className={styles.workshopSection}>
//         <h2>Workshop List</h2>
//         <div className={styles.tableContainer}>
//           <table className={styles.workshopTable}>
//             <thead>
//               <tr>
//                 <th>Workshop ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {workshops.length > 0 ? (
//                 workshops.map((workshop) => (
//                   <tr key={workshop.id}>
//                     <td>{workshop.id}</td>
//                     <td>{workshop.nameOfWorkShop}</td>
//                     <td>{workshop.date}</td>
//                     <td>{workshop.time}</td>
//                     <td>₹{Number(workshop.price).toLocaleString()}</td>
//                     <td>
//                       <button
//                         className={styles.editButton}
//                         onClick={() => handleEdit(workshop)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className={styles.deleteButton}
//                         onClick={() => handleDelete(workshop.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className={styles.noData}>
//                     No workshops available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddWorkshop;