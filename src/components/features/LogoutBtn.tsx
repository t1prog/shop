import { useAuth } from "@app/hooks/redux/useAuth";
import Button from "@app/ui/Button";

const LogoutBtn = () => {
  const { logout } = useAuth();
  return (
    <Button onClick={logout} className="!border-red-400">
      <span className="!text-red-400">Выйти</span>
    </Button>
  );
};

export default LogoutBtn;
