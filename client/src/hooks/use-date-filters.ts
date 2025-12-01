import { useNavigate, useSearch } from '@tanstack/react-router'
import { subMonths } from 'date-fns'
import { useCallback } from 'react'

export function useDateFilters() {
  const navigate = useNavigate()
  const searchParams = useSearch({ strict: false })

  const defaultTo = new Date()
  const defaultFrom = subMonths(defaultTo, 1)

  const from = searchParams.from ? new Date(searchParams.from as string) : defaultFrom
  const to = searchParams.to ? new Date(searchParams.to as string) : defaultTo

  const setFilters = useCallback(
    (filters: DateFilters) => {
      const newParams = { ...searchParams }

      if (filters.from instanceof Date) {
        newParams.from = filters.from.toISOString()
      }
      if (filters.to instanceof Date) {
        newParams.to = filters.to.toISOString()
      }

      navigate({
        // cast reducer to any to satisfy @tanstack/router search reducer generics
        search: ((prev: any) => ({ ...prev, ...newParams })) as any,
      })
    },
    [navigate, searchParams]
  )

  return {
    from,
    to,
    defaultFrom,
    defaultTo,
    setFilters,
  }
}
