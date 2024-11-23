import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') as ProductFilters['search'];
  const categoryId = searchParams.get('categoryId')
    ? parseInt(searchParams.get('categoryId') as string)
    : undefined;

  const setFilters = useCallback((filters: ProductFilters) => {
    setSearchParams((params) => {
      if (filters.search !== undefined) {
        params.set('search', filters.search);
      }

      if (filters.search === '') {
        params.delete('search');
      }

      if (filters.categoryId) {
        params.set('categoryId', filters.categoryId.toString());
      }

      if (filters.categoryId === undefined) {
        params.delete('categoryId');
      }

      return params;
    });
  }, []);

  return {
    search,
    categoryId,
    setFilters
  };
}