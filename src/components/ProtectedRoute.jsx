import React from "react";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";
import { getHomeRouteForRole } from "../utils/routeHelpers";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const role = user?.role;

  // Not authenticated: send to landing page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If specific roles are required and the user doesn't match, redirect to their home (or landing)
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to={getHomeRouteForRole(role)} replace />;
    }
  }

  // Authorized -> render the protected content
  return children;
};

export default ProtectedRoute;
