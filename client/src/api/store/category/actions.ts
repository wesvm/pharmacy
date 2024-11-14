import { apiRequest } from "@/api/api-service";
import { CategoryFormSchema } from "./validations";

export const createCategory = async (values: CategoryFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>('/categories', {
    method: 'POST',
    body: JSON.stringify(values),
  }, true);
};

export const updateCategory = async (id: number, values: CategoryFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  }, true);
};

export const deleteCategory = async (id: number): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/categories/${id}`, {
    method: 'DELETE',
  }, true);
}