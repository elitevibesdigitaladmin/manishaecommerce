import React, { useEffect, useState } from "react";
import styles from "./Workshops.module.css";
import axios from "axios";
import config from "../../config/apiconfig";

const Workshops = () => {

  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all Workshop api

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        console.log("Fetching workshops with URL:", `${config.BASE_URL}/api/getAllWorkShop`);
        console.log("Token:", token);

        const response = await axios.get(`${config.BASE_URL}/api/getAllWorkShop`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Workshops response:", response.data);

        let workshopsArray;
        if (Array.isArray(response.data)) {
          workshopsArray = response.data;
        } else if (response.data.workshops && Array.isArray(response.data.workshops)) {
          workshopsArray = response.data.workshops;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          workshopsArray = response.data.data;
        } else if (
          response.data &&
          typeof response.data === "object" &&
          response.data.id &&
          response.data.nameOfWorkShop
        ) {
          workshopsArray = [response.data];
        } else {
          throw new Error("Response data is not in a valid format");
        }

        const validWorkshops = workshopsArray.filter(
          (ws) => ws.id && ws.nameOfWorkShop && ws.date && ws.time && ws.price
        );

        setWorkshops(validWorkshops);
        setLoading(false);

        if (validWorkshops.length !== workshopsArray.length) {
          console.warn("Some workshop objects were invalid:", workshopsArray);
        }

      } catch (error) {
        console.error("Error fetching workshops:", {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          } : null,
          request: error.request,
          config: error.config,
        });
        setError("❌ Failed to fetch workshops");
        setWorkshops([]);
        setLoading(false);
      }
    };

    if (token) {
      fetchWorkshops();
    } else {
      setLoading(false);
      setError("Please log in to view workshops");
    }
  }, [token]);

  if (loading) return <p className={styles.loading}>Loading workshops...</p>;
  if (error) return <p className={styles.error}>{error}</p>;


  return (
    <>
    <section className={styles.workshopsContainer}>
          <h1>Workshops</h1>
          {workshops.length === 0 ? (
        <p>No workshops available at the moment.</p>
      ) : (
        <div className={styles.workshopsGrid}>
          {workshops.map((workshop) => (
             <div key={workshop.id} className={styles.workshopCard}>
             <h2>{workshop.nameOfWorkShop}</h2>
             <p><strong>Date:</strong> {workshop.date}</p>
             <p><strong>Time:</strong> {workshop.time}</p>
             <p><strong>Price:</strong> ₹{workshop.price}</p>
             {workshop.description && <p>{workshop.description}</p>}
         
             <button className={styles.bookButton}>Book Now</button>
           </div>
          ))}
        </div>
      )}

        </section>
    </>
  )
}

export default Workshops