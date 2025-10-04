import type { Product } from "@src/app/types/api";
import { z } from "zod";

// хз по поводу datetime, пока работает и норм)))))))))
export const ProductSchema = z.object({
  id: z.string().min(1).catch("unknown-id"),
  name: z.string().min(1).catch("Неизвестный товар"),
  price: z.number().min(0).catch(0),
  oldPrice: z.number().optional().catch(undefined),
  description: z.string().min(1).catch("Описание отсутствует"),
  category: z.string().min(1).catch("Неизвестная"),
  brand: z.string().min(1).catch("Неизвестный бренд"),
  images: z.array(z.string()).catch([]),
  specifications: z.record(z.string(), z.union([z.string(), z.number()])).catch({}),
  rating: z.number().min(0).max(5).catch(0),
  reviewsCount: z.number().min(0).catch(0),
  inStock: z.boolean().catch(false),
  isNew: z.boolean().catch(false),
  isPopular: z.boolean().catch(false),
  createdAt: z.string().datetime().catch(new Date().toISOString()),
  updatedAt: z.string().datetime().catch(new Date().toISOString()),
  tags: z.array(z.string()).catch([]),
}) satisfies z.ZodType<Product>;

// на основе сингла
export type ValidatedProduct = z.infer<typeof ProductSchema>;

// на основе массива продуктов
export const ProductsArraySchema = z.array(ProductSchema);

// хелперы
export const validateProduct = (data: unknown): ValidatedProduct => {
  if (data === undefined || data === null) {
    // Возвращаем продукт с дефолтными значениями
    return ProductSchema.parse({});
  }
  return ProductSchema.parse(data);
};

export const safeValidateProduct = (data: unknown) => {
  if (data === undefined || data === null) {
    return { success: true, data: ProductSchema.parse({}) };
  }
  return ProductSchema.safeParse(data);
};
