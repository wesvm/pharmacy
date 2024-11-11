import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./auth-context";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      logout()
    }
  }, [location.pathname, isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}