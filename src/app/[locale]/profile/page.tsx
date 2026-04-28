import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/lib/constants';
import { demoUser, products } from '@/data';
import type { Badge, Locale, OrderStatus } from '@/lib/types';
import { ProfilePageClient } from '@/components/profile';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resolvedLocale: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : 'ru';
  const tProfile = await getTranslations('profile');
  const tCommon = await getTranslations('common');
  const tBadges = await getTranslations('badges');

  const badgeLabels: Record<Badge, string> = {
    new: tBadges('new'),
    sale: tBadges('sale'),
    bestseller: tBadges('bestseller'),
    limited: tBadges('limited'),
  };

  const statusLabels: Record<OrderStatus, string> = {
    processing: tProfile('orderStatus.processing'),
    confirmed: tProfile('orderStatus.confirmed'),
    shipped: tProfile('orderStatus.shipped'),
    delivered: tProfile('orderStatus.delivered'),
    cancelled: tProfile('orderStatus.cancelled'),
  };

  return (
    <div className="container mx-auto space-y-6 px-4 py-8 md:py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{tProfile('title')}</h1>
      <ProfilePageClient
        locale={resolvedLocale}
        user={demoUser}
        products={products}
        badgeLabels={badgeLabels}
        labels={{
          tabs: {
            overview: tProfile('overview'),
            orders: tProfile('orders'),
            favorites: tCommon('favorites'),
          },
          memberSince: tProfile('memberSince'),
          totalOrders: tProfile('totalOrders'),
          totalSpent: tProfile('totalSpent'),
          noOrders: tProfile('noOrders'),
          noFavorites: tProfile('noFavorites'),
          orderDetails: tProfile('orderDetails'),
          inStock: tCommon('inStock'),
          outOfStock: tCommon('outOfStock'),
          addToCart: tCommon('addToCart'),
          addToFavorites: tCommon('addToFavorites'),
          removeFromFavorites: tCommon('removeFromFavorites'),
          statusLabels,
        }}
      />
    </div>
  );
}
