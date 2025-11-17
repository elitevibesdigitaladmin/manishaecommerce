

import React, { useState, useEffect} from "react";
import styles from "./Accordion.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";


const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className={styles.accordionItem} data-aos="fade-up">
      {/* Accordion Header */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={styles.accordionTitle}>{title}</h3>
        {isOpen ? (
          <MdArrowDropUp className={styles.icon} />
        ) : (
          <MdArrowDropDown className={styles.icon} />
        )}
      </div>

      {/* Accordion Content (Visible when open) */}
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;
