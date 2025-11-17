// import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBtn = () => {
  return (
    <a
      href="https://wa.me/+917028917456" 
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "12px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#418c6b",
        borderRadius: "25%",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FaWhatsapp size={25} color="#fff" /> 
    </a>
  );
};

export default WhatsAppBtn;
