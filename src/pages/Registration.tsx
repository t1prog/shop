import Button from "@src/app/ui/Button";
import { useNavigate } from "react-router";
import { useRegistrationForm } from "@src/app/hooks/components/useRegistrationForm";
import { FormField } from "@src/app/ui/FormField";
import { useAppDispatch } from "@src/app/hooks/redux";
import { registerUser } from "@app/store/authSlice";

const Registration = () => {
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
  } = useRegistrationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    markAllTouched();

    if (validateForm()) {
      const result = await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();

      console.log("Успешная регистрация:", result);
      // Отправка
    } else {
      console.log("Форма содержит ошибки");
    }
  };

  return (
    <>
      <h1 className="text-2xl">Регистрация</h1>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField
            label="Имя пользователя"
            type="text"
            name="name"
            value={formData.name}
            error={errors.name}
            touched={touched.name}
            placeholder="Введите ваше имя"
            onChange={handleChange}
            onBlur={handleBlur}
          />

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

          <FormField
            label="Повторите пароль"
            type="password"
            name="passwordRepeat"
            value={formData.passwordRepeat}
            error={errors.passwordRepeat}
            touched={touched.passwordRepeat}
            placeholder="Повторите пароль"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button type="submit" disabled={!isFormValid}>
            Зарегистрироваться
          </Button>
          <Button type="submit" onClick={() => navigate("/login")}>
            Войти
          </Button>
        </form>
      </div>
    </>
  );
};

export default Registration;
