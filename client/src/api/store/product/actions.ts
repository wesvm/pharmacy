import { apiRequest } from "@/api/api-service";
import { ProductFormSchema } from "./validations";

export const createProduct = async (values: ProductFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>('/products', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};

export const updateProduct = async (id: number, values: ProductFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
};

export const deleteProduct = async (id: number): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/products/${id}`, {
    method: 'DELETE',
  });
}