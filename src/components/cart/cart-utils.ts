import { PROMO_CODES } from '@/lib/constants';
import type { CartItem, Product, ProductVariant } from '@/lib/types';

export function findProduct(productId: string, products: Product[]): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getVariantKeys(variantKey: string | undefined): string[] {
  if (!variantKey) return [];
  return variantKey.split('|').filter(Boolean);
}

export function findVariants(product: Product, variantKey: string | undefined): ProductVariant[] {
  if (!product.variants || product.variants.length === 0) return [];
  const keys = getVariantKeys(variantKey);
  return product.variants.filter((variant) => keys.includes(variant.key));
}

export function getItemUnitPrice(item: CartItem, product: Product): number {
  const modifiers = findVariants(product, item.variantKey).reduce(
    (sum, variant) => sum + (variant.priceModifier ?? 0),
    0
  );
  return product.price + modifiers;
}

export function getDiscount(subtotal: number, promoCode: string | undefined): number {
  if (!promoCode) return 0;
  const rate = PROMO_CODES[promoCode];
  if (!rate) return 0;
  return Math.round(subtotal * rate);
}
