import express from "express";
import { getDB, saveDB } from "../db/index.js";
import { sendSuccess, sendError } from "../utils/responses.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const db = getDB();

  if (!name || !email || !password) {
    return sendError(res, "all fields are required");
  }

  const existingUser = db.users.find((user) => user.email === email);
  if (existingUser) {
    return sendError(res, "user with this email already exists");
  }

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.users.push(user);
  saveDB();

  console.log(`new user created, total users: ${db.users.length}`);

  sendSuccess(res, {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: `demo-token-${user.id}`,
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  const user = db.users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return sendError(res, "invalid email or password");
  }

  sendSuccess(res, {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: `demo-token-${user.id}`,
  });
});

export default router;
