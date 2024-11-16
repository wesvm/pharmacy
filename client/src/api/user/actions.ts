import { apiRequest } from "@/api/api-service";
import { CreateUserSchema, UpdateUserSchema } from "./validations";

export const createUser = async (values: CreateUserSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>('/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};

export const updateUser = async (userId: number, values: UpdateUserSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
};

export const deleteUser = async (userId: number): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/users/${userId}`, {
    method: 'DELETE',
  });
}