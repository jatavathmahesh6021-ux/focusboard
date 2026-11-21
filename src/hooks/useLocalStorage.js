import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(function () {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        return initialValue;
      }
    } catch (error) {
      console.log("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(function () {
    try {
      const valueToSave = JSON.stringify(storedValue);
      window.localStorage.setItem(key, valueToSave);
    } catch (error) {
      console.log("Error saving to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;