export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordRepeat?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
}
