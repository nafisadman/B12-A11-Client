import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (!user || userStatus !== "active") {
    console.log("d1", user);
    console.log("d1", userStatus);
    return <Navigate to="/auth/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
