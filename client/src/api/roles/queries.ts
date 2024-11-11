import { apiRequest } from "@/api/api-service";

export const getRoles = async (): Promise<{ roles: Role[] }> => {
  return apiRequest<{ roles: Role[] }>('/roles', {
    method: 'GET',
  }, true);
};