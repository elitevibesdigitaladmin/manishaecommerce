import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config/apiconfig";
import styles from "./Users.module.css"; // optional CSS module

const Users = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/show-allUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
        setUsers(response.data); // Adjust if response structure is different
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
  <div className={styles.userListContainer}>
    <h2 className={styles.title}>User List</h2>

    <div className={styles.tableWrapper}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>SR.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index}>
              <td>{index + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default Users;
