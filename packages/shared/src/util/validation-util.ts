export const ValidationUtil = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone);
  },

  isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};
