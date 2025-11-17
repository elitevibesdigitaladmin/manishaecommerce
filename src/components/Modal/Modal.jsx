import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import AOS from "aos";
import "aos/dist/aos.css";

const Modal = ({ isOpen, onClose, onConfirm, title, message, children }) => {
  if (!isOpen) return null;

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
    <div className={styles.modalOverlay} data-aos="fade-up">
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{title}</h2>
        {message && <p className={styles.modalMessage}>{message}</p>}

        {children}

        {/* Only show Cancel + Confirm if onConfirm exists */}
        {onConfirm && (
          <div className={styles.modalActions}>
            <Button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </Button>
            <Button className={styles.confirmButton} onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

// import React, {useEffect} from "react";
// import styles from "./Modal.module.css";
// import Button from "../Button/Button";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Modal = ({ isOpen, onClose, onConfirm, title, message, children }) => {
//   if (!isOpen) return null;

//   // AOS Init
//         useEffect(() => {
//           AOS.init({
//             duration: 500,
//             offset: 100,
//             easing: "ease-in-out",
//             delay: 0,
//             once: true,
//           });
//         }, []);

//   return (
//     <div className={styles.modalOverlay} data-aos="fade-up">
//       <div className={styles.modal}>
//         <h2 className={styles.modalTitle}>{title}</h2>
//         <p className={styles.modalMessage}>{message}</p>

//         {children}
        
//         <div className={styles.modalActions}>
//           <Button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </Button>
//           <Button className={styles.confirmButton} onClick={onConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;