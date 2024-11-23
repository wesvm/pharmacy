import { apiRequest } from "@/api/api-service";

export const getSummary = async (from: Date | string, to: Date | string): Promise<Summary> => {
  return apiRequest<Summary>(`/summary?from=${from}&to=${to}`, {
    method: 'GET',
  });
};