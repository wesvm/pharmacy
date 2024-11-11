type Supplier = {
  id: number,
  name: string,
  contactInfo: string | null,
}

type Category = {
  id: number,
  name: string,
  description: string | null,
}

type Product = {
  id: number;
  name: string;
  description?: string | null;
  salePrice: number;
  purchasePrice: number;
  stockQuantity: number;
  categoryId: number;
  supplierId: number;
  category: string;
  supplier: string;
};