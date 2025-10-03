import { storage } from "@app/utils/localStorage";
import { api } from "./api";
import type { LoginCredentials, RegisterData, AuthResponse, User, ApiResponse } from "../types/api";

export const authService = {
  // Token management
  setToken(token: string): void {
    storage.set("token", token);
  },
  getToken(): string | null {
    return storage.get("token", null);
  },
  clearToken: (): void => storage.remove("token"),

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", credentials);
    if (response.success) {
      this.setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.message);
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/register", userData);
    if (response.success) {
      // TODO: ЛИБО УБРАТЬ И СДЕЛАТЬ РЕДИРЕКТ НА СТРАНИЦУ ЛОГИНА, ЛИБО ОБЪЕДЕНИТЬ МЕТОДЫ login register В ЕДИНЫЙ
      this.setToken(response.data.token);
      return response.data;
    }

    throw new Error(response.message);
  },

  async getProfile(): Promise<{ user: User }> {
    return await api.get<{ user: User }>("/auth/me");
  },

  async logout(): Promise<void> {
    this.clearToken();
  },

  // Utility
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  clearAll(): void {
    this.clearToken();
  },
};
