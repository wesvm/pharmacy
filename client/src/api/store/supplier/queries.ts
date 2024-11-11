import { apiRequest } from "@/api/api-service";

export const getSuppliers = async (): Promise<{ suppliers: Supplier[] }> => {
  return apiRequest<{ suppliers: Supplier[] }>('/suppliers', {
    method: 'GET',
  }, true);
};