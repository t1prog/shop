// utils/localStorage.ts
const get = <T>(key: string, fallback: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Не удалось прочитать "${key}" из localStorage:`, error);
    return fallback;
  }
};

const set = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Не удалось сохранить "${key}" в localStorage:`, error);
  }
};

const remove = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const storage = { get, set, remove };
