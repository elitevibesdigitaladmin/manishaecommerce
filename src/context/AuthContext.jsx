// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//     setIsAuthenticated(!!token);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("ecommerce_login", JSON.stringify(userData));
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("ecommerce_login");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// ==============================


// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null); // NEW

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("ecommerce_login"));
//     if (stored?.jwtToken) {
//       setIsAuthenticated(true);
//       setUser(stored.user || stored.admin || null); // handles both admin and user
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("ecommerce_login", JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData.user || userData.admin); // assumes one or the other is defined
//   };

//   const logout = () => {
//     localStorage.removeItem("ecommerce_login");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// ==========================

// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // { token, role }

//   // Get token and role from localStorage
//   const getAuth = () => {
//     const token = localStorage.getItem("jwtToken");
//     const role = localStorage.getItem("userRole");
//     return token ? { token, role } : null;
//   };

//   // Load user on mount
//   useEffect(() => {
//     const auth = getAuth();
//     if (auth) setUser(auth);
//   }, []);

//   // LOGIN: store token & role
//   const login = (token, role) => {
//     localStorage.setItem("jwtToken", token);
//     localStorage.setItem("userRole", role);
//     setUser({ token, role });
//   };

//   // LOGOUT
//   const logout = () => {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("userRole");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);






















import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("userRole");
    return token ? { token, role } : null;
  });

  // LOGIN
  const login = (token, role) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userRole", role);
    setUser({ token, role });
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
