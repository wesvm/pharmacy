import { apiRequest } from "@/api/api-service";

export const getSales = async (): Promise<{ sales: Sale[] }> => {
  return apiRequest<{ sales: Sale[] }>('/sales', {
    method: 'GET',
  });
};