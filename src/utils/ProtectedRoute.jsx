// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children, role }) => {
//   const { token, role: userRole, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   if (!token) return <Navigate to="/login" replace />;

//   if (role && userRole !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;









// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute() {
//   const { jwtToken } = useAuth();

//   if (!jwtToken) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.token) {
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
