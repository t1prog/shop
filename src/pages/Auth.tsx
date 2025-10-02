import { useAuth } from "@app/hooks/redux/useAuth";
import Registration from "@src/components/auth/Registration";
import { useEffect } from "react";
import { useLocation, useMatches } from "react-router";
import type { RouteHandle } from "@src/app/types/router";

const Auth = () => {
  const { isAuth } = useAuth();
  const matches = useMatches();
  const location = useLocation();

  useEffect(() => {
    const routeMatch = matches.find((match) => (match.handle as RouteHandle)?.title);
    const title = (routeMatch?.handle as RouteHandle)?.title;

    if (title) {
      document.title = title;
    }
  }, [location, matches]);

  if (!isAuth) {
    return <Registration />;
  }

  return (
    <div className="h-full">
      <h2 className="text-4xl sm:text-6xl font-black flex flex-col md:flex-row pb-10">
        <span>Регистрация/</span>
        <span>Авторизация</span>
      </h2>
    </div>
  );
};

export default Auth;
