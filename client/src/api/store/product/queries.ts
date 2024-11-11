import { apiRequest } from "@/api/api-service";

export const getProducts = async (): Promise<{ products: Product[] }> => {
  return apiRequest<{ products: Product[] }>('/products', {
    method: 'GET',
  }, true);
};