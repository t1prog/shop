import express from "express";
import { getDB, saveDB } from "../db/index.js";
import { sendSuccess, sendError, sendNotFound } from "../utils/responses.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// все роуты корзины требуют авторизации
router.use(authenticateToken);

router.get("/", (req, res) => {
  const db = getDB();
  const userId = req.user.id;

  console.log(`user ${userId} fetching cart, total carts: ${db.carts.length}`);

  let cart = db.carts.find((c) => c.userId === userId);

  // создаем корзину если не существует
  if (!cart) {
    cart = {
      id: Date.now().toString(),
      userId: userId,
      items: [],
      updatedAt: new Date().toISOString(),
    };
    db.carts.push(cart);
    saveDB();

    console.log(`created new cart for user ${userId}`);
  }

  // добавляем информацию о товарах
  const cartWithProducts = {
    ...cart,
    items: cart.items.map((item) => {
      const product = db.products.find((p) => p.id === item.productId);
      return {
        ...item,
        product: product
          ? {
              id: product.id,
              name: product.name,
              price: product.price,
              images: product.images,
              inStock: product.inStock,
            }
          : null,
      };
    }),
  };

  console.log(`returning cart with ${cart.items.length} items`);

  sendSuccess(res, cartWithProducts);
});

router.post("/items", (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const db = getDB();
  const userId = req.user.id;

  console.log(`user ${userId} adding to cart, products in db: ${db.products.length}`);

  const product = db.products.find((p) => p.id === productId);
  if (!product) {
    return sendNotFound(res, "product not found");
  }

  let cart = db.carts.find((c) => c.userId === userId);
  if (!cart) {
    cart = {
      id: Date.now().toString(),
      userId: userId,
      items: [],
      updatedAt: new Date().toISOString(),
    };
    db.carts.push(cart);
  }

  const existingItemIndex = cart.items.findIndex((item) => item.productId === productId);

  if (existingItemIndex >= 0) {
    // увеличиваем количество если товар уже в корзине
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].addedAt = new Date().toISOString();

    console.log(`updated item quantity to ${cart.items[existingItemIndex].quantity}`);
  } else {
    // добавляем новый товар
    cart.items.push({
      productId,
      quantity,
      addedAt: new Date().toISOString(),
    });

    console.log(`added new item to cart`);
  }

  cart.updatedAt = new Date().toISOString();
  saveDB();

  console.log(`cart now has ${cart.items.length} items`);

  sendSuccess(res, cart);
});

router.put("/items/:productId", (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const db = getDB();
  const userId = req.user.id;

  console.log(`user ${userId} updating cart item ${productId}`);

  const cart = db.carts.find((c) => c.userId === userId);
  if (!cart) {
    return sendNotFound(res, "cart not found");
  }

  const itemIndex = cart.items.findIndex((item) => item.productId === productId);
  if (itemIndex === -1) {
    return sendNotFound(res, "product not found in cart");
  }

  if (quantity <= 0) {
    // удаляем товар если количество 0 или меньше
    cart.items.splice(itemIndex, 1);

    console.log(`removed item from cart`);
  } else {
    // обновляем количество
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].addedAt = new Date().toISOString();

    console.log(`updated item quantity to ${quantity}`);
  }

  cart.updatedAt = new Date().toISOString();
  saveDB();

  console.log(`cart now has ${cart.items.length} items`);

  sendSuccess(res, cart);
});

router.delete("/items/:productId", (req, res) => {
  const { productId } = req.params;
  const db = getDB();
  const userId = req.user.id;

  const cart = db.carts.find((c) => c.userId === userId);
  if (!cart) {
    return sendNotFound(res, "cart not found");
  }

  const itemIndex = cart.items.findIndex((item) => item.productId === productId);
  if (itemIndex === -1) {
    return sendNotFound(res, "product not found in cart");
  }

  cart.items.splice(itemIndex, 1);
  cart.updatedAt = new Date().toISOString();
  saveDB();

  console.log(`item removed, cart now has ${cart.items.length} items`);

  sendSuccess(res, cart);
});

router.delete("/", (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  const cart = db.carts.find((c) => c.userId === userId);

  console.log(`user ${userId} clearing cart`);

  if (cart) {
    cart.items = [];
    cart.updatedAt = new Date().toISOString();
    saveDB();

    console.log(`cleared ${itemsCount} items from cart`);
  }

  sendSuccess(res, null, "cart cleared");
});

export default router;
