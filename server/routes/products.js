import express from "express";
import { getDB } from "../db/index.js";
import { sendSuccess, sendNotFound } from "../utils/responses.js";

const router = express.Router();

// фильтрация товаров по query-параметрам
router.get("/", (req, res) => {
  const { category, brand, inStock, isNew, isPopular } = req.query;
  const db = getDB();

  console.log(`total products in db: ${db.products.length}`);

  let filteredProducts = db.products;

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (brand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === brand);
  }

  if (inStock === "true") {
    filteredProducts = filteredProducts.filter((p) => p.inStock);
  }

  if (isNew === "true") {
    filteredProducts = filteredProducts.filter((p) => p.isNew);
  }

  if (isPopular === "true") {
    filteredProducts = filteredProducts.filter((p) => p.isPopular);
  }

  console.log(`returning ${filteredProducts.length} products after filtering`);

  sendSuccess(res, filteredProducts);
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
