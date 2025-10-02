import LogoutBtn from "@components/features/LogoutBtn";
import { useAuth } from "@app/hooks/redux/useAuth";

const Profile = () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <div className="flex">
      <LogoutBtn />
    </div>
  );
};

export default Profile;
