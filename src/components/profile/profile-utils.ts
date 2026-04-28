import { getItemUnitPrice } from '@/components/cart/cart-utils';
import type { CartItem, Order, Product } from '@/lib/types';

export function resolveOrderItems(order: Order, products: Product[]) {
  return order.items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        item,
        product,
        unitPrice: getItemUnitPrice(item, product),
      };
    })
    .filter(Boolean) as Array<{
    item: CartItem;
    product: Product;
    unitPrice: number;
  }>;
}

export function formatStatusLabel(
  status: Order['status'],
  labels: Record<Order['status'], string>
): string {
  return labels[status];
}
