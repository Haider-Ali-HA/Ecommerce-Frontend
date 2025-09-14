import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { getHomeRouteForRole } from "../utils/routeHelpers";

// PublicRoute blocks access for authenticated users (e.g., landing, login/register pages)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    const role = user?.role;
    return <Navigate to={getHomeRouteForRole(role)} replace />;
  }

  return children;
};

export default PublicRoute;
