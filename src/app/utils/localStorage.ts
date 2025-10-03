const get = <T>(key: string, fallback: T): T => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return fallback;
    }

    const item = window.localStorage.getItem(key);

    if (item == null) return fallback;

    const parsed = JSON.parse(item) as T;

    return parsed !== undefined ? parsed : fallback;
  } catch (error) {
    console.warn(`Не удалось прочитать "${key}" из localStorage:`, error);
    return fallback;
  }
};

const set = <T>(key: string, value: T): void => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      console.warn("localStorage не доступен");
      return;
    }

    if (value === undefined) {
      console.warn(`Попытка сохранить undefined для ключа "${key}"`);
      return;
    }

    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Не удалось сохранить "${key}" в localStorage:`, error);
  }
};

const remove = (key: string): void => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Не удалось удалить "${key}" из localStorage:`, error);
  }
};

export const storage = { get, set, remove };
