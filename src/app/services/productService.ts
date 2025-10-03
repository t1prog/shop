import type { QueryProducts, Product, PaginatedResponse, ApiResponse } from "@app/types/api";
import { api } from "./api";
import { toQueryParams } from "@app/utils/queryParams";

export const productService = {
  async getProducts(query: QueryProducts = {}) {
    const params = toQueryParams(query);
    const response = await api.get<ApiResponse<PaginatedResponse<Product>>>("/products", params);

    if (response.success) {
      return response.data;
    }
    return;
  },
};
