import Button from "@src/app/ui/Button";
import { useNavigate } from "react-router";
import { FormField } from "@src/app/ui/FormField";
import { useAppDispatch } from "@src/app/hooks/redux";
import { loginUser } from "@app/store/authSlice";
import { useLoginForm } from "@src/app/hooks/components/useLoginForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    markAllTouched,
    isFormValid,
  } = useLoginForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();

    if (validateForm()) {
      try {
        await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        ).unwrap();

        console.log("Успешный вход");
        navigate("/profile");
      } catch (error) {
        console.error("Ошибка входа:", error);
      }
    } else {
      console.log("Форма содержит ошибки");
    }
  };

  return (
    <>
      <h1 className="text-2xl">Вход</h1>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            error={errors.email}
            touched={touched.email}
            placeholder="Введите ваш email"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormField
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            error={errors.password}
            touched={touched.password}
            placeholder="Введите пароль"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button type="submit" disabled={!isFormValid()}>
            Войти
          </Button>
          <Button type="submit" onClick={() => navigate("/registration")}>
            Регистрация
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
