import Image from 'next/image';
import type { ReactNode } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import type { Locale, Product, ProductVariant } from '@/lib/types';

interface CartItemRowProps {
  product: Product;
  quantity: number;
  variants: ProductVariant[];
  unitPrice: number;
  locale: Locale;
  removeLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

export function CartItemRow({
  product,
  quantity,
  variants,
  unitPrice,
  locale,
  removeLabel,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <article className="grid gap-4 rounded-[var(--radius-card)] border border-border-color bg-background-secondary p-4 text-center sm:grid-cols-[96px_1fr_auto] sm:items-center sm:text-left">
      <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-[var(--radius-button)] bg-background sm:mx-0">
        <Image src={product.images[0]} alt={product.name[locale]} fill className="object-cover" />
      </div>

      <div className="min-w-0 space-y-2">
        <h2 className="line-clamp-2 text-lg font-semibold tracking-tight">{product.name[locale]}</h2>
        {variants.length > 0 ? (
          <p className="text-sm text-foreground-secondary">
            {variants.map((variant) => variant.value).join(' / ')}
          </p>
        ) : null}
        <p className="font-medium">{formatPrice(unitPrice, locale)}</p>
      </div>

      <div className="flex items-center justify-center gap-3 sm:flex-col sm:items-end">
        <div className="mx-auto flex items-center gap-2 rounded-[var(--radius-button)] border border-border-color p-1 sm:mx-0">
          <IconButton onClick={onDecrease} ariaLabel="Decrease quantity">
            <Minus className="h-4 w-4" />
          </IconButton>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <IconButton onClick={onIncrease} ariaLabel="Increase quantity">
            <Plus className="h-4 w-4" />
          </IconButton>
        </div>

        <Button variant="ghost" size="sm" onClick={onRemove} className="text-error">
          <Trash2 className="mr-2 h-4 w-4" />
          {removeLabel}
        </Button>
      </div>
    </article>
  );
}

function IconButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-[var(--radius-button)] p-2 transition-colors hover:bg-background"
    >
      {children}
    </button>
  );
}
