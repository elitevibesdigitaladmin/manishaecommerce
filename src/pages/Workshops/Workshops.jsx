import React, { useEffect, useState } from "react";
import styles from "./Workshops.module.css";
import axios from "axios";
import config from "../../config/apiconfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workshops = () => {
  const token = localStorage.getItem("jwtToken");

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  // Popup States
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);

  // Fetch all Workshop API
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/workshop/getAllWorkShop`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
      } catch (error) {
        console.error("Error fetching workshops:", error);
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

  // 📌 Open confirm popup
  const handleOpenPopup = (workshopId) => {
    setSelectedWorkshopId(workshopId);
    setShowPopup(true);
  };

  // 📌 BOOK WORKSHOP AFTER CONFIRMATION
  const handleBookWorkshop = async () => {
    const workshopId = selectedWorkshopId;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    setBookingId(workshopId);

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/workshop/book/${workshopId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Workshop booked successfully!");
      console.log("Booking Response:", response.data);

      setShowPopup(false);
      setShowSuccessPopup(true);

    } catch (error) {
      console.error("Error booking workshop:", error);
      toast.error("❌ Failed to book workshop. Try again.");
    } finally {
      setBookingId(null);
    }
  };

  // ----------------------------------------------------------------

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

                <button
                  className={styles.bookButton}
                  disabled={bookingId === workshop.id}
                  onClick={() => handleOpenPopup(workshop.id)}
                >
                  {bookingId === workshop.id ? "Booking..." : "Book Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ----------------- CONFIRM POPUP ------------------ */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h3>Are you sure?</h3>
            <p>Do you want to book this workshop?</p>

            <div className={styles.popupButtons}>
              <button
                className={styles.yesBtn}
                onClick={handleBookWorkshop}
              >
                Yes
              </button>

              <button
                className={styles.noBtn}
                onClick={() => setShowPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUCCESS POPUP ------------------ */}
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h3>🎉 Congratulations!</h3>
            <p>Your workshop booking is successful!</p>

            <button
              className={styles.okBtn}
              onClick={() => setShowSuccessPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Workshops;
