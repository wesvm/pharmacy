import { apiRequest } from "@/api/api-service";
import { PurchaseFormSchema } from "./validations";

interface PurchaseResponse extends ApiResonse {
  purchase: Purchase;
}

export const createPurchase = async (values: PurchaseFormSchema): Promise<PurchaseResponse> => {
  return apiRequest<PurchaseResponse>('/purchases', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};