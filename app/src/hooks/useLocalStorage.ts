import {Dispatch, useCallback, useEffect, useState} from "react";

export const useLocalStorage = (key: string, initialValue: string | null) : [string | null, Dispatch<string>] => {
  const [value, setValue] = useState(
    () => window.localStorage.getItem(key) || initialValue
  )
  const setItem = (newValue: string) => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  }

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (newValue !== value) {
      setValue(newValue || initialValue);
    }
  }, []);

  const handleStorage = useCallback((event: StorageEvent) => {
    if (event.key === key && event.newValue !== value) {
      setValue(event.newValue || initialValue);
    }
  }, [value]);

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [value, setItem];
}