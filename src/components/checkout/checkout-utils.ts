import { getDiscount, getItemUnitPrice } from '@/components/cart/cart-utils';
import type { CartItem, Locale, Order, Product } from '@/lib/types';
import { generateOrderNumber } from '@/lib/utils';

export function calculateCartTotals(
  items: CartItem[],
  products: Product[],
  promoCode: string | undefined
) {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;
    return sum + getItemUnitPrice(item, product) * item.quantity;
  }, 0);

  const discount = getDiscount(subtotal, promoCode);
  const total = Math.max(0, subtotal - discount);

  return { subtotal, discount, total };
}

export function createOrder({
  items,
  total,
  discount,
  promoCode,
  shippingAddress,
  paymentMethod,
}: {
  items: CartItem[];
  total: number;
  discount: number;
  promoCode: string | undefined;
  shippingAddress: Order['shippingAddress'];
  paymentMethod: Order['paymentMethod'];
}): Order {
  const createdAt = new Date().toISOString();

  return {
    id: `order-${cryptoRandom()}`,
    orderNumber: generateOrderNumber(),
    items,
    status: 'processing',
    timeline: [
      {
        status: 'processing',
        date: createdAt,
        description: {
          ru: 'Заказ оформлен и передан в обработку.',
          en: 'Order has been placed and moved to processing.',
        },
      },
    ],
    totalAmount: total,
    discount,
    promoCode,
    shippingAddress,
    paymentMethod,
    createdAt,
  };
}

export function getSuccessPath(locale: Locale, orderNumber: string): string {
  return `/${locale}/checkout-success?orderNumber=${encodeURIComponent(orderNumber)}`;
}

function cryptoRandom(): string {
  return Math.random().toString(36).slice(2, 10);
}
