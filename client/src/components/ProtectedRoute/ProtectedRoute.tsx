import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLogged } = useAuth();

  if (isLogged === undefined) return <>Loading...</>;

  if (!isLogged) return <Navigate to="/login" />;

  return <>{children}</>;
}
