import { apiRequest } from '@/api/api-service'
import type { Category } from '@/types/store'

export const getCategories = async (): Promise<{ categories: Category[] }> => {
  return apiRequest<{ categories: Category[] }>('/categories', {
    method: 'GET',
  })
}
