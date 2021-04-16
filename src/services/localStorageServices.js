export const localStorageServices = {
  setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  },
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  },
};
