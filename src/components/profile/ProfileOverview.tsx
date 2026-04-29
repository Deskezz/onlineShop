'use client';

import Image from 'next/image';
import { useDisplayCurrency } from '@/hooks/useDisplayCurrency';
import { formatPrice } from '@/lib/utils';
import type { DemoUser, Locale, Order } from '@/lib/types';

interface ProfileOverviewProps {
  locale: Locale;
  user: DemoUser;
  orders: Order[];
  labels: {
    memberSince: string;
    totalOrders: string;
    totalSpent: string;
  };
}

export function ProfileOverview({ locale, user, orders, labels }: ProfileOverviewProps) {
  const { currency } = useDisplayCurrency(locale);
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <section className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border-color">
          <Image src={user.avatar} alt={user.name} fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{user.name}</h2>
          <p className="text-sm text-foreground-secondary">{user.email}</p>
          <p className="text-sm text-foreground-secondary">
            {labels.memberSince}:{' '}
            {new Date(user.memberSince).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US')}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-button)] border border-border-color p-4">
          <p className="text-sm text-foreground-secondary">{labels.totalOrders}</p>
          <p className="text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="rounded-[var(--radius-button)] border border-border-color p-4">
          <p className="text-sm text-foreground-secondary">{labels.totalSpent}</p>
          <p className="text-2xl font-semibold">{formatPrice(totalSpent, locale, currency)}</p>
        </div>
      </div>
    </section>
  );
}
