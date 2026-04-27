import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import type { Badge as BadgeType, Locale, Product } from '@/lib/types';
import { Badge, Button, Card, CardContent, Rating } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  labels: {
    inStock: string;
    outOfStock: string;
    buyNow: string;
  };
  badgeLabels: Record<BadgeType, string>;
}

export function ProductCard({ product, locale, labels, badgeLabels }: ProductCardProps) {
  const primaryBadge = product.badges?.[0];
  const price = formatPrice(product.price, locale);
  const productName = product.name[locale];

  return (
    <Card className="group h-full border-border-color bg-background-secondary">
      <Link href="/catalog" className="block focus-visible:outline-none">
        <div className="relative aspect-[4/3] overflow-hidden bg-background">
          <Image
            src={product.images[0]}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {primaryBadge ? (
            <div className="absolute left-3 top-3">
              <Badge variant={primaryBadge}>{badgeLabels[primaryBadge]}</Badge>
            </div>
          ) : null}
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-4 p-5 pt-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">{productName}</h3>
          <Rating value={product.rating} showCount count={product.reviewCount} />
        </div>

        <div className="mt-auto space-y-3">
          <p className="text-xl font-semibold">{price}</p>
          <p
            className={cn('text-xs font-medium uppercase tracking-wide', {
              'text-success': product.inStock,
              'text-error': !product.inStock,
            })}
          >
            {product.inStock ? labels.inStock : labels.outOfStock}
          </p>

          <Link href="/catalog" className="block">
            <Button className="w-full">{labels.buyNow}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
