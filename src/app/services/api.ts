import type { ApiError } from "../types/api";
import { authService } from "./authService";

const API_BASE = "/api";

export const api = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    const token = authService.getToken();

    // Формируем URL с query-параметрами
    const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url.toString(), {
      headers,
      ...options,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ message: "Network error" }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  async post<T>(
    endpoint: string,
    data: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      params,
    );
  },

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "GET",
      },
      params,
    );
  },

  async put<T>(
    endpoint: string,
    data: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      params,
    );
  },

  async delete<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "DELETE",
      },
      params,
    );
  },
};
