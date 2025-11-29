import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback } from 'react'
import { z } from 'zod'

export const productFiltersSchema = z.object({
  search: z.string().optional(),
  categoryId: z.number().optional(),
})

export type ProductFilters = z.infer<typeof productFiltersSchema>

export function useProductFilters() {
  const navigate = useNavigate()
  // Get current search params from the route
  const searchParams = useSearch({ strict: false }) as ProductFilters

  const setFilters = useCallback(
    (filters: ProductFilters) => {
      navigate({
        search: (prev) => {
          const updated = { ...prev }

          // Handle search param
          if (filters.search !== undefined) {
            if (filters.search === '') {
              delete (updated as any).search
            } else {
              updated.search = filters.search
            }
          }

          if ('categoryId' in filters) {
            if (filters.categoryId === undefined) {
              delete (updated as any).categoryId // Eliminar el parámetro
            } else {
              updated.categoryId = filters.categoryId
            }
          }

          return updated
        },
      })
    },
    [navigate]
  )

  return {
    search: searchParams.search,
    categoryId: searchParams.categoryId,
    setFilters,
  }
}
