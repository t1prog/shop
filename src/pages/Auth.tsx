import { useAuth } from "@app/hooks/redux/useAuth";
import Registration from "@src/components/auth/Registration";

const Auth = () => {
  const { isAuth } = useAuth();

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
