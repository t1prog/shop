export const PRODUCT_SORT_OPTIONS = {
  POPULAR: "popular",
  RATING: "rating",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  NEWEST: "newest",
  NAME: "name",
  REVIEWS: "reviews",
} as const;

export const PRODUCT_FILTERS = {
  IN_STOCK: "inStock",
  IS_NEW: "isNew",
  IS_POPULAR: "isPopular",
} as const;

export const PRODUCT_CATEGORIES = {
  SMARTPHONES: "smartphones",
  LAPTOPS: "laptops",
  HEADPHONES: "headphones",
  GAMING: "gaming",
  WEARABLES: "wearables",
  CLOTHING: "clothing",
  SHOES: "shoes",
  ACCESSORIES: "accessories",
} as const;

export const CATEGORY_NAMES: Record<string, string> = {
  [PRODUCT_CATEGORIES.SMARTPHONES]: "Смартфоны",
  [PRODUCT_CATEGORIES.LAPTOPS]: "Ноутбуки",
  [PRODUCT_CATEGORIES.HEADPHONES]: "Наушники",
  [PRODUCT_CATEGORIES.GAMING]: "Игровые консоли",
  [PRODUCT_CATEGORIES.WEARABLES]: "Умные часы",
  [PRODUCT_CATEGORIES.CLOTHING]: "Одежда",
  [PRODUCT_CATEGORIES.SHOES]: "Обувь",
  [PRODUCT_CATEGORIES.ACCESSORIES]: "Аксессуары",
} as const;

export const DEFAULT_PRODUCT_LIMIT = 12;
export const DEFAULT_PRODUCT_OFFSET = 0;
