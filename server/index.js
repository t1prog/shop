import express from "express";
import cors from "cors";
import { loadDB } from "./db/index.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import { authenticateToken } from "./middleware/auth.js";

const app = express();
const port = 3001;

loadDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/auth/me", authenticateToken, (req, res) => {
  const user = req.user;
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});

// логгирование запросов
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
