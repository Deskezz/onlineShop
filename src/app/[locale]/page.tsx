import { getTranslations, setRequestLocale } from 'next-intl/server';
import { categories, products } from '@/data';
import { LOCALES, PROMO_CODES } from '@/lib/constants';
import type { Badge, Locale } from '@/lib/types';
import {
  CategoriesGrid,
  FeaturedProducts,
  HeroSection,
  PromoSection,
} from '@/components/home';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resolvedLocale: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : 'ru';

  const tHero = await getTranslations('hero');
  const tCategories = await getTranslations('categories');
  const tFeatured = await getTranslations('featured');
  const tPromo = await getTranslations('promo');
  const tCommon = await getTranslations('common');
  const tBadges = await getTranslations('badges');

  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const badgeLabels: Record<Badge, string> = {
    new: tBadges('new'),
    sale: tBadges('sale'),
    bestseller: tBadges('bestseller'),
    limited: tBadges('limited'),
  };

  const promoCode = Object.keys(PROMO_CODES)[0] ?? 'DEMO';

  return (
    <div className="flex flex-col">
      <HeroSection
        title={tHero('title')}
        subtitle={tHero('subtitle')}
        ctaLabel={tHero('cta')}
      />

      <CategoriesGrid
        title={tCategories('title')}
        locale={resolvedLocale}
        categories={categories}
      />

      <FeaturedProducts
        title={tFeatured('title')}
        subtitle={tFeatured('subtitle')}
        viewAllLabel={tCommon('viewAll')}
        locale={resolvedLocale}
        products={featuredProducts}
        labels={{
          inStock: tCommon('inStock'),
          outOfStock: tCommon('outOfStock'),
          buyNow: tCommon('buyNow'),
        }}
        badgeLabels={badgeLabels}
      />

      <PromoSection
        title={tPromo('title')}
        description={tPromo('description')}
        code={promoCode}
        ctaLabel={tCommon('viewAll')}
      />
    </div>
  );
}
