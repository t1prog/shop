import { useState } from "react";
import type { RegistrationForm } from "@src/app/types/auth";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
}

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Имя обязательно для заполнения";
        if (value.length < 2) return "Имя должно содержать минимум 2 символа";
        if (value.length > 50) return "Имя не должно превышать 50 символов";
        if (!/^[a-zA-Zа-яА-ЯёЁ\s\\-]+$/.test(value))
          return "Имя может содержать только буквы, пробелы и дефисы";
        return "";

      case "email":
        if (!value.trim()) return "Email обязателен для заполнения";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Введите корректный email адрес";
        return "";

      case "password":
        if (!value) return "Пароль обязателен для заполнения";
        if (value.length < 8) return "Пароль должен содержать минимум 8 символов";
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value))
          return "Пароль должен содержать хотя бы одну заглавную и одну строчную букву";
        if (!/(?=.*\d)/.test(value)) return "Пароль должен содержать хотя бы одну цифру";
        return "";

      case "passwordRepeat":
        if (!value) return "Повторите пароль";
        if (value !== formData.password) return "Пароли не совпадают";
        return "";

      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof RegistrationForm]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const markAllTouched = () => {
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setTouched(allTouched);
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((value) => value.trim() !== "")
    );
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    markAllTouched,
    isFormValid,
  };
};
