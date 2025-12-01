import { apiRequest } from '@/api/api-service'
import type { Purchase } from '@/types/store'
import type { PurchaseFormSchema } from './validations'

interface PurchaseResponse extends ApiResonse {
  purchase: Purchase
}

export const createPurchase = async (values: PurchaseFormSchema): Promise<PurchaseResponse> => {
  return apiRequest<PurchaseResponse>('/purchases', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
