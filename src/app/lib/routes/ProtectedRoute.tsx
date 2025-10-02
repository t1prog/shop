import { Navigate, Outlet } from "react-router";
import { useAuth } from "@src/app/hooks/redux";

const ProtectedRoute = () => {
  const { isAuth, isLoading, isError } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
