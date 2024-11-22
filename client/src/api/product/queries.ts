import { apiRequest } from "@/api/api-service";

export const getProducts = async (): Promise<{ products: Product[] }> => {
  return apiRequest<{ products: Product[] }>('/products', {
    method: 'GET',
  });
};

export const getProductsToSale = async (): Promise<{ products: Product[] }> => {
  return apiRequest<{ products: Product[] }>('/products/sale', {
    method: 'GET',
  });
};

export const getProductsToPurchase = async (): Promise<{ products: Product[] }> => {
  return apiRequest<{ products: Product[] }>('/products?isArchived=false', {
    method: 'GET',
  });
};