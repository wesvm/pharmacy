import { apiRequest } from "@/api/api-service";

export const getSummary = async (filters: DateFilters): Promise<Summary> => {
  return apiRequest<Summary>(`/summary?from=${filters.from}&to=${filters.to}`, {
    method: 'GET',
  });
};