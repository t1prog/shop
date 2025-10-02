import { useAuth } from "@app/hooks/redux/useAuth";
import Button from "@app/ui/Button";

const Auth = () => {
  const { isAuth } = useAuth();

  return (
    <div className="h-full">
      <h2 className="text-4xl sm:text-6xl font-black flex flex-col md:flex-row pb-10">
        <span>Регистрация/</span>
        <span>Авторизация</span>
      </h2>
      <div className="flex flex-col justify-center items-center">
        <h1>Ты {isAuth ? "" : "не"} авторизован!</h1>
        <Button>Зайти под тестом</Button>
      </div>
    </div>
  );
};

export default Auth;
