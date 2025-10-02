export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RegistrationForm extends Omit<User, "id"> {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
  _persisted: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}
