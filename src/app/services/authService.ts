import { storage } from "@app/utils/localStorage";

export const AuthService = {
  // Token
  getToken: () => storage.get("token", null),
  setToken: (token: string) => storage.set("token", token),
  clearToken: () => storage.remove("token"),

  clearAll: () => {
    AuthService.clearToken();
  },
};
