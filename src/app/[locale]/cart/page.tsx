import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/lib/constants';
import { products } from '@/data';
import type { Locale } from '@/lib/types';
import { CartPageClient } from '@/components/cart';

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const resolvedLocale: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : 'ru';
  const t = await getTranslations('cart');

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <CartPageClient
        locale={resolvedLocale}
        products={products}
        labels={{
          title: t('title'),
          empty: t('empty'),
          emptyDescription: t('emptyDescription'),
          continueShopping: t('continueShopping'),
          subtotal: t('subtotal'),
          discount: t('discount'),
          total: t('total'),
          promoCode: t('promoCode'),
          applyPromo: t('applyPromo'),
          promoActive: t('promoActive', { code: '{code}' }),
          promoRemove: t('promoRemove'),
          checkout: t('checkout'),
          remove: t('remove'),
          promoApplied: t('promoApplied'),
          promoInvalid: t('promoInvalid'),
          promoReplace: t('promoReplace'),
        }}
      />
    </div>
  );
}
