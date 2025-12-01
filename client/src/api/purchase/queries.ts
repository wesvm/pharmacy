import { apiRequest } from "@/api/api-service";
import type { Purchase, PurchaseDetails } from "@/types/store";

export const getPurchases = async (): Promise<{ purchases: Purchase[] }> => {
  return apiRequest<{ purchases: PurchaseDetails[] }>('/purchases', {
    method: 'GET',
  });
};

export const getPurchaseById = async (id: number): Promise<{ purchase: PurchaseDetails }> => {
  return apiRequest<{ purchase: PurchaseDetails }>(`/purchases/${id}`, {
    method: 'GET',
  });
};