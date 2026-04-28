import { Link } from '@/i18n/navigation';
import type { Badge as BadgeType, Locale, Product } from '@/lib/types';
import { Button } from '@/components/ui';
import { ProductCard } from '@/components/product';

interface FeaturedProductsProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  locale: Locale;
  products: Product[];
  labels: {
    inStock: string;
    outOfStock: string;
    addToCart: string;
  };
  badgeLabels: Record<BadgeType, string>;
}

export function FeaturedProducts({
  title,
  subtitle,
  viewAllLabel,
  locale,
  products,
  labels,
  badgeLabels,
}: FeaturedProductsProps) {
  return (
    <section className="container mx-auto px-4 py-14 md:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <p className="text-foreground-secondary">{subtitle}</p>
        </div>
        <Link href="/catalog">
          <Button variant="outline">{viewAllLabel}</Button>
        </Link>
      </div>

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
