import { getProductsToSale } from "@/api/product/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductFilters } from "@/hooks/use-product-filters";
import { formatter } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";

export const ProductList = () => {
  const { status, data } = useQuery({
    queryKey: ['productsToSale'],
    queryFn: () => getProductsToSale()
  });
  const { addItem, items } = useCartStore();
  const { categoryId, search } = useProductFilters();

  const filteredProducts = data?.products.filter((product) => {
    const matchesCategory = categoryId ? product.categoryId === categoryId : true;
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {status === 'success' && (
        filteredProducts && filteredProducts.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {filteredProducts?.map((product) => (
              <li key={product.id} onClick={() => addItem(product)}>
                <Card className={`cursor-pointer transition-shadow h-full 
                ${items.some((item) => item.product.id === product.id)
                    ? 'cursor-not-allowed opacity-60'
                    : 'hover:shadow-lg'
                  }`}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="size-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <Package className="size-12 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-center">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatter.format(product.salePrice)}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500 dark:text-gray-400">
              {categoryId ? 'No hay productos para esta categoría.' : 'No hay productos disponibles.'}
            </p>
          </div>
        )
      )}

      {status === 'pending' && (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          <li>
            <Skeleton className="h-48 w-full" />
          </li>
          <li>
            <Skeleton className="h-48 w-full" />
          </li>
          <li>
            <Skeleton className="h-48 w-full" />
          </li>
          <li>
            <Skeleton className="h-48 w-full" />
          </li>
          <li>
            <Skeleton className="h-48 w-full" />
          </li>
          <li>
            <Skeleton className="h-48 w-full" />
          </li>
        </ul>
      )}
    </>
  )
}