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
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedRole = localStorage.getItem("role");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);

    setLoading(false);
  }, []);

  const login = (jwtToken, roleName) => {
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("role", roleName);

    setToken(jwtToken);
    setRole(roleName);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
