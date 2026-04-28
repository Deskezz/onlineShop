'use client';

import { useState } from 'react';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useFavoritesStore, useOrdersStore } from '@/stores';
import { Button } from '@/components/ui';
import type { Badge as BadgeType, DemoUser, Locale, OrderStatus, Product } from '@/lib/types';
import { ProfileOverview } from './ProfileOverview';
import { OrdersPanel } from './OrdersPanel';
import { FavoritesPanel } from './FavoritesPanel';

type ProfileTab = 'overview' | 'orders' | 'favorites';

interface ProfilePageClientProps {
  locale: Locale;
  user: DemoUser;
  products: Product[];
  badgeLabels: Record<BadgeType, string>;
  labels: {
    tabs: {
      overview: string;
      orders: string;
      favorites: string;
    };
    memberSince: string;
    totalOrders: string;
    totalSpent: string;
    noOrders: string;
    noFavorites: string;
    orderDetails: string;
    inStock: string;
    outOfStock: string;
    addToCart: string;
    addToFavorites: string;
    removeFromFavorites: string;
    statusLabels: Record<OrderStatus, string>;
  };
}

export function ProfilePageClient({
  locale,
  user,
  products,
  badgeLabels,
  labels,
}: ProfilePageClientProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const orders = useHydratedStore(useOrdersStore, (state) => state.orders) ?? [];
  const favoriteItems = useHydratedStore(useFavoritesStore, (state) => state.items) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-3">
        <div className="grid gap-2">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            {labels.tabs.overview}
          </TabButton>
          <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
            {labels.tabs.orders}
          </TabButton>
          <TabButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>
            {labels.tabs.favorites}
          </TabButton>
        </div>
      </aside>

      <section className="space-y-5">
        {activeTab === 'overview' ? (
          <ProfileOverview
            locale={locale}
            user={user}
            orders={orders}
            labels={{
              memberSince: labels.memberSince,
              totalOrders: labels.totalOrders,
              totalSpent: labels.totalSpent,
            }}
          />
        ) : null}

        {activeTab === 'orders' ? (
          <OrdersPanel
            locale={locale}
            orders={orders}
            products={products}
            labels={{
              noOrders: labels.noOrders,
              orderDetails: labels.orderDetails,
              statusLabels: labels.statusLabels,
            }}
          />
        ) : null}

        {activeTab === 'favorites' ? (
          <FavoritesPanel
            locale={locale}
            favoriteItems={favoriteItems}
            products={products}
            labels={{
              noFavorites: labels.noFavorites,
              inStock: labels.inStock,
              outOfStock: labels.outOfStock,
              addToCart: labels.addToCart,
              addToFavorites: labels.addToFavorites,
              removeFromFavorites: labels.removeFromFavorites,
            }}
            badgeLabels={badgeLabels}
          />
        ) : null}
      </section>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <Button variant={active ? 'default' : 'ghost'} className="justify-start" onClick={onClick}>
      {children}
    </Button>
  );
}
