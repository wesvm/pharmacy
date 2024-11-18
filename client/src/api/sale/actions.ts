import { apiRequest } from "@/api/api-service";
import { SaleFormSchema } from "./validations";

export const createSale = async (values: SaleFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>('/sales', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};