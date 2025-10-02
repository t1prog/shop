import { getDB } from "../db/index.js";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "authorization required" });
  }

  try {
    const userId = token.replace("demo-token-", "");
    const db = getDB();
    const user = db.users.find((u) => u.id === userId);

    if (!user) {
      return res.status(401).json({ message: "invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "authentication error" });
  }
};

// опциональная аутентификация - не блокирует запрос если токена нет
export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token) {
    try {
      const userId = token.replace("demo-token-", "");
      const db = getDB();
      const user = db.users.find((u) => u.id === userId);

      if (user) {
        req.user = user;
      }
    } catch (error) {
      // игнорируем ошибки при опциональной аутентификации
    }
  }

  next();
};
