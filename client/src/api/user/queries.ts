import { apiRequest } from "@/api/api-service";

export const getUsers = async (): Promise<{ users: User[] }> => {
  return apiRequest<{ users: User[] }>('/users', {
    method: 'GET',
  }, true);
};