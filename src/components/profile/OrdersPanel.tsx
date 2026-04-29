'use client';

import { Badge } from '@/components/ui';
import { useDisplayCurrency } from '@/hooks/useDisplayCurrency';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import type { Locale, Order, OrderStatus, Product } from '@/lib/types';
import { formatStatusLabel, resolveOrderItems } from './profile-utils';

interface OrdersPanelProps {
  locale: Locale;
  orders: Order[];
  products: Product[];
  labels: {
    noOrders: string;
    orderDetails: string;
    statusLabels: Record<OrderStatus, string>;
  };
}

export function OrdersPanel({ locale, orders, products, labels }: OrdersPanelProps) {
  const { currency } = useDisplayCurrency(locale);

  if (orders.length === 0) {
    return (
      <section className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-6 text-center text-foreground-secondary">
        {labels.noOrders}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {orders.map((order) => {
        const resolvedItems = resolveOrderItems(order, products);
        return (
          <article key={order.id} className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-foreground-secondary">
                  {new Date(order.createdAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US')}
                </p>
              </div>
              <Badge variant="outline">
                <span
                  className={cn('font-medium', {
                    'text-warning': order.status === 'processing',
                    'text-info': order.status === 'confirmed',
                    'text-success':
                      order.status === 'shipped' || order.status === 'delivered',
                    'text-error': order.status === 'cancelled',
                  })}
                >
                  {formatStatusLabel(order.status, labels.statusLabels)}
                </span>
              </Badge>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              {resolvedItems.map(({ item, product, unitPrice }) => (
                <div key={`${order.id}-${item.productId}-${item.variantKey ?? 'default'}`} className="flex items-center justify-between gap-3">
                  <span className="line-clamp-1">{product.name[locale]} x{item.quantity}</span>
                  <span>{formatPrice(unitPrice * item.quantity, locale, currency)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border-color pt-3">
              <p className="mb-2 text-sm font-medium">{labels.orderDetails}</p>
              <ol className="space-y-2">
                {order.timeline.map((entry, index) => (
                  <li key={`${order.id}-${entry.status}-${index}`} className="flex gap-2 text-sm">
                    <span
                      className={cn('mt-1 h-2 w-2 rounded-full', {
                        'bg-warning': entry.status === 'processing',
                        'bg-info': entry.status === 'confirmed',
                        'bg-success':
                          entry.status === 'shipped' || entry.status === 'delivered',
                        'bg-error': entry.status === 'cancelled',
                      })}
                    />
                    <div>
                      <p className="font-medium">{formatStatusLabel(entry.status, labels.statusLabels)}</p>
                      <p className="text-foreground-secondary">{entry.description[locale]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        );
      })}
    </section>
  );
}
