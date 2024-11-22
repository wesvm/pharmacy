import { apiRequest } from "@/api/api-service";

export const getPurchases = async (): Promise<{ purchases: Purchase[] }> => {
  return apiRequest<{ purchases: Purchase[] }>('/purchases', {
    method: 'GET',
  });
};

export const getPurchaseById = async (id: number): Promise<{ purchase: PurchaseDetails }> => {
  return apiRequest<{ purchase: PurchaseDetails }>(`/purchases/${id}`, {
    method: 'GET',
  });
};