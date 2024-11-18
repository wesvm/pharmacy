import { apiRequest } from "@/api/api-service";

export const getCategories = async (): Promise<{ categories: Category[] }> => {
  return apiRequest<{ categories: Category[] }>('/categories', {
    method: 'GET',
  });
};