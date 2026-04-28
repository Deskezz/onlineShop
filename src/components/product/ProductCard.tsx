'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useCartStore, useFavoritesStore } from '@/stores';
import { cn, formatPrice } from '@/lib/utils';
import type { Badge as BadgeType, Locale, Product } from '@/lib/types';
import { Badge, Button, Card, CardContent, Rating } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  labels: {
    inStock: string;
    outOfStock: string;
    addToCart: string;
    addToFavorites: string;
    removeFromFavorites: string;
  };
  badgeLabels: Record<BadgeType, string>;
}

export function ProductCard({ product, locale, labels, badgeLabels }: ProductCardProps) {
  const items = useHydratedStore(useCartStore, (state) => state.items);
  const addItem = useHydratedStore(useCartStore, (state) => state.addItem);
  const updateItemQuantity = useHydratedStore(
    useCartStore,
    (state) => state.updateItemQuantity
  );
  const favorites = useHydratedStore(useFavoritesStore, (state) => state.items);
  const toggleFavorite = useHydratedStore(useFavoritesStore, (state) => state.toggleFavorite);
  const primaryBadge = product.badges?.[0];
  const price = formatPrice(product.price, locale);
  const productName = product.name[locale];
  const cardItem = (items ?? []).find(
    (item) => item.productId === product.id && !item.variantKey
  );
  const quantity = cardItem?.quantity ?? 0;
  const isFavorite = (favorites ?? []).some(
    (item) => item.productId === product.id && !item.variantKey
  );

  return (
    <Card className="group h-full min-w-0 border-border-color bg-background-secondary">
      <Link href={`/product/${product.slug}`} className="block focus-visible:outline-none">
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

      <CardContent className="flex min-w-0 flex-1 flex-col gap-4 p-5 pt-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 break-words text-lg font-semibold tracking-tight">{productName}</h3>
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

          {quantity > 0 && updateItemQuantity ? (
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div className="flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-border-color p-1">
                <ControlButton
                  onClick={() =>
                    updateItemQuantity(product.id, undefined, Math.max(0, quantity - 1))
                  }
                  ariaLabel="Decrease quantity"
                >
                  -
                </ControlButton>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <ControlButton
                  onClick={() => updateItemQuantity(product.id, undefined, quantity + 1)}
                  ariaLabel="Increase quantity"
                >
                  +
                </ControlButton>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={isFavorite ? labels.removeFromFavorites : labels.addToFavorites}
                onClick={() => toggleFavorite?.(product.id)}
              >
                <Heart className={cn('h-4 w-4', { 'fill-current text-error': isFavorite })} />
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <Button
                className="w-full"
                onClick={() => addItem?.({ productId: product.id, quantity: 1 })}
                disabled={!product.inStock}
              >
                {labels.addToCart}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={isFavorite ? labels.removeFromFavorites : labels.addToFavorites}
                onClick={() => toggleFavorite?.(product.id)}
              >
                <Heart className={cn('h-4 w-4', { 'fill-current text-error': isFavorite })} />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ControlButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-[var(--radius-button)] px-3 py-2 text-sm transition-colors hover:bg-background"
    >
      {children}
    </button>
  );
}
