import { apiRequest } from "@/api/api-service";
import { SupplierFormSchema } from "./validations";

export const createSupplier = async (values: SupplierFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>('/suppliers', {
    method: 'POST',
    body: JSON.stringify(values),
  }, true);
};

export const updateSupplier = async (id: number, values: SupplierFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/suppliers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  }, true);
};

export const deleteSupplier = async (id: number): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/suppliers/${id}`, {
    method: 'DELETE',
  }, true);
}