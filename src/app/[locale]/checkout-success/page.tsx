import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/lib/constants';
import type { Locale } from '@/lib/types';
import { CheckoutSuccess } from '@/components/checkout';

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ orderNumber?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const resolvedLocale: Locale = LOCALES.includes(locale as Locale) ? (locale as Locale) : 'ru';
  const t = await getTranslations('orderSuccess');
  const orderNumber =
    query.orderNumber?.trim() || (resolvedLocale === 'ru' ? 'Н/Д' : 'N/A');

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <CheckoutSuccess
        orderNumber={orderNumber}
        labels={{
          title: t('title'),
          description: t('description'),
          orderNumber: t('orderNumber'),
          viewOrders: t('viewOrders'),
          backToShop: t('backToShop'),
        }}
      />
    </div>
  );
}
