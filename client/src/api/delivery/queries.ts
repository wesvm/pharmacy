import { apiRequest } from '@/api/api-service'
import type { Delivery } from '@/types/store'

export const getDeliveries = async (): Promise<{ deliveries: Delivery[] }> => {
  return apiRequest<{ deliveries: Delivery[] }>('/deliveries', {
    method: 'GET',
  })
}
