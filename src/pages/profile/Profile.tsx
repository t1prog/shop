import LogoutBtn from "@components/features/LogoutBtn";
import { useAuth } from "@src/app/hooks/redux";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        <span>Почта:</span>
        <span>{user?.email}</span>
      </div>
      <div>
        <span>Имя:</span>
        <span>{user?.name}</span>
      </div>
      <div>
        <span>Корзина:</span>
        <span>Тут будет</span>
      </div>
      <LogoutBtn />
    </div>
  );
};

export default Profile;
