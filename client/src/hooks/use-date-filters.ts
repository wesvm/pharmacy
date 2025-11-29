import { subMonths } from 'date-fns';
import { useCallback } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';

export function useDateFilters() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });

  const defaultTo = new Date();
  const defaultFrom = subMonths(defaultTo, 1);

  const from = searchParams.from
    ? new Date(searchParams.from as string)
    : defaultFrom;
  const to = searchParams.to
    ? new Date(searchParams.to as string)
    : defaultTo;

  const setFilters = useCallback((filters: DateFilters) => {
    const newParams: Record<string, string> = { ...searchParams };

    if (filters.from instanceof Date) {
      newParams.from = filters.from.toISOString();
    }
    if (filters.to instanceof Date) {
      newParams.to = filters.to.toISOString();
    }

    navigate({
      search: (prev) => ({ ...prev, ...newParams })
    });
  }, [navigate, searchParams]);

  const clearFilters = useCallback(() => {
    navigate({
      search: (prev) => {
        const { from, to, ...rest } = prev as any;
        return rest;
      }
    });
  }, [navigate]);

  return {
    from,
    to,
    defaultFrom,
    defaultTo,
    setFilters,
    clearFilters
  };
}