import { useState } from "react";

function parseJsonItem<T>(item: unknown, initialValue: T): T {
  try {
    if (!item) return initialValue;
    return JSON.parse(item as string);
  } catch (e) {
    return item as T;
  }
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return parseJsonItem(localStorage.getItem(key), initialValue);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    } catch (error) {
      console.error(error);
      setStoredValue(initialValue);
    }
  };

  return [storedValue, setValue];
}
