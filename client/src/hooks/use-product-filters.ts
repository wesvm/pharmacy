import { useCallback, useEffect } from 'react';
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

      if (filters.categoryId) {
        params.set('categoryId', filters.categoryId.toString());
      }

      return params;
    });
  }, []);

  useEffect(() => {
    setSearchParams((params) => {
      if (search === '') {
        params.delete('search');
      }

      if (categoryId === -1) {
        params.delete('categoryId');
      }

      return params;
    });
  }, [search, categoryId])

  return {
    search,
    categoryId,
    setFilters
  };
}