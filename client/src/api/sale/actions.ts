import { apiRequest } from "@/api/api-service";
import { SaleFormSchema } from "./validations";

interface SaleResponse extends ApiResonse {
  sale: Sale;
}

export const createSale = async (values: SaleFormSchema): Promise<SaleResponse> => {
  return apiRequest<SaleResponse>('/sales', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};