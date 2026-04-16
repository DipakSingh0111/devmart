import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // check login
  const user = localStorage.getItem("user");

  if (!user) {
    // login nahi hai → login page + redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;