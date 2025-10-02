import type { User } from "@app/types/auth";

type StorageSchema = {
  theme: "light" | "dark";
  token: string | null;
  user: User | null;
};

const get = <K extends keyof StorageSchema>(
  key: K,
  fallback: StorageSchema[K],
): StorageSchema[K] => {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as StorageSchema[K];
  } catch (error) {
    console.warn(`Не удалось прочитать "${key}" из localStorage:`, error);
    return fallback;
  }
};

const set = <K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): void => {
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Не удалось сохранить "${key}" в localStorage:`, error);
  }
};

const remove = <K extends keyof StorageSchema>(key: K): void => {
  window.localStorage.removeItem(key);
};

export const storage = { get, set, remove };
