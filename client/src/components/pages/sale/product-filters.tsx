import { getCategories } from "@/api/category/queries";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductFilters } from "@/hooks/use-product-filters";
import { useQuery } from "@tanstack/react-query";

export const ProductFilters = () => {
  const { categoryId, search, setFilters } = useProductFilters();
  const { status, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const handleOnClick = (id: number) => {
    if (categoryId === id) {
      setFilters({ categoryId: undefined });
    } else {
      setFilters({ categoryId: id });
    }
  };

  return (
    <>
      <Input
        value={search || ''}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="w-full"
        placeholder="Buscar productos..."
        type="search"
      />

      {status === 'success' && (
        <ul className="flex items-center gap-x-2 overflow-x-auto pb-1">
          {data.categories.map((category) => (
            <li key={category.id}
              onClick={() => handleOnClick(category.id)}
              className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer border hover:shadow-sm transition border-sky-800/10
                ${categoryId === category.id
                  ? ' bg-sky-500/10 text-sky-800 dark:bg-sky-700/50 dark:text-white' : ''}`}
            >
              <span className="truncate text-sm font-semibold">{category.name}</span>
            </li>
          ))}
        </ul>
      )}

      {status === 'pending' && (
        <ul className="flex items-center gap-x-2 overflow-x-auto pb-1">
          <li>
            <Skeleton className="w-36 h-8" />
          </li>
          <li>
            <Skeleton className="w-28 h-8" />
          </li>
          <li>
            <Skeleton className="w-20 h-8" />
          </li>
          <li>
            <Skeleton className="w-36 h-8" />
          </li>
          <li>
            <Skeleton className="w-36 h-8" />
          </li>
        </ul>
      )}
    </>
  )
}