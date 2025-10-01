import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const Login = () => {
  const location = useLocation();

  // Получаем переданный state
  const from = location.state?.from?.pathname || "/";

  // const handleLogin = () => {
  //   Navigate(from, { replace: true });
  // };

  return (
    <div>
      <h2>Login Page</h2>
      <p>После входа вы вернетесь на: {from}</p>
    </div>
  );
};

export default Login;
