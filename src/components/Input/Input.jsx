
import React from 'react';
import styles from './Input.module.css';

// Input Component
const Input = ({ type, name, value, onChange, placeholder, required, className }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${styles.inputField} ${className}`} // Merge custom and default styles
    />
  );
};


// Textarea Component
const Textarea = ({ name, value, onChange, placeholder, required, className }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${styles.textareaField} ${className}`} // Merge custom and default styles
    />
  );
};

// Export components
export { Input, Textarea };
