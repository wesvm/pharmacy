import { tokenService } from "./token-service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  isAuthRoute: boolean = true
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = isAuthRoute ? tokenService.getToken() : null;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  return await response.json() as T;
}