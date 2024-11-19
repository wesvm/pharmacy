import { apiRequest } from "@/api/api-service";

export const getSales = async (): Promise<{ sales: Sale[] }> => {
  return apiRequest<{ sales: Sale[] }>('/sales', {
    method: 'GET',
  });
};

export const getSaleById = async (id: number): Promise<{ sale: SaleDetails }> => {
  return apiRequest<{ sale: SaleDetails }>(`/sales/${id}`, {
    method: 'GET',
  });
};