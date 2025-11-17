import React, { useEffect} from "react";
import styles from "./Pagination.module.css"; // Import styles
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {

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
    <div className={styles.pagination} data-aos="fade-up">
      <button onClick={onPrev} disabled={currentPage === 1} className={styles.pageBtn}>
        <MdOutlineSkipPrevious/> Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={onNext} disabled={currentPage === totalPages} className={styles.pageBtn}>
        Next <MdOutlineSkipNext/>
      </button>
    </div>
  );
};

export default Pagination;
