import { Navigate, Outlet } from "react-router";
import { useAuth } from "@app/hooks/redux";

const PublicRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
