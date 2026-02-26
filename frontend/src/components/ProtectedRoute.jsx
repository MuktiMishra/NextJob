import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;

  if (allowedRole && user.role !== allowedRole)
    return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;