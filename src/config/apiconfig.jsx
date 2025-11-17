// src/config/apiConfig.js
  
// export const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const BASE1_URL = import.meta.env.VITE_BASE_URL;


const config = {
    // BASE_URL : "http://192.168.1.8:8089",
    BASE_URL: import.meta.env.VITE_BASE_URL ||  "http://192.168.1.8:8089"
    
};

export default config;