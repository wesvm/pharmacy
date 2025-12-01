import { apiRequest } from '@/api/api-service'
import type { Supplier } from '@/types/store'

export const getSuppliers = async (): Promise<{ suppliers: Supplier[] }> => {
  return apiRequest<{ suppliers: Supplier[] }>('/suppliers', {
    method: 'GET',
  })
}
