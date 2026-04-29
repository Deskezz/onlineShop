import { getTranslations, setRequestLocale } from 'next-intl/server';
import { categories, products } from '@/data';
import { LOCALES } from '@/lib/constants';
import type { Badge, CategorySlug, Locale } from '@/lib/types';
import { CatalogPageClient } from '@/components/catalog';

function parseCategory(value: string | undefined): CategorySlug | undefined {
  const allowed: CategorySlug[] = [
    'smartphones',
    'tablets',
    'laptops',
    'watches',
    'keyboards',
    'accessories',
    'desktops',
  ];

  if (!value) {
    return undefined;
  }

  return allowed.includes(value as CategorySlug) ? (value as CategorySlug) : undefined;
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const resolvedLocale: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : 'ru';
  const initialCategory = parseCategory(query.category);

  const tCommon = await getTranslations('common');
  const tFilters = await getTranslations('filters');
  const tBadges = await getTranslations('badges');

  const badgeLabels: Record<Badge, string> = {
    new: tBadges('new'),
    sale: tBadges('sale'),
    bestseller: tBadges('bestseller'),
    limited: tBadges('limited'),
  };

  return (
    <CatalogPageClient
      locale={resolvedLocale}
      products={products}
      categories={categories}
      initialCategory={initialCategory}
      badgeLabels={badgeLabels}
      labels={{
        title: tCommon('catalog'),
        showing: tFilters('showing', { count: '{count}', total: '{total}' }),
        noResults: tCommon('noResults'),
        prev: tCommon('back'),
        next: tCommon('viewAll'),
        filters: {
          title: tFilters('title'),
          category: tFilters('category'),
          brand: tFilters('brand'),
          price: tFilters('price'),
          rating: tFilters('rating'),
          clear: tFilters('clear'),
          apply: tFilters('apply'),
          close: tCommon('close'),
          sort: tFilters('sort'),
          sortOptions: {
            featured: tFilters('sortOptions.featured'),
            priceAsc: tFilters('sortOptions.priceAsc'),
            priceDesc: tFilters('sortOptions.priceDesc'),
            rating: tFilters('sortOptions.rating'),
            newest: tFilters('sortOptions.newest'),
          },
        },
        product: {
          inStock: tCommon('inStock'),
          outOfStock: tCommon('outOfStock'),
          addToCart: tCommon('addToCart'),
          addToFavorites: tCommon('addToFavorites'),
          removeFromFavorites: tCommon('removeFromFavorites'),
        },
      }}
    />
  );
}
