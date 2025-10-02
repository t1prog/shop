import { storage } from "@app/utils/localStorage";
import { api } from "./api";
import type { LoginCredentials, RegisterData, AuthResponse, User } from "../types/api";

export const authService = {
  // Token management
  getToken: (): string | null => storage.get("token", null),
  setToken: (token: string): void => storage.set("token", token),
  clearToken: (): void => storage.remove("token"),

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    this.setToken(response.token);
    return response;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    this.setToken(response.token);
    return response;
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
