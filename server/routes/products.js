import express from "express";
import { getDB } from "../db/index.js";
import { sendSuccess, sendNotFound } from "../utils/responses.js";

const router = express.Router();

// фильтрация товаров по query-параметрам
router.get("/", (req, res) => {
  const {
    category,
    brand,
    inStock,
    isNew,
    isPopular,
    limit,
    offset,
    sort,
    minPrice,
    maxPrice,
    search,
  } = req.query;

  const db = getDB();
  let filteredProducts = db.products;

  // Базовые фильтры
  if (category) filteredProducts = filteredProducts.filter((p) => p.category === category);
  if (brand) filteredProducts = filteredProducts.filter((p) => p.brand === brand);
  if (inStock === "true") filteredProducts = filteredProducts.filter((p) => p.inStock);
  if (isNew === "true") filteredProducts = filteredProducts.filter((p) => p.isNew);
  if (isPopular === "true") filteredProducts = filteredProducts.filter((p) => p.isPopular);

  // Фильтр по цене
  if (minPrice) {
    const min = parseInt(minPrice);
    filteredProducts = filteredProducts.filter((p) => p.price >= min);
  }
  if (maxPrice) {
    const max = parseInt(maxPrice);
    filteredProducts = filteredProducts.filter((p) => p.price <= max);
  }

  // Поиск по названию и описанию
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower),
    );
  }

  // Сортировка
  if (!sort || sort === "popular") {
    filteredProducts.sort((a, b) => {
      if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
      return b.rating - a.rating;
    });
  } else if (sort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sort === "price_asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "reviews") {
    filteredProducts.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  // Пагинация
  const limitNum = Math.max(0, parseInt(limit, 10) || 12);
  const offsetNum = Math.max(0, parseInt(offset, 10) || 0);
  const paginatedProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum);

  sendSuccess(res, {
    products: paginatedProducts,
    total: filteredProducts.length,
    hasMore: offsetNum + limitNum < filteredProducts.length,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const db = getDB();

  const product = db.products.find((p) => p.id === id);
  if (!product) {
    return sendNotFound(res, "product not found");
  }

  // добавляем отзывы к товару
  const productReviews = db.reviews.filter((r) => r.productId === product.id);

  sendSuccess(res, {
    ...product,
    reviews: productReviews,
  });
});

export default router;
