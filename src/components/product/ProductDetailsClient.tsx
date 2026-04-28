'use client';

import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useToast, Button, Badge, Rating, Skeleton } from '@/components/ui';
import { useCartStore, useFavoritesStore } from '@/stores';
import { cn, formatPrice } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';
import { ProductVariantSelector } from './ProductVariantSelector';
import {
  buildVariantKey,
  formatVariantLabel,
  getInitialSelection,
} from './product-fallbacks';
import { ProductQuantitySelector } from './ProductQuantitySelector';

interface ProductDetailsClientProps {
  product: Product;
  locale: Locale;
  labels: {
    addToCart: string;
    addToFavorites: string;
    removeFromFavorites: string;
    quantity: string;
    inStock: string;
    outOfStock: string;
    itemAdded: string;
  };
}

export function ProductDetailsClient({ product, locale, labels }: ProductDetailsClientProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const variants = product.variants ?? [];
  const [selectedByType, setSelectedByType] = useState<Record<'color' | 'storage', string | undefined>>(
    getInitialSelection(variants)
  );
  const addCartItem = useHydratedStore(useCartStore, (state) => state.addItem);
  const favoriteItems = useHydratedStore(useFavoritesStore, (state) => state.items);
  const toggleFavorite = useHydratedStore(
    useFavoritesStore,
    (state) => state.toggleFavorite
  );

  const selectedVariant = useMemo(
    () =>
      variants.filter((variant) =>
        [selectedByType.color, selectedByType.storage].includes(variant.key)
      ),
    [variants, selectedByType]
  );
  const selectedPrice =
    product.price +
    selectedVariant.reduce((sum, variant) => sum + (variant.priceModifier ?? 0), 0);

  if (!addCartItem || !favoriteItems || !toggleFavorite) {
    return <Skeleton className="h-[420px] w-full rounded-[var(--radius-card)]" />;
  }

  const isFavorite = favoriteItems.some(
    (item) =>
      item.productId === product.id &&
      item.variantKey === buildVariantKey(selectedByType, variants[0]?.key)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{product.name[locale]}</h1>
        <Rating value={product.rating} showCount count={product.reviewCount} />
        <p className="text-foreground-secondary">{product.description[locale]}</p>
      </div>

      <p className="text-3xl font-semibold">{formatPrice(selectedPrice, locale)}</p>
      <Badge variant={product.inStock ? 'new' : 'outline'}>
        {product.inStock ? labels.inStock : labels.outOfStock}
      </Badge>

      <ProductVariantSelector
        variants={variants}
        locale={locale}
        selectedByType={selectedByType}
        onSelect={(type, key) =>
          setSelectedByType((current) => ({
            ...current,
            [type]: key,
          }))
        }
      />

      <ProductQuantitySelector
        quantity={quantity}
        label={labels.quantity}
        onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        onIncrease={() => setQuantity((q) => Math.min(10, q + 1))}
      />

      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <Button
          onClick={() => {
            addCartItem({
              productId: product.id,
              variantKey: buildVariantKey(selectedByType, variants[0]?.key),
              quantity,
            });
            toast({ type: 'success', title: labels.itemAdded });
          }}
          disabled={!product.inStock}
        >
          {labels.addToCart}
        </Button>
        <Button
          variant="outline"
          aria-label={isFavorite ? labels.removeFromFavorites : labels.addToFavorites}
          onClick={() =>
            toggleFavorite(
              product.id,
              buildVariantKey(selectedByType, variants[0]?.key)
            )
          }
        >
          <Heart className={cn('mr-2 h-4 w-4', { 'fill-current': isFavorite })} />
          {isFavorite ? labels.removeFromFavorites : labels.addToFavorites}
        </Button>
      </div>

      {variants.length > 0 ? (
        <p className="text-sm text-foreground-secondary">
          {formatVariantLabel(selectedByType, variants, locale)}
        </p>
      ) : null}
    </div>
  );
}
