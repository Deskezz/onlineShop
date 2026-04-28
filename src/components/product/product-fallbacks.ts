import type { Locale, Product, ProductSpec, ProductVariant, Review } from '@/lib/types';

export function getProductVariants(product: Product): ProductVariant[] {
  if (product.variants && product.variants.length > 0) {
    return product.variants;
  }

  if (product.category === 'smartphones') {
    return [
      {
        key: 'color-black',
        type: 'color',
        label: { ru: 'Цвет', en: 'Color' },
        value: 'Black',
      },
      {
        key: 'color-blue',
        type: 'color',
        label: { ru: 'Цвет', en: 'Color' },
        value: 'Blue',
      },
      {
        key: 'storage-128',
        type: 'storage',
        label: { ru: 'Память', en: 'Storage' },
        value: '128GB',
      },
      {
        key: 'storage-256',
        type: 'storage',
        label: { ru: 'Память', en: 'Storage' },
        value: '256GB',
        priceModifier: 10000,
      },
    ];
  }

  if (product.category === 'tablets' || product.category === 'laptops') {
    return [
      {
        key: 'storage-256',
        type: 'storage',
        label: { ru: 'Память', en: 'Storage' },
        value: '256GB',
      },
      {
        key: 'storage-512',
        type: 'storage',
        label: { ru: 'Память', en: 'Storage' },
        value: '512GB',
        priceModifier: 15000,
      },
    ];
  }

  if (product.category === 'watches') {
    return [
      {
        key: 'color-black',
        type: 'color',
        label: { ru: 'Цвет', en: 'Color' },
        value: 'Black',
      },
      {
        key: 'color-silver',
        type: 'color',
        label: { ru: 'Цвет', en: 'Color' },
        value: 'Silver',
      },
    ];
  }

  return [];
}

export function getProductSpecs(product: Product, specs: ProductSpec[]): ProductSpec[] {
  if (specs.length > 0) return specs;

  return [
    {
      label: { ru: 'Категория', en: 'Category' },
      value: { ru: product.category, en: product.category },
    },
    {
      label: { ru: 'Бренд', en: 'Brand' },
      value: { ru: product.brand, en: product.brand },
    },
    {
      label: { ru: 'Рейтинг', en: 'Rating' },
      value: { ru: `${product.rating}/5`, en: `${product.rating}/5` },
    },
    {
      label: { ru: 'Статус', en: 'Status' },
      value: {
        ru: product.inStock ? 'В наличии' : 'Нет в наличии',
        en: product.inStock ? 'In stock' : 'Out of stock',
      },
    },
  ];
}

export function getProductReviews(product: Product, reviews: Review[]): Review[] {
  if (reviews.length > 0) return reviews;

  return [
    {
      id: `r-${product.id}-fallback`,
      author: 'Demo User',
      rating: Math.max(4, Math.round(product.rating)),
      date: '2026-04-01',
      text: {
        ru: `Качественный товар ${product.name.ru}. Подходит для демо-покупок и тестов интерфейса.`,
        en: `Reliable ${product.name.en}. Great for demo purchases and interface testing.`,
      },
      verified: true,
    },
  ];
}

export function buildVariantKey(
  selectedByType: Record<'color' | 'storage', string | undefined>,
  fallbackVariant: string | undefined
): string | undefined {
  const keys = [selectedByType.color, selectedByType.storage].filter(Boolean) as string[];
  if (keys.length === 0) return fallbackVariant;
  return keys.join('|');
}

export function getInitialSelection(variants: ProductVariant[]): Record<'color' | 'storage', string | undefined> {
  const color = variants.find((variant) => variant.type === 'color')?.key;
  const storage = variants.find((variant) => variant.type === 'storage')?.key;
  return { color, storage };
}

export function formatVariantLabel(
  selection: Record<'color' | 'storage', string | undefined>,
  variants: ProductVariant[],
  locale: Locale
): string {
  const parts: string[] = [];
  const selected = variants.filter((variant) =>
    [selection.color, selection.storage].includes(variant.key)
  );
  selected.forEach((variant) => parts.push(variant.value));
  return parts.join(' / ');
}
