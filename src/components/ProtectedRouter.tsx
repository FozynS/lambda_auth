import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/useAuth";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { authState } = useContext(AuthContext);

  return authState.token ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
