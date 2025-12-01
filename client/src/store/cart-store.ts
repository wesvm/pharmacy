import { Product } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  total: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeAll: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.productId === data.id
        );
        if (existingItem) {
          return toast.info("El producto ya está en la compra.");
        }
        set({
          items: [
            ...get().items,
            {
              productId: data.id,
              product: data,
              quantity: 1,
              total: data.salePrice,
            },
          ],
        });
      },
      updateQuantity: (id: number, quantity: number) => {
        if (quantity < 1) return;
        const currentItems = get().items;
        set({
          items: currentItems.map((item) =>
            item.productId === id
              ? {
                ...item,
                quantity,
                total: quantity * item.product.salePrice,
              }
              : item
          ),
        });
      },
      removeItem: (id: number) => {
        const currentItems = get().items;
        set({ items: currentItems.filter((item) => item.productId !== id) });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const usePurchaseCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.productId === data.id
        );
        if (existingItem) {
          return toast.info("El producto ya está en la compra.");
        }
        set({
          items: [
            ...get().items,
            {
              productId: data.id,
              product: data,
              quantity: 1,
              total: data.purchasePrice,
            },
          ],
        });
      },
      updateQuantity: (id: number, quantity: number) => {
        const currentItems = get().items;
        const itemQuantity = isNaN(quantity) ? 0 : quantity;
        set({
          items: currentItems.map((item) =>
            item.productId === id
              ? {
                ...item,
                quantity,
                total: Math.max(0, itemQuantity * item.product.purchasePrice),
              }
              : item
          ),
        });
      },
      removeItem: (id: number) => {
        const currentItems = get().items;
        set({ items: currentItems.filter((item) => item.productId !== id) });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "purchase-cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);