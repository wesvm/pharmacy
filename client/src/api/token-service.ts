const TOKEN_KEY = 'access_token';

export const tokenService = {
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken: (): string | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      if (payload.exp && payload.exp < currentTime) return null;
      return token;
    } catch (error) {
      return null;
    }
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  }
};
