export const useLocalStorage = (key: string) => {
  const setValue = (value: string) => {
    localStorage.setItem(key, value);
  };

  const getValue = (initialValue: string) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, initialValue);
    }
    return localStorage.getItem(key);
  };

  return [getValue, setValue];
};
