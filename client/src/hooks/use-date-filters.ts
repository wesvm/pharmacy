import { subMonths } from 'date-fns';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useDateFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTo = new Date();
  const defaultFrom = subMonths(defaultTo, 1);
  const from = searchParams.get('from')
    ? new Date(searchParams.get('from') as string)
    : defaultFrom;
  const to = searchParams.get('to')
    ? new Date(searchParams.get('to') as string)
    : defaultTo;

  const setFilters = useCallback((filters: DateFilters) => {
    setSearchParams((params) => {
      if (filters.from) {
        params.set('from', filters.from.toISOString());
      }
      if (filters.to) {
        params.set('to', filters.to.toISOString());
      }

      return params;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchParams((params) => {
      params.delete('from');
      params.delete('to');
      return params;
    });
  }, [])

  return {
    from,
    to,
    defaultFrom,
    defaultTo,
    setFilters,
    clearFilters
  };
}