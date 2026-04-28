'use client';

import { useMemo, useState } from 'react';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { useToast } from '@/components/ui';
import { useCartStore } from '@/stores';
import { PROMO_CODES } from '@/lib/constants';
import type { CartItem, Locale, Product } from '@/lib/types';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { findProduct, findVariants, getDiscount, getItemUnitPrice } from './cart-utils';

interface CartPageClientProps {
  locale: Locale;
  products: Product[];
  labels: {
    title: string;
    empty: string;
    emptyDescription: string;
    continueShopping: string;
    subtotal: string;
    discount: string;
    total: string;
    promoCode: string;
    applyPromo: string;
    promoActive: string;
    promoRemove: string;
    checkout: string;
    remove: string;
    promoApplied: string;
    promoInvalid: string;
    promoReplace: string;
  };
}

export function CartPageClient({ locale, products, labels }: CartPageClientProps) {
  const { toast } = useToast();
  const [promoInput, setPromoInput] = useState('');
  const items = useHydratedStore(useCartStore, (state) => state.items);
  const promoCode = useHydratedStore(useCartStore, (state) => state.promoCode);
  const updateItemQuantity = useHydratedStore(useCartStore, (state) => state.updateItemQuantity);
  const removeItem = useHydratedStore(useCartStore, (state) => state.removeItem);
  const applyPromoCode = useHydratedStore(useCartStore, (state) => state.applyPromoCode);
  const clearPromoCode = useHydratedStore(useCartStore, (state) => state.clearPromoCode);
  const safeItems = items ?? [];

  const resolvedItems = useMemo(
    () =>
      safeItems
        .map((item) => {
          const product = findProduct(item.productId, products);
          if (!product) return null;
          const variants = findVariants(product, item.variantKey);
          const unitPrice = getItemUnitPrice(item, product);
          return { item, product, variants, unitPrice };
        })
        .filter(Boolean) as Array<{
        item: CartItem;
        product: Product;
        variants: ReturnType<typeof findVariants>;
        unitPrice: number;
      }>,
    [safeItems, products]
  );

  const subtotal = resolvedItems.reduce(
    (sum, entry) => sum + entry.unitPrice * entry.item.quantity,
    0
  );
  const discount = getDiscount(subtotal, promoCode);
  const total = Math.max(0, subtotal - discount);

  if (!items || !updateItemQuantity || !removeItem || !applyPromoCode || !clearPromoCode) {
    return null;
  }

  if (resolvedItems.length === 0) {
    return (
      <EmptyCart
        title={labels.empty}
        description={labels.emptyDescription}
        actionLabel={labels.continueShopping}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">{labels.title}</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {resolvedItems.map(({ item, product, variants, unitPrice }) => (
            <CartItemRow
              key={`${item.productId}-${item.variantKey ?? 'default'}`}
              product={product}
              quantity={item.quantity}
              variants={variants}
              unitPrice={unitPrice}
              locale={locale}
              removeLabel={labels.remove}
              onDecrease={() =>
                updateItemQuantity(
                  item.productId,
                  item.variantKey,
                  Math.max(1, item.quantity - 1)
                )
              }
              onIncrease={() =>
                updateItemQuantity(item.productId, item.variantKey, item.quantity + 1)
              }
              onRemove={() => removeItem(item.productId, item.variantKey)}
            />
          ))}
        </section>

        <CartSummary
          locale={locale}
          subtotal={subtotal}
          discount={discount}
          total={total}
          appliedPromoCode={promoCode}
          promoCode={promoInput}
          onPromoCodeChange={setPromoInput}
          onApplyPromo={() => {
            const code = promoInput.trim().toUpperCase();
            if (PROMO_CODES[code]) {
              if (promoCode && promoCode !== code) {
                toast({ type: 'info', title: labels.promoReplace });
              }
              applyPromoCode(code);
              toast({ type: 'success', title: labels.promoApplied });
              return;
            }
            toast({ type: 'error', title: labels.promoInvalid });
          }}
          onRemovePromo={() => clearPromoCode()}
          labels={labels}
        />
      </div>
    </div>
  );
}
