import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db.json");

// Я ЩА УБЬЮ КОГО_ТО ПОЧЕМУ У МЕНЯ fs.existsSync НЕ ХОЧЕТ НАХОДИТЬ МОЙ JSON

//нашел)))))))))))))

console.log("File exists:", fs.existsSync(dbPath));
console.log("Resolved path:", dbPath);

let db = {
  users: [],
  products: [],
  categories: [],
  carts: [],
  orders: [],
  reviews: [],
};

export const loadDB = () => {
  if (fs.existsSync(dbPath)) {
    try {
      const fileData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      db = { ...db, ...fileData };

      console.log("database loaded");

      // логируем количество элементов при загрузке
      console.log("database loaded:");
      console.log(`  users: ${db.users.length}`);
      console.log(`  products: ${db.products.length}`);
      console.log(`  categories: ${db.categories.length}`);
      console.log(`  carts: ${db.carts.length}`);
      console.log(`  orders: ${db.orders.length}`);
      console.log(`  reviews: ${db.reviews.length}`);
    } catch (error) {
      console.log("error loading db.json");
    }
  }
  return db;
};

export const saveDB = () => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.error("error saving database:", error);
    return false;
  }
};

export const getDB = () => db;
