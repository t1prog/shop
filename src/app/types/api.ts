export interface User {
  id: string;
  name: string;
  email: string;
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
  code?: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  hasMore: boolean;
}

// PRODUCTS
import { PRODUCT_SORT_OPTIONS } from "@app/constants/constProduct";

export interface QueryProducts {
  category?: string;
  brand?: string;
  inStock?: "true" | "false";
  isNew?: "true" | "false";
  isPopular?: "true" | "false";
  limit?: number;
  offset?: number;
  sort?: ProductSortOption;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS];

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: string;
  brand: string;
  images: string[];
  specifications: Record<string, string | number>; // Гибкие спецификации
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface BaseProductSpecifications {
  [key: string]: string | number;
}
