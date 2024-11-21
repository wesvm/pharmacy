import { apiRequest } from "@/api/api-service";

export const getDeliveries = async (): Promise<{ deliveries: Delivery[] }> => {
  return apiRequest<{ deliveries: Delivery[] }>('/deliveries', {
    method: 'GET',
  });
};