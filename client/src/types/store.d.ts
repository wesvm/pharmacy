type Supplier = {
  id: number;
  name: string;
  contactInfo: string | null;
};

type Category = {
  id: number;
  name: string;
  description: string | null;
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  salePrice: number;
  purchasePrice: number;
  stockQuantity: number;
  categoryId: number;
  supplierId: number;
  category: string;
  imageUrl: string | null;
  supplier: string;
  isArchived: boolean;
};

type ProductFilters = {
  search?: string;
  categoryId?: number;
}

type Sale = {
  id: number;
  saleDate: string;
  total: number;
  status: 'Completado' | 'Pendiente' | 'Cancelado';
  customerName: string;
  customerDNI: string;
  deliveryId: number | null;
  userId: number;
  user: Omit<User, 'email' | 'role'>;
};

type SaleDetails = Sale & {
  saleItems: SaleItem[]
  delivery: Delivery | null;
}

type SaleItem = {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  saleId: number;
  product: Product;
}

type Delivery = {
  id: number;
  deliveryDate: string;
  status: string;
  address: string;
}
