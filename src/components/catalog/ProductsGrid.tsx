import type { Badge as BadgeType, Locale, Product } from '@/lib/types';
import { ProductCard } from '@/components/product';

interface ProductsGridProps {
  products: Product[];
  locale: Locale;
  emptyLabel: string;
  labels: {
    inStock: string;
    outOfStock: string;
    addToCart: string;
    addToFavorites: string;
    removeFromFavorites: string;
  };
  badgeLabels: Record<BadgeType, string>;
}

export function ProductsGrid({
  products,
  locale,
  emptyLabel,
  labels,
  badgeLabels,
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border-color bg-background-secondary px-6 py-16 text-center text-foreground-secondary">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          labels={labels}
          badgeLabels={badgeLabels}
        />
      ))}
    </div>
  );
}
