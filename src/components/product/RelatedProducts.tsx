import type { Badge as BadgeType, Locale, Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  title: string;
  products: Product[];
  locale: Locale;
  labels: {
    inStock: string;
    outOfStock: string;
    addToCart: string;
  };
  badgeLabels: Record<BadgeType, string>;
}

export function RelatedProducts({
  title,
  products,
  locale,
  labels,
  badgeLabels,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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
    </section>
  );
}
