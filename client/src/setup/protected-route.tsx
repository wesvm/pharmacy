import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./auth-context";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRoles?: string[];
}

export const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      logout()
    }
  }, [location.pathname, isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}