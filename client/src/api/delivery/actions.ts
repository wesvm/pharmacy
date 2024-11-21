import { apiRequest } from "@/api/api-service";
import { DeliveryFormSchema } from "./validations";

export const updateDelivery = async (id: number, values: DeliveryFormSchema): Promise<ApiResonse> => {
  return apiRequest<ApiResonse>(`/deliveries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
};