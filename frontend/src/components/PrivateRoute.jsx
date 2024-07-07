import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext); // Get authentication state from context

  return isLoggedIn ? { children } : <Navigate to="/" />;
};

export default PrivateRoute;
