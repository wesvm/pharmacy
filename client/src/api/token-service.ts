const TOKEN_KEY = 'access_token';

export const tokenService = {
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getToken: (): string | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const [, payloadBase64] = token.split('.');
      if (!payloadBase64) return null;

      const payload = JSON.parse(atob(payloadBase64));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      return token;
    } catch (e) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  }
};
