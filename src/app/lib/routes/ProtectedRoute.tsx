import { useAuth } from "@app/hooks/redux/useAuth";
import { useLocation, Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Тут будет загрузка</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
