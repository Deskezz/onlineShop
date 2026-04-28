'use client';

import { ProductCard } from '@/components/product';
import type { Badge as BadgeType, FavoriteItem, Locale, Product } from '@/lib/types';

interface FavoritesPanelProps {
  locale: Locale;
  favoriteItems: FavoriteItem[];
  products: Product[];
  labels: {
    noFavorites: string;
    inStock: string;
    outOfStock: string;
    addToCart: string;
    addToFavorites: string;
    removeFromFavorites: string;
  };
  badgeLabels: Record<BadgeType, string>;
}

export function FavoritesPanel({
  locale,
  favoriteItems,
  products,
  labels,
  badgeLabels,
}: FavoritesPanelProps) {
  const favoriteProducts = favoriteItems
    .map((item) => products.find((product) => product.id === item.productId))
    .filter(Boolean) as Product[];

  if (favoriteProducts.length === 0) {
    return (
      <section className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-6 text-center text-foreground-secondary">
        {labels.noFavorites}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {favoriteProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          labels={{
            inStock: labels.inStock,
            outOfStock: labels.outOfStock,
            addToCart: labels.addToCart,
            addToFavorites: labels.addToFavorites,
            removeFromFavorites: labels.removeFromFavorites,
          }}
          badgeLabels={badgeLabels}
        />
      ))}
    </section>
  );
}
